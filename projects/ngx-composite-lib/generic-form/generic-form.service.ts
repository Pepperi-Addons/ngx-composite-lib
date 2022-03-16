import { Injectable, ViewContainerRef } from '@angular/core';
import { PepListComponent } from '@pepperi-addons/ngx-lib/list';
import { BehaviorSubject } from 'rxjs';
import {
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid
} from '@pepperi-addons/ngx-lib';
import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { DataViewConverter } from '@pepperi-addons/data-views';
import {
    IPepGenericFormDataSource,
    IPepGenericFormDataView,
    IPepGenericFormData,
    IPepGenericFormValueChange,
    IPepGenericFormFieldUpdate,
    IPepGenericFormDataParams
} from './generic-form.model';
//import { uiControlData } from 'projects/ngx-composite-lib-tester/src/app/generic-form-example/fake-data';


interface aaabbb {
    fielda: string;
    fieldb: number;
}

@Injectable({
    providedIn: 'root'
})
export class PepGenericFormService {
    //private readonly NUM_OF_FORM_COLUMNS = 2;

    private _uiControl: UIControl = new UIControl();
    private _data: any; //input form data
    private _formData: ObjectsDataRow = new ObjectsDataRow();
    private _optionalValues: any[] = [];

    get uiControl() {
        return this._uiControl;
    }

    get data() {
        return this._formData;
    }

    constructor() {
       // this.initDefaults();
    }

    /*
    private initDefaults() {
        //Ui Control defaults
        this._uiControl.Columns = 2;//this.NUM_OF_FORM_COLUMNS;
        this._uiControl.ControlFields = [];

        //Data defaults
        this._formData.IsEditable = false;
        this._formData.IsSelectableForActions = false;
        this._formData.UID = PepGuid.newGuid();
        this._formData.Fields = [];
    } */

    setDataSource(data: IPepGenericFormDataSource) {        
        if (data) {           
            this._data = data;
            this.createFormFields();            
        }
    }

    setUiControl(view: IPepGenericFormDataView) {
        if (view) {         
            this._formData.IsEditable = !(view.IsEnabled === false);
            this._formData.UID = view.UID || PepGuid.newGuid();
            const uiControlData = DataViewConverter.toUIControlData(view);         
            if (uiControlData) {
                if (uiControlData?.ControlFields) {                   
                    view.Fields?.forEach((field: any) => {
                        if (field.OptionalValues?.length) {
                            this._optionalValues.push( {
                                fieldId: field.FieldID,
                                optionalValues: field.OptionalValues
                            });
                        }
                    });                   
                    this._uiControl.ControlFields = uiControlData.ControlFields.map((field: any) => this.convertToUiControlField(field));
                }
                this._uiControl.Columns = uiControlData.Columns;
                this.createFormFields();
            }          
        }
    }

    createFormFields() {
      if (this._data && this._uiControl?.ControlFields?.length) {      
            const fields = new Array<ObjectsDataRowCell>();

            for (const [key, value] of Object.entries(this._data)) {
                const field = this.createFormField(key, value) as ObjectsDataRowCell;
                if (field) {
                    fields.push(field);
                }
            }
            this._formData.Fields = fields;            
        }
    }

    getData() {
        return {
            UID: this._formData.UID,
            Values: this._data
        };      
    }

    /**
     * updates the params of form field(s)
     * @param fields 
     */
    updateFields(fields: Array<IPepGenericFormFieldUpdate>) {
       fields.forEach((field) => {
            const index = this._formData.Fields.findIndex((item) => item.ApiName === field.FieldId);
            if (index >= 0) {
                for (const [key, value] of Object.entries(field.Params)) {
                    if (this.hasProperty(this._formData.Fields[index], key)) {
                        let item = this._formData.Fields[index] as { [k: string]: any };
                        item[key] = value;
                    }
                }
            }
        }); 
    }

    /**
     * updates form field's value
     * @param field object containing the data of the required update
     */
    updateFieldValue(fieldChanged: IPepGenericFormValueChange) {
        if (this.hasProperty(this._data, fieldChanged.apiName)) {
            this._data[fieldChanged.apiName] = fieldChanged.value;
        }       
    }

      /**
    * checks if the object contains property
    * @param obj object
    * @param prop property name
    * @returns true if contains, false otherwise
    */
       private hasProperty(obj: any, prop: string) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }     

    private createFormField(key: string, value: any) {
        const uiControlItem = this._uiControl.ControlFields.find((item) => item.ApiName === key);

        if (uiControlItem) {
            const field = new ObjectsDataRowCell();
            /*const field: { [k: string]: any } = new ObjectsDataRowCell();
            
            field.GroupFields = [];
            if (value !== null && typeof value === 'object') {
                for (const [objKey, objValue] of Object.entries<any>(value)) {
                    //in case of property GroupFields need to create the group fields 
                    if (objKey === 'GroupFields' && objValue?.length) {
                        for (let i = 0; i < objValue.length; i++) {
                            for (const [groupFieldKey, groupFieldValue] of Object.entries<any>(objValue[i])) {
                                const concatField = this.createFormField(groupFieldKey, groupFieldValue);
                                if (concatField) {
                                    field.GroupFields.push(concatField);
                                }
                            }
                        }

                    } else {
                        field[objKey] = objValue;
                    }
                }

            } else {
                field.Value = value;
            } */

            field.ApiName = key;
            field.Value = value;
            field.FieldType = uiControlItem.FieldType;
            field.Enabled = !uiControlItem.ReadOnly;            
            field.Visible = true;            
            field.Accessory = "";
            field.AdditionalValue = "";            
            field.BackgroundColor = "";           
            field.FormattedValue = "";
            field.GroupFields = [];
            field.Highlighted = false;
            field.NotificationInfo = "";
            field.OptionalValues =  this.getOptionalValues(key);
            field.ReferenceObjectInternalType =  "";
            field.ReferenceObjectSubType =  "";
            field.ReferenceObjectType =  '0';
            field.TextColor =  "";
            field.UiPageKey =  "";
            
            return field;

        }

        return null;
    }

    private getOptionalValues(fieldId: string) {
        const item = this._optionalValues.find((item: any) => item.fieldId === fieldId);
        return item?.optionalValues || [];
    }

    /*
    private setUpdatedValue(fields: ObjectsDataRowCell[], fieldChanged: IPepGenericFormValueChange) {
        for (const field of fields) {
            if (field.ApiName === fieldChanged.apiName) {
                field.Value = fieldChanged.value;
                field.FormattedValue = '';
                break;
            }
            if (field.GroupFields && field.GroupFields.length > 0) {
                this.setUpdatedValue(field.GroupFields, fieldChanged);
            }
        }

    } */

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