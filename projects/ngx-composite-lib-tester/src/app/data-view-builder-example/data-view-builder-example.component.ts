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
            { title: 'tomer admin', data: 'tomer_admin' }
        ]
    }
}
