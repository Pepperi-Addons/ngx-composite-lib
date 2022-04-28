import { Observable } from 'rxjs';
import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import {PepHttpService, PepDataConvertorService, PepSessionService} from '@pepperi-addons/ngx-lib';

@Injectable({ providedIn: 'root' })
export class DIMXService {
    //tempToken = ""
    accessToken = '';
    parsedToken: any
    papiBaseURL = ''

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            suppressLogging:true
        })
    }

    constructor(
        public session:  PepSessionService,
        public pepperiDataConverter: PepDataConvertorService,
        private pepHttp: PepHttpService
    ) {
        //window.sessionStorage.setItem('idp_token',this.tempToken)
        const accessToken = this.session.getIdpToken();
      
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }

    async get(endpoint: string): Promise<any> {
        return await this.papiClient.get(endpoint);
    }

    async post(endpoint: string, body: any): Promise<any> {
        return await this.papiClient.post(endpoint, body);
    }

    pepGet(endpoint: string): Observable<any> {
        return this.pepHttp.getPapiApiCall(endpoint);
    }

    pepPost(endpoint: string, body: any): Observable<any> {
        return this.pepHttp.postPapiApiCall(endpoint, body);
    }

}
