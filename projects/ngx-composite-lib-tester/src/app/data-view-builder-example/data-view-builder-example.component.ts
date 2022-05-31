import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { IPepDraggableItem } from '@pepperi-addons/ngx-lib/draggable-items';
import { MenuDataView } from '@pepperi-addons/papi-sdk';

@Component({
    selector: 'app-data-view-builder-example',
    templateUrl: './data-view-builder-example.component.html',
    styleUrls: ['./data-view-builder-example.component.scss'],
})
export class DataViewBuilderExampleComponent implements OnInit {

    availableFields: Array<IPepDraggableItem> = [];
    dataView!: MenuDataView;

    constructor(
    ) { 
        //
    }

    async ngOnInit() {
        
        // Get menu (slugs) dataview
        this.dataView = {
            "InternalID": 5731318,
            "Type": "Menu",
            "Title": "",
            "Hidden": false,
            "CreationDateTime": "2022-04-10T14:19:03Z",
            "ModificationDateTime": "2022-04-28T09:29:01Z",
            "Context": {
                "Name": "Slugs",
                "ScreenSize": "Tablet",
                "Profile": {
                    "InternalID": 72197,
                    "Name": "Admin"
                }
            },
            "Fields": [
                {
                    "FieldID": "tomer_test",
                    "Title": "dac3b036-ee5c-40b8-84d3-3a5ba97fc86d"
                },
                {
                    "FieldID": "tomer_admin",
                    "Title": "dac3b036-ee5c-40b8-84d3-3a5ba97fc86d"
                }
            ]
        }

        this.availableFields = [
            { title: 'field 1', data: 'field1' },
            { title: 'field 2', data: 'field2' },
            { title: 'field 3', data: 'field3' },
            { title: 'tomer test', data: 'tomer_test' },
            { title: 'tomer admin', data: 'tomer_admin' },
            { title: '1field 1', data: '1field1' },
            { title: '1field 2', data: '1field2' },
            { title: '1field 3', data: '1field3' },
            { title: '1tomer test', data: '1tomer_test' },
            { title: '1tomer admin', data: '1tomer_admin' },
            { title: '2field 1', data: '2field1' },
            { title: '2field 2', data: '2field2' },
            { title: '2field 3', data: '2field3' },
            { title: '2tomer test', data: '2tomer_test' },
            { title: '2tomer admin', data: '2tomer_admin' },
            { title: '3field 1', data: '3field1' },
            { title: '3field 2', data: '3field2' },
            { title: '3field 3', data: '3field3' },
            { title: '3tomer test', data: '3tomer_test' },
            { title: '3tomer admin', data: '3tomer_admin' }
        ]
    }

    onDataViewChange(event: any) {
        console.log('onDataViewChange', event);
    }
}
