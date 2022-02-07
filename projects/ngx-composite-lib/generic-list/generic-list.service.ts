import { Injectable } from '@angular/core';
import { PepListComponent } from '@pepperi-addons/ngx-lib/list';

@Injectable({
    providedIn: 'root'
})
export class PepGenericListService {
    private _pepList: any;
   
    constructor() {
        //
    }

    set pepList(val: any) {
        this._pepList = val;
    }

    get pepList() {
        return this._pepList;
    }
   
    getItemById(id: string) {
        if (this._pepList) {
            return this._pepList.getItemDataByID(id);
        } else { 
            return null;
        }        
    }

    getSelectedItems() {
        if (this._pepList) {
            return this._pepList.getSelectedItemsData();
        } else { 
            return null;
        }  
    }

}