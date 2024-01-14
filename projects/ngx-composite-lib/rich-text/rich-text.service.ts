import { Injectable } from "@angular/core";
import { PepHttpService, PepSessionService } from '@pepperi-addons/ngx-lib';
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RichTextService {
    
    constructor(
        private httpService: PepHttpService
        ) {
    }
    
    async searchFlows(flowKey: string): Promise<any> {
        return lastValueFrom(await this.httpService.postPapiApiCall('/user_defined_flows/search', { KeyList: [flowKey], Fields: ['Key', 'Name']}));
    }
}