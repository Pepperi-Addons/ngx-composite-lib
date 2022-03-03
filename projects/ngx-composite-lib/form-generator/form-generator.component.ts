import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,
    ObjectsDataRowCell,
    PepRowData,
    PepScreenSizeType,
    PepGuid,
    UIControl
} from '@pepperi-addons/ngx-lib';

import { DataViewConverter } from '@pepperi-addons/data-views';


import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepFormGeneratorService } from './form-generator.service';


@Component({
    selector: 'pep-form-generator',
    templateUrl: './form-generator.component.html',
    styleUrls: ['./form-generator.component.scss'],
})
export class FormGeneratorComponent implements OnInit {
    @Input()
    set dataView(val: FormDataView) {
        //this.setUiControl(val);
        this.formGeneratorService.setUiControl(val);
      //  Type: 'Form',
       // Columns: 
       // Fields: BaseFormDataViewField[]
    };

    @Input() 
    set fields(val : Array<ObjectsDataRowCell>) {
        this.formGeneratorService.setData(val);
    };

    @Input() 
    set numOfColumns(val : number) {
        this.formGeneratorService.setNumOfColumns(val);
    };

    get uiControl() {
        return this.formGeneratorService.uiControl;
    }

    get data() {
        return this.formGeneratorService.data;
    }

    constructor(
        private layoutService: PepLayoutService,
        public formGeneratorService: PepFormGeneratorService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });
    }

    ngOnInit() {
        //
    }

    /*
    private setUiControl(view: FormDataView) {
        console.log('setUiControl', view);
        const uiControl = this.getUiControl(DataViewConverter.toUIControlData(view));
        console.log('converted data', uiControl);
    }

    private getUiControl(data: any): UIControl {
        console.log('getUiControl', data);
        const uiControl = new UIControl();
        uiControl.ControlFields = [];

        if (data?.ControlFields) {
            uiControl.ControlFields = data.ControlFields.map((field: any) => this.convertToUiControlField(field));
        }

        return uiControl;
    }

    private convertToUiControlField(field: any) {
        return {
            ApiName: field.ApiName,
            FieldType: field.FieldType,
            Title: field.Title,
            ReadOnly: field.ReadOnlyField,
            ColumnWidth: field.ColumnWidth,
            ColumnWidthType: 1,
            Layout: {
                X: field.Layout.X,
                Y: field.Layout.Y,
                Width: field.Layout.Width,
                Height: field.Layout.Field_Height,
                XAlignment: field.Layout.xAlignment,
                YAlignment: field.Layout.yAlignment,
            }
        }
    } */

}
