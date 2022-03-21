import { Injectable, ViewContainerRef } from '@angular/core';
import { PepListComponent } from '@pepperi-addons/ngx-lib/list';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PepGenericListService {   
    private _refresh$ = new BehaviorSubject<boolean>(false);
    
    private _pepList: any;    

    public refresh$ = this._refresh$.asObservable();
       
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

    /*
    refreshTable() {
        this._refresh$.next(true);
    } */


}