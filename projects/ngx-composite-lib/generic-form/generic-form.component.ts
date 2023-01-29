import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    ViewContainerRef,
    EventEmitter,   
    Type,
} from '@angular/core';
//import { PepFormComponent } from '@pepperi-addons/ngx-lib/form';
import {
    IPepGenericFormDataView,
    IPepGenericFormValueChange,
    IPepGenericFormFieldUpdate,
    IPepGenericFormData
} from './generic-form.model';
import {
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid,
    PepLayoutService
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
    private _pepFormContainer: ViewContainerRef | undefined;
    @ViewChild('pepFormContainer', { read: ViewContainerRef })
    set pepListContainer(val: ViewContainerRef) {
        this._pepFormContainer = val;
    }

    private _data: any;
    @Input()
    set dataSource(val: any) {
        this._data = val;
    }

    private _formData: ObjectsDataRow;
    private _uiControl: UIControl;
    @Input()
    set dataView(val: IPepGenericFormDataView) {
        this.initForm(val);
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

    private _pepForm: any;

    constructor(        
        private layoutService: PepLayoutService,
        public _genericFormService: PepGenericFormService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });
        this._formData = new ObjectsDataRow();
        this._uiControl = new UIControl();
    }

    ngOnInit() {
        //        
    }

    private initForm(dataView: IPepGenericFormDataView) {
        setTimeout(async () => {
            if (this._pepFormContainer) {
                if (this._pepFormContainer.length) {
                    this._pepFormContainer.remove();
                    this._formData = new ObjectsDataRow();
                    this._uiControl = new UIControl();
                }               
                const { PepFormComponent } = await import('@pepperi-addons/ngx-lib/form');                  
                const componentRef = this._pepFormContainer.createComponent(PepFormComponent);    

                this._pepForm = componentRef.instance;

                this._formData.IsEditable = !this.isLocked;
                this._formData.UID = dataView.UID || PepGuid.newGuid();
                const uiControlData = DataViewConverter.toUIControlData(dataView);
                if (uiControlData) {
                    if (uiControlData?.ControlFields) {
                        this._uiControl.ControlFields = uiControlData.ControlFields.map((field: any) => this._genericFormService.convertToUiControlField(field));
                    }
                    this._uiControl.Columns = uiControlData.Columns;

                    if (this._uiControl.ControlFields?.length) {
                        this._formData.Fields = [];
                        this._uiControl.ControlFields.forEach((item) => {
                            let value = '';
                            if (this._genericFormService.hasProperty(this._data, item.ApiName)) {
                                value = this._data[item.ApiName];
                            }
                            let dataViewField: any;
                            if (dataView.Fields) {
                                dataViewField = dataView.Fields.find(field => field.FieldID === item.ApiName);
                            }
                            const controlFieldData = {
                                ...item,
                                ...{
                                    controlFieldValue: value
                                },
                                ...{
                                    OptionalValues: dataViewField?.OptionalValues?.length ? dataViewField.OptionalValues : [],
                                    AdditionalProps: dataViewField?.AdditionalProps || null
                                }
                            }
                            this._formData.Fields.push(this._genericFormService.createFormField(controlFieldData));
                        });

                        componentRef.instance.layoutType = 'form';
                        componentRef.instance.layout = this._uiControl;
                        componentRef.instance.data = this._formData;
                        componentRef.instance.isInternal = false;
                        componentRef.instance.lockFields = this.isLocked;
                        componentRef.instance.valueChange.subscribe(($event) => {
                            this.onValueChanged($event);
                        });
                        componentRef.instance.fieldClick.subscribe(($event) => {
                            this.onfieldClicked($event);
                        });
                        componentRef.instance.formValidationChange.subscribe(($event) => {
                            this.onFormValidationChanged($event);
                        });
                    }
                }

            }

        }, 0);
    }

    /**
     * updates form field's value
     * @param field object containing the data of the required update
     */
    private updateFieldValue(fieldChanged: IPepGenericFormValueChange) {
        this._data[fieldChanged.ApiName] = fieldChanged.Value;
    }

    getData(): IPepGenericFormData {
        return {
            UID: this._formData.UID,
            Values: this._data
        };
    }

    /**
    * updates form field(s) params
    * @param fields
    */
    updateFields(fields: IPepGenericFormFieldUpdate[]) {
        // update data view with current data
        for (const [key, value] of Object.entries(this._data)) {
            const index = this._formData.Fields.findIndex((item) => item.ApiName === key);
            if (index >= 0) {
                const item = this._formData.Fields[index] as { [k: string]: any };
                item.Value = value;
            }
        }

        fields.forEach((field) => {
            const index = this._formData.Fields.findIndex((item) => item.ApiName === field.FieldId);
            if (index >= 0) {
                for (const [key, value] of Object.entries(field.Params)) {
                    if (this._genericFormService.hasProperty(this._formData.Fields[index], key)) {
                        const item = this._formData.Fields[index] as { [k: string]: any };
                        item[key] = value;
                        if (key === 'Value') {
                            //manually updating formattedValue because FormattedValue is legacy used by webapp
                            item.FormattedValue = value;
                        }
                    }
                }
            }
        });
        this._pepForm.ReloadForm()
        this._pepForm.data = this._formData;
    }

    onValueChanged(event: any) {
        const field: IPepGenericFormValueChange = {
            UID: event.id,
            ApiName: event.key,
            Value: event.value
        };
        this.updateFieldValue(field);
        this.valueChange.emit(field);
    }

    onfieldClicked(event: any) {
        const field: IPepGenericFormValueChange = {
            UID: event.id,
            ApiName: event.key,
            Value: event.value
        };
        this.updateFieldValue(field);
        this.fieldClick.emit(field);
    }

    onFormValidationChanged(event: any) {
        this.formValidationChange.emit(event);
    }


}
