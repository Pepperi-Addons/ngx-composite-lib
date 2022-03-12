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
    IPepGenericFormValueChange
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
    private _data: IPepGenericFormDataSource | undefined;
    private _formData: ObjectsDataRow = new ObjectsDataRow();

    get uiControl() {
        return this._uiControl;
    }

    get data() {
        return this._formData;
    }

    constructor() {
        this.initDefaults();
    }

    private initDefaults() {
        //Ui Control defaults
        this._uiControl.Columns = 2;//this.NUM_OF_FORM_COLUMNS;
        this._uiControl.ControlFields = [];

        //Data defaults
        this._formData.IsEditable = false;
        this._formData.IsSelectableForActions = false;
        this._formData.UID = PepGuid.newGuid();
        this._formData.Fields = [];
    }

    setDataSource(data: IPepGenericFormDataSource) {
        console.log('setDataSource', data);
        if (data) {
            // this._data = data;
            this._formData.IsEditable = !(data.IsEnabled === false);
            this._formData.IsSelectableForActions = false;
            //   if (data.UID) {
            this._formData.UID = data.UID || PepGuid.newGuid();
            // }
            this._data = data;
            this.createFormFields();
            /*
            if (data.Values) {
                this._formData.Fields = this.convertToFormFields(data.Values);
            } */
            //     console.log('this._formData', this._formData);
        }
    }

    setUiControl(val: FormDataView) {
        if (val) {
            // if (val.dataView) {
            const uiControlData = DataViewConverter.toUIControlData(val);
            if (uiControlData) {
                if (uiControlData?.ControlFields) {
                    this._uiControl.ControlFields = uiControlData.ControlFields.map((field: any) => this.convertToUiControlField(field));

                }
                this._uiControl.Columns = uiControlData.Columns;
                this.createFormFields();
            }
            // }
            //  if (val.numOfColumns > 0) {

            // } 

            //console.log('uiControl in service', this._uiControl);
        }
    }

    createFormFields() {
        console.log('createFormFields');

        if (this._data?.Values && this._uiControl?.ControlFields?.length) {
            console.log('createFormFields passed');
            const fields = new Array<ObjectsDataRowCell>();

            for (const [key, value] of Object.entries(this._data.Values)) {
                console.log(`${key}: ${value}`);

                const field = this.createFormField(key, value) as ObjectsDataRowCell;
                if (field) {
                    fields.push(field); 
                }
            }

            this._formData.Fields = fields;
            console.log('createFormFields fields', fields);
        }



    }

    getData() {
        return {
            UID: this._formData.UID,
            Values: this._formData.Fields
        } as IPepGenericFormDataSource;
        /*
        const data: IPepGenericFormData = {
            data: {
                uid: this._data.UID,
                isEnabled: this._data.IsEditable,
                fields: this._data.Fields
            },
            dataView: {
                numOfColumns: this._uiControl.Columns,
                dataView: DataViewConverter.toDataView(this._uiControlData) as FormDataView
            }
        } 

        return data; */
    }

    /**
     * replaces current form fields
     * @param fields 
     */
    updateFields(fields: Array<ObjectsDataRowCell>) {
        fields.forEach((field) => {
            const index = this._formData.Fields.findIndex((item) => item.ApiName === field.ApiName);
            if (index >= 0) {
                this._formData.Fields.splice(index, 1, field);
            }
        });
    }

    /**
     * updates form field's value
     * @param field object containing the data of the required update
     */
    updateFieldValue(fieldChanged: IPepGenericFormValueChange) {
        this.setUpdatedValue(this._formData.Fields, fieldChanged);

        console.log('this._data', this._formData);
    }

    /*
    private convertToFormFields(values: any) {
        const fields = new Array<ObjectsDataRowCell>();

        for (const [key, value] of Object.entries(values)) {
            console.log(`${key}: ${value}`);
            const field = this.createFormField(key, value);
            if (field) {
                fields.push(field);
            }
            //fields.push(this.createFormField(key, value));
        }

        return fields;
    } */

    private hasProperty(obj: any, prop: string) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    
    private createFormField(key: string, value: any) {
        const uiControlItem = this._uiControl.ControlFields.find((item) => item.ApiName === key);

        if (uiControlItem) {
            const field: {[k: string]: any} = new ObjectsDataRowCell();
            //
         //   console.log(`type of field - ${key} is`, value !== null && typeof value === 'object');
            if (value !== null && typeof value === 'object') {
                for (const [innerKey, innerValue] of Object.entries<any>(value)) {
                    console.log(` ${innerKey}:  ${innerValue}`);
                    field[innerKey] = innerValue;
                }

            } else {
                field.Value = value;
            }
            //

            field.ApiName = key;

            field.FieldType = uiControlItem.FieldType;
            field.Enabled = !uiControlItem.ReadOnly;
            // field.FormattedValue = '';
            field.Visible = true;

           // console.log(`field of ${key}`, field)

            return field;
        }

        return null;
    }

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