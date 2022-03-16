import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { FakeDataViewFields, FakeData, uiControlData } from './fake-data';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataViewConverter } from '@pepperi-addons/data-views';

import {
    IPepGenericFormDataSource,
    IPepGenericFormDataView,    
    PepGenericFormService
} from '@pepperi-addons/ngx-composite-lib/generic-form';


@Component({
    selector: 'app-generic-form-example',
    templateUrl: './generic-form-example.component.html',
    styleUrls: ['./generic-form-example.component.scss']
})
export class GenericFormExampleComponent implements OnInit {
    /*dataSource: IPepGenericFormDataSource = {
        UID: 'ABCD-DCBA',
        IsEnabled: true,
        Values: FakeData,
    };*/
    dataSource: any = FakeData;
    isLocked = false;

    dataView: IPepGenericFormDataView = {
        UID: 'ABCD-DCBA-FGHD-POLK',
        Type: 'Form',
        Hidden: false,
        Columns: [{}],
        Context: {
            Object: {
                Resource: 'transactions',
                InternalID: 290714,
                Name: '1OlegImpExpרg'
            },
            Name: 'OrderCartItemForm',
            ScreenSize: 'Tablet',
            Profile: {
                InternalID: 46273,
                Name: 'Rep'
            }
        },
        Fields: FakeDataViewFields,
        Rows: []

    };


    inline = false;
    form: FormGroup = this.fb.group({
        key: 'key1field',
        value: 'abc',
        mandatory: false,
        readonly: false,
        disabled: false,
        maxFieldCharacters: 0,
        type: 'text',
        minValue: 0,
        maxValue: 999999,
    });

    constructor(private genericFormService: PepGenericFormService, private fb: FormBuilder) {
        //
    }

    ngOnInit(): void {
        //
      //  console.log('data view', DataViewConverter.toDataView(uiControlData));
      //  console.log('data view 2', this.dataView);

    }



    onValueChanged(event: any) {
        console.log('on form value changed', event)
      //  this.isLocked = true;
    }

    onGetDataClicked() {
        console.log('get data', this.genericFormService.getData());
    }
}
