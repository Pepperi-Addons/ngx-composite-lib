import { Observable } from 'rxjs';
import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import {PepHttpService, PepDataConvertorService, PepSessionService} from '@pepperi-addons/ngx-lib';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';

export type addonClockType = 'assets-manager' | '';
@Injectable({ providedIn: 'root' })
export class AddonBlockLoaderService {
    //tempToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRiYTFjNzJmMTI3NThjYzEzMzg3ZWQ3YTBiZjNlODg3IiwidHlwIjoiSldUIn0.eyJuYmYiOjE2NDc3ODY2NDgsImV4cCI6MTY0Nzc5MDI0OCwiaXNzIjoiaHR0cHM6Ly9pZHAuc2FuZGJveC5wZXBwZXJpLmNvbSIsImF1ZCI6WyJodHRwczovL2lkcC5zYW5kYm94LnBlcHBlcmkuY29tL3Jlc291cmNlcyIsInBlcHBlcmkuYXBpbnQiLCJwZXBwZXJpLndhY2QiXSwiY2xpZW50X2lkIjoiaW9zLmNvbS53cm50eS5wZXBwZXJ5Iiwic3ViIjoiOTE1ZWUxODItNTk3Ni00ZjJlLWFhOGQtZDQ1ZjI3N2Y2OTdjIiwiYXV0aF90aW1lIjoxNjQ3Nzg2NjQ4LCJpZHAiOiJsb2NhbCIsInBlcHBlcmkuYXBpbnRiYXNldXJsIjoiaHR0cHM6Ly9yZXN0YXBpLnNhbmRib3gucGVwcGVyaS5jb20iLCJlbWFpbCI6Ik9kZWRAcGVwcGVyaXRlc3QuY29tIiwicGVwcGVyaS5pZCI6MTE0NzcwOTcsInBlcHBlcmkudXNlcnV1aWQiOiI5MTVlZTE4Mi01OTc2LTRmMmUtYWE4ZC1kNDVmMjc3ZjY5N2MiLCJwZXBwZXJpLmRpc3RyaWJ1dG9ydXVpZCI6IjBhM2FmNGU3LTMyZGUtNDExOC04Y2NmLTVkOWRiZDc5YzA0MSIsInBlcHBlcmkuZGlzdHJpYnV0b3JpZCI6MzAwMTUwMzEsInBlcHBlcmkuZGF0YWNlbnRlciI6InNhbmRib3giLCJwZXBwZXJpLmVtcGxveWVldHlwZSI6MSwicGVwcGVyaS5iYXNldXJsIjoiaHR0cHM6Ly9wYXBpLnN0YWdpbmcucGVwcGVyaS5jb20vVjEuMCIsInBlcHBlcmkud2FjZGJhc2V1cmwiOiJodHRwczovL2NwYXBpLnN0YWdpbmcucGVwcGVyaS5jb20iLCJuYW1lIjoiT2RlZCBBbnN3ZXIiLCJzY29wZSI6WyJwZXBwZXJpLmFwaW50IiwicGVwcGVyaS53YWNkIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.XIpG0urTDreOIB3ehAKQqeQoFLiCYnxqYdXo61XaOWuJQe5hvJXNvjdnNuoC79GDiayHXEbrlsExcg5JYnou46bf35D9tEKQSx1ZF5S_vhSZcc5vg7OlS-2_AGJdov0RqC22Ti2nIBoWRkQK_Xv1D9aNWoE23ygD85bHyEI76z35aqpsUY6vy4yR_L-2p9GByslkYByaU9ES4RgLDCefTbo9C40ux0sH62IeJnC9cOC7hSIaCdMzvXVUg1BFh5ZvZGybaqwMRCXmc5XgvgN9e1Q3ej2Mje-Rt4Vqz9OCYHZJ3GZEiyzEatJDXFAwfXhQJypPu9ucNL_r8jy_r5FIGQ"
    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    pagesUUID = '50062e0c-9967-4ed4-9102-f2bc50602d41';
    assetsUUID = 'ad909780-0c23-401e-8e8e-f514cc4f6aa2';

    'assets-manager'

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.sessionService.getIdpToken(),
            suppressLogging:true
        })
    }

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

    async getRemoteLoaderOptions(blockType: addonClockType): Promise<PepRemoteLoaderOptions | null> {
        let addon;
        let defaultRemoteName = 'addon';
        let defaultModuleName = 'AddonModule';
        let defaultComponentName = 'AddonComponent';

        switch (blockType) {
            case 'assets-manager':
                addon = await this.getInstalledAddons(this.assetsUUID);
                break;
        
            default:
                break;
        }

        if (addon) {
            return {
                addonId: addon.Addon.UUID,
                remoteEntry: addon.PublicBaseURL,
                remoteName: defaultRemoteName,
                exposedModule: `./${defaultModuleName}`,
                componentName: defaultComponentName, 
            }
        } else {
            return null;
        }
    }
    
    private async getInstalledAddons(addonUUID: string): Promise<any>{
        const endpoint = `/addons/installed_addons/${addonUUID}`;
        return this.httpService.getPapiApiCall(endpoint).toPromise();
    }

    // async get(endpoint: string): Promise<any> {
    //     return await this.papiClient.get(endpoint);
    // }

    // async post(endpoint: string, body: any): Promise<any> {
    //     return await this.papiClient.post(endpoint, body);
    // }

    // pepGet(endpoint: string): Observable<any> {
    //     return this.pepHttp.getPapiApiCall(endpoint);
    // }

    // pepPost(endpoint: string, body: any): Observable<any> {
    //     return this.pepHttp.postPapiApiCall(endpoint, body);
    // }

}
