import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid    
} from '@pepperi-addons/ngx-lib';

import { DataViewConverter } from '@pepperi-addons/data-views';
import { FormDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepFormGeneratorService } from './form-generator.service';


@Component({
    selector: 'pep-form-generator',
    templateUrl: './form-generator.component.html',
    styleUrls: ['./form-generator.component.scss'],
})
export class FormGeneratorComponent implements OnInit {    
    @Input()
    set dataView(val: FormDataView) {
        this.setUiControl(val);
    };

    @Input() 
    set fields(val : Array<ObjectsDataRowCell>) {
        if (val?.length > 0) {
            this._data.Fields = val;
        }
    };

    @Input() 
    set numOfColumns(val : number) {
        this._uiControl.Columns = val;
    };

    @Input()
    showTopBar = false;
    
    @Input() 
    addPadding = false;

    get uiControl() {
        return this._uiControl;
    }

    get data() {
        return this._data;
    }

    private _uiControl: UIControl = new UIControl();
    private _data: ObjectsDataRow = new ObjectsDataRow();

    constructor(
        private layoutService: PepLayoutService,
        public formGeneratorService: PepFormGeneratorService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });

        this.initDefaults();
    }

    ngOnInit() {
        //
    }

    private initDefaults() {
        //Ui Control defaults
        this._uiControl.Columns = 2;
        this._uiControl.ControlFields = [];

        //Data defaults
        this._data.IsEditable = false;
        this._data.IsSelectableForActions = false;
        this._data.UID = PepGuid.newGuid();
        this._data.Fields = [];
    }

    private setUiControl(view: FormDataView) {
        const uiControlData = DataViewConverter.toUIControlData(view);

        if (uiControlData?.ControlFields) {
            this._uiControl.ControlFields = uiControlData.ControlFields.map((field: any) => this.convertToUiControlField(field));
        }

        console.log('uiControl in service', this._uiControl);
    }  

    private convertToUiControlField(field: any): any {
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
    }

}
