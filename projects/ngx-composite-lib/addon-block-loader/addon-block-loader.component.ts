import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepTextboxComponent } from '@pepperi-addons/ngx-lib/textbox';
import { AddonEndpoint } from '@pepperi-addons/papi-sdk/dist/endpoints';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { AddonBlockLoaderService } from './addon-block-loader-service';
import { RemoteLoaderComponent } from './remote-loader/remote-loader.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pep-addon-block-loader',
    templateUrl: './addon-block-loader.component.html',
    styleUrls: ['./addon-block-loader.component.scss']
})
export class AddonBlockLoaderComponent implements OnInit {
   
    @Input() blockType: string = 'assets-manager';
    @Input() isOnPopUp: boolean = true;
    // @Input() filesList: Array<FileStatus> = [];
    @Input() hostObject = {};

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @Output() blockLoad: EventEmitter<void> = new EventEmitter<void>();
    
    private dialogRef: MatDialogRef<RemoteLoaderComponent> | null = null;

    blockData = {
        remoteEntry: '',
        addonUUID: '',
        key: ''
    };
    
    remotePathOptions: any = null;

    // remotePathOptions  = {
    //     key:  '',
    //     addonId: this.addonUUID,
    //     remoteEntry: /*this.remoteEntry,*/'https://cdn.pepperi.com/Addon/Public/ad909780-0c23-401e-8e8e-f514cc4f6aa2/0.0.8/addon.js',// this.getRemoteEntryByType(relation, 
    //     remoteName: 'addon',
    //     exposedModule: './AddonModule',
    //     componentName: 'AddonComponent'
    // }

    
    constructor(private addonBlockLoaderService: AddonBlockLoaderService, private dialogService: PepDialogService) {
       
    }
    

     async ngOnInit() {
         this.remotePathOptions = await this.getRemoteOptions();
        // this.setRemoteOptions().then(res => {
        //     this.remotePathOptions = res;
        // });
        
        // TODO: Change this to open in function
        if (this.isOnPopUp) {
            this.dialogRef = this.dialogService.openDialog(
                RemoteLoaderComponent, {
                    remotePathOptions: this.remotePathOptions,
                    hostObject: this.hostObject,
                },
            );
    
            // TODO: Return another event for this or expose this.dialogRef to the user
            // this.dialogRef.afterClosed().subscribe((value) => {
            //     if (value !== undefined && value !== null) {
                    
            //     }
            // });
        }
    }

    async getRemoteOptions() {

        this.blockData = await this.addonBlockLoaderService.getPublicBaseURL(this.blockType);

        return {
            addonId: this.blockData.addonUUID,
            remoteEntry: this.blockData.remoteEntry,
            remoteName: 'addon',
            exposedModule: './AddonModule',
            displayName: '',
            componentName: 'AddonComponent', 
        };
    }

    // onCloseClicked(event: any): void {
    //     this.closeClick.emit();
    // }

    onBlockLoad() {
        this.blockLoad.emit();
    }

    onHostEvents(event: any) {
        this.hostEvents.emit(event);
    }


}