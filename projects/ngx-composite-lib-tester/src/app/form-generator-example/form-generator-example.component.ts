import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { FakeDataViewFields, FakeData } from './fake-data';

@Component({
    selector: 'app-form-generator-example',
    templateUrl: './form-generator-example.component.html',
    styleUrls: ['./form-generator-example.component.scss']
})
export class FormGeneratorExampleComponent implements OnInit {
    dataView: FormDataView = {
        Type: 'Form',
        Context: {
            Name: '',
            Profile: { InternalID: 0 },
            ScreenSize: 'Landscape'
        },
        Fields: FakeDataViewFields
    }
    fields: any[] = FakeData;

    constructor() {
        //
    }

    ngOnInit(): void {
       //
      
    }

    

    
    
}
