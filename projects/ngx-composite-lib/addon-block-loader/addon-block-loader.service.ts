import { Component, ComponentFactoryResolver, EventEmitter, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import {PepHttpService} from '@pepperi-addons/ngx-lib';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { addonBlockType, assetsPicker, IAddonBlockLoaderDialogDataOptions, IAddonBlockLoaderDialogOptions, IAddonBlockLoaderOptions, scriptPicker } from './addon-block-loader.model';
import { AddonBlockLoaderComponent } from './addon-block-loader.component';
import { MatDialogRef } from '@angular/material/dialog';
import { PepDialogData, PepDialogService, PepDialogSizeType } from '@pepperi-addons/ngx-lib/dialog';

@Injectable({ providedIn: 'root' })
export class AddonBlockLoaderService {
    
    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private dialogService: PepDialogService,
        private httpService: PepHttpService
    ) {
        //
    }

    private async getInstalledAddons(addonUUID: string): Promise<any>{
        const endpoint = `/addons/installed_addons/${addonUUID}`;
        return this.httpService.getPapiApiCall(endpoint).toPromise();
    }

    async getRemoteLoaderOptions(blockType: addonBlockType): Promise<PepRemoteLoaderOptions> {
        let addon;
        let defaultRemoteName = 'addon';
        let defaultModuleName = 'AddonModule';
        let defaultComponentName = 'AddonComponent';

        switch (blockType) {
            case 'assets-picker':
                addon = await this.getInstalledAddons(assetsPicker.addonId);
                break;
            case 'script-picker':
                addon = await this.getInstalledAddons(scriptPicker.addonId);
                defaultModuleName = 'ScriptPickerModule';
                defaultComponentName = 'ScriptPickerComponent';
                break;
        
            default:
                break;
        }

        if (addon) {
            return {
                addonId: addon.Addon.UUID,
                remoteEntry: `${addon.PublicBaseURL}${defaultRemoteName}.js`,
                remoteName: defaultRemoteName,
                exposedModule: `./${defaultModuleName}`,
                componentName: defaultComponentName, 
            }
        } else {
            return Promise.reject(`Addon ${blockType} not found`);
        }

        // const test = {
        //     addonId: "ad909780-0c23-401e-8e8e-f514cc4f6aa2",
        //     componentName: "AddonComponent",
        //     exposedModule: "./AddonModule",
        //     remoteEntry: "https://cdn.pepperi.com/Addon/Public/ad909780-0c23-401e-8e8e-f514cc4f6aa2/0.0.9/addon.js",
        //     remoteName: "addon"
        // };
        // return Promise.resolve(test);
    }

    private loadAddonBlockInternal(options: IAddonBlockLoaderDialogOptions): AddonBlockLoaderComponent | null {
        if (options.container !== null) {
            const factory = this.resolver.resolveComponentFactory(AddonBlockLoaderComponent);
            const componentRef = options.container.createComponent(factory);
            const addonBlockInstance = componentRef.instance;

            addonBlockInstance.blockType = options.blockType;
            addonBlockInstance.hostObject = options.hostObject;

            addonBlockInstance.hostEvents.subscribe((event) => {
                if (options.hostEventsCallback) {
                    options.hostEventsCallback(event);
                }
            });

            return addonBlockInstance;
        } else {
            return null;
        }
    }

    loadAddonBlockInContainer(options: IAddonBlockLoaderOptions) {
        return this.loadAddonBlockInternal(options);
    }

    loadAddonBlockInDialog(options: IAddonBlockLoaderDialogOptions): MatDialogRef<AddonBlockLoaderComponent> | null {
        let dialogRef: MatDialogRef<AddonBlockLoaderComponent> | null = null;
        const addonBlockInstance = this.loadAddonBlockInternal(options);

        if (addonBlockInstance) {
            addonBlockInstance.inDialog = true;
            const pepConfig = this.dialogService.getDialogConfig({ disableClose: false }, options.size || 'full-screen');
            const mergeConfig = {...options.config, ...pepConfig}; 
            const data = options.data || null;
            dialogRef = this.dialogService.openDialog(addonBlockInstance.dialogTemplate, data, mergeConfig);
        }

        return dialogRef;
    }
}
