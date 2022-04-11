import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { PepLayoutService } from '@pepperi-addons/ngx-lib';
import {
    IPepGenericFormDataView,
    IPepGenericFormValueChange,
    IPepGenericFormFieldUpdate,
    IPepGenericFormDataSource
} from './generic-form.model';
import {
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid
} from '@pepperi-addons/ngx-lib';
import { DataViewConverter } from '@pepperi-addons/data-views';
import { PepGenericFormService } from './generic-form.service';


@Component({
    selector: 'pep-generic-form',
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
    providers: [PepGenericFormService]
})
export class GenericFormComponent implements OnInit {
    private _data: any;
    @Input()
    set dataSource(val: any) {
        this._data = val;
        this.createFormFields();      
    }

    private _optionalValues: any[] = [];
    formData: ObjectsDataRow;
    uiControl: UIControl;
    @Input()
    set dataView(val: IPepGenericFormDataView) {
        if (val) {    
            this.formData.IsEditable = !this.isLocked;
            this.formData.UID = val.UID || PepGuid.newGuid();
            const uiControlData = DataViewConverter.toUIControlData(val);
            if (uiControlData) {
                if (uiControlData?.ControlFields) {
                    val.Fields?.forEach((field: any) => {
                        if (field.OptionalValues?.length) {
                            this._optionalValues.push({
                                fieldId: field.FieldID,
                                optionalValues: field.OptionalValues
                            });
                        }
                    });
                    this.uiControl.ControlFields = uiControlData.ControlFields.map((field: any) => this._genericFormService.convertToUiControlField(field));
                   
                }
                this.uiControl.Columns = uiControlData.Columns;
                this.createFormFields();
            }
        }        
    }

    @Input()
    isLocked = false;    

    @Input()
    inline = false;

    @Input()
    showTopBar = false;

    @Input()
    addPadding = false;

    @Output()
    valueChange: EventEmitter<IPepGenericFormValueChange> = new EventEmitter<IPepGenericFormValueChange>();

    @Output()
    fieldClick: EventEmitter<IPepGenericFormValueChange> = new EventEmitter<IPepGenericFormValueChange>();

    @Output()
    formValidationChange: EventEmitter<boolean> = new EventEmitter<boolean>();  

    constructor(
        private layoutService: PepLayoutService,
        public _genericFormService: PepGenericFormService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });
        this.formData = new ObjectsDataRow();  
        this.uiControl = new UIControl();
    }

    ngOnInit() {
        //
    }

    private createFormFields() {
        if (this._data && this.uiControl?.ControlFields?.length) {
            this.formData.Fields = [];
            this.uiControl.ControlFields.forEach((item) => {
                let value = '';
                if (this._genericFormService.hasProperty(this._data, item.ApiName)) {
                    value = this._data[item.ApiName];
                }
                this.formData.Fields.push(this._genericFormService.createFormField(item, value, this.getOptionalValues(item.ApiName)) as ObjectsDataRowCell);
            });
        }
    }    

    /**
     * updates form field's value
     * @param field object containing the data of the required update
     */
     private updateFieldValue(fieldChanged: IPepGenericFormValueChange) {
        this._data[fieldChanged.apiName] = fieldChanged.value;
    }

    private getOptionalValues(fieldId: string) {
        const item = this._optionalValues.find((item: any) => item.fieldId === fieldId);
        return item?.optionalValues || [];
    }

    getData() {
        return {
            UID: this.formData.UID,
            Values: this._data
        };
    }   

    /**
    * updates form field(s) params
    * @param fields
    */
    updateFields(fields: Array<IPepGenericFormFieldUpdate>) {
        fields.forEach((field) => {
            const index = this.formData.Fields.findIndex((item) => item.ApiName === field.FieldId);
            if (index >= 0) {
                for (const [key, value] of Object.entries(field.Params)) {
                    if (this._genericFormService.hasProperty(this.formData.Fields[index], key)) {
                        const item = this.formData.Fields[index] as { [k: string]: any };
                        item[key] = value;
                    }
                }
            }
        });
    }

    onValueChanged(event: any) {
        const field: IPepGenericFormValueChange = {
            uid: event.id,
            apiName: event.key,
            value: event.value
        };
        this.updateFieldValue(field);
        this.valueChange.emit(field);
    }

    onfieldClicked(event: any) {
        const field: IPepGenericFormValueChange = {
            uid: event.id,
            apiName: event.key,
            value: event.value
        };
        this.updateFieldValue(field);
        this.fieldClick.emit(field);
    }

    onFormValidationChanged(event: any) {
        this.formValidationChange.emit(event);
    }


}
