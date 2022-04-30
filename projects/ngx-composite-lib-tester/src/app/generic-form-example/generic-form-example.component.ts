import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { FakeDataViewFields, FakeData, uiControlData } from './fake-data';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataViewConverter } from '@pepperi-addons/data-views';

import {
    IPepGenericFormDataView,
    PepGenericFormService
} from '@pepperi-addons/ngx-composite-lib/generic-form';
import { GenericFormComponent } from '@pepperi-addons/ngx-composite-lib/generic-form';


@Component({
    selector: 'app-generic-form-example',
    templateUrl: './generic-form-example.component.html',
    styleUrls: ['./generic-form-example.component.scss']
})
export class GenericFormExampleComponent implements OnInit {
    @ViewChild('formContainer') formContainer: GenericFormComponent | undefined;

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

    getInitialDataView() {
        return {
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
        }
    }

    onGetDataClicked() {
        console.log('get data', this.formContainer?.getData());
       /* this.dataView = {
            UID: 'AAAA-DCBA-FGHD-DDDD',
            Type: 'Form',
            Hidden: false,
            Columns: [{}],
            Context: {
                Object: {
                    Resource: 'transactions',
                    InternalID: 290714,
                    Name: 'Form2'
                },
                Name: 'OrderCartItemForm',
                ScreenSize: 'Tablet',
                Profile: {
                    InternalID: 46273,
                    Name: 'Rep'
                }
            },
            Fields: [FakeDataViewFields[0], FakeDataViewFields[1], FakeDataViewFields[2], FakeDataViewFields[3]],
            Rows: []
        }
        this.dataSource = {
            ActionDateTime: '2021-10-11T09:26:02Z',
        }*/
    }

    onSaveDataClicked() {
        /*this.dataView = {
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
        }
        this.dataSource = FakeData;*/
        this.formContainer?.updateFields([
            {
                FieldId: 'ActionDateTime',
                Params: {
                    Enabled: false
                }
            }
        ]);
    }
}
