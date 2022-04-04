import { Observable } from 'rxjs';
import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import {PepHttpService, PepDataConvertorService, PepSessionService} from '@pepperi-addons/ngx-lib';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { addonBlockType, assetsManager } from './addon-block-loader-model';

@Injectable({ providedIn: 'root' })
export class AddonBlockLoaderService {
    constructor(
        public sessionService:  PepSessionService,
        public pepperiDataConverter: PepDataConvertorService,
        private httpService: PepHttpService
    ) {
        // window.sessionStorage.setItem('idp_token',this.tempToken)
        // const accessToken = this.session.getIdpToken();
      
        // this.parsedToken = jwt(accessToken);
        // this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }

    private async getInstalledAddons(addonUUID: string): Promise<any>{
        const endpoint = `/addons/installed_addons/${addonUUID}`;
        return this.httpService.getPapiApiCall(endpoint).toPromise();
    }

    async getRemoteLoaderOptions(blockType: addonBlockType): Promise<PepRemoteLoaderOptions | null> {
        let addon;
        let defaultRemoteName = 'addon';
        let defaultModuleName = 'AddonModule';
        let defaultComponentName = 'AddonComponent';

        switch (blockType) {
            case 'assets-manager':
                addon = await this.getInstalledAddons(assetsManager.addonId);
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
            return null;
        }
    }
}
