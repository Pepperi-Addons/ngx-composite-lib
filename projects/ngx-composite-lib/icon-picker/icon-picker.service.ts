import { Injectable } from "@angular/core";
import { PepHttpService } from '@pepperi-addons/ngx-lib';


@Injectable({
    providedIn: 'root',
})
export class FlowPickerService {
    
    constructor(
        private httpService: PepHttpService
        ) {
    }
}