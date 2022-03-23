import { Injectable } from '@angular/core';
import {
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid
} from '@pepperi-addons/ngx-lib';
import { DataViewConverter } from '@pepperi-addons/data-views';
import {
    IPepGenericFormDataSource,
    IPepGenericFormDataView,
    IPepGenericFormValueChange,
    IPepGenericFormFieldUpdate
} from './generic-form.model';


interface aaabbb {
    fielda: string;
    fieldb: number;
}

@Injectable({
    providedIn: 'root'
})
export class PepGenericFormService {
    private _uiControl: UIControl = new UIControl();
    private _data: any; //input form data
    private _formData: ObjectsDataRow = new ObjectsDataRow();
    private _optionalValues: any[] = [];
    private _isLocked = false;

    get uiControl() {
        return this._uiControl;
    }

    get data() {
        return this._formData;
    }

    constructor() {
        // 
    }

    get isLocked() {
        return this._isLocked;
    }

    set isLocked(val: boolean) {
        this._isLocked = val;
    }

    setDataSource(data: IPepGenericFormDataSource) {
        if (data) {
            this._data = data;
            this.createFormFields();
        }
    }

    setUiControl(view: IPepGenericFormDataView) {
        if (view) {
            this._formData.IsEditable = !this._isLocked;
            this._formData.UID = view.UID || PepGuid.newGuid();
            const uiControlData = DataViewConverter.toUIControlData(view);
            if (uiControlData) {
                if (uiControlData?.ControlFields) {
                    view.Fields?.forEach((field: any) => {
                        if (field.OptionalValues?.length) {
                            this._optionalValues.push({
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
            this._formData.Fields = [];
            this._uiControl.ControlFields.forEach((item) => {
                let value = '';
                if (this.hasProperty(this._data, item.ApiName)) {
                    value = this._data[item.ApiName];
                }
                this._formData.Fields.push(this.createFormField(item, value) as ObjectsDataRowCell);
            });
        }
    }

    getData() {
        return {
            UID: this._formData.UID,
            Values: this._data
        };
    }

    /**
     * updates form field(s) params
     * @param fields
     */
    updateFields(fields: Array<IPepGenericFormFieldUpdate>) {
        fields.forEach((field) => {
            const index = this._formData.Fields.findIndex((item) => item.ApiName === field.FieldId);
            if (index >= 0) {
                for (const [key, value] of Object.entries(field.Params)) {
                    if (this.hasProperty(this._formData.Fields[index], key)) {
                        const item = this._formData.Fields[index] as { [k: string]: any };
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
        this._data[fieldChanged.apiName] = fieldChanged.value;
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

    private createFormField(controlField: any, value: any) {
        const field = new ObjectsDataRowCell();
       
        field.ApiName = controlField.ApiName;
        field.Value = value;
        field.FieldType = controlField.FieldType;
        field.Enabled = !controlField.ReadOnly;
        field.Visible = !controlField.Hidden;
        field.Accessory = "";
        field.AdditionalValue = "";
        field.BackgroundColor = "";
        field.FormattedValue = "";
        field.GroupFields = [];
        field.Highlighted = false;
        field.NotificationInfo = "";
        field.OptionalValues = this.getOptionalValues(controlField.ApiName);
        field.ReferenceObjectInternalType = "";
        field.ReferenceObjectSubType = "";
        field.ReferenceObjectType = '0';
        field.TextColor = "";
        field.UiPageKey = "";

        return field;
    }

    private getOptionalValues(fieldId: string) {
        const item = this._optionalValues.find((item: any) => item.fieldId === fieldId);
        return item?.optionalValues || [];
    }

    private convertToUiControlField(field: any): any {
        return {
            ApiName: field.ApiName,
            FieldType: field.FieldType,
            Title: field.Title,
            ReadOnly: field.ReadOnlyField,
            Mandatory: field.MandatoryField,
            Hidden: field.Hidden,
            ColumnWidth: field.ColumnWidth,
            ColumnWidthType: 1,
            MaxFieldCharacters: field.MaxCharacters,
            MinValue: field.MinValue,
            MaxValue: field.MaxValue,
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