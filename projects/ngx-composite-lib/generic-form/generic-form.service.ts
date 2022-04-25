import { Injectable } from '@angular/core';
import { ObjectsDataRowCell } from '@pepperi-addons/ngx-lib';


@Injectable()
export class PepGenericFormService { 

    constructor() {
        // 
    }
  
    /**
     * checks if the object contains property
     * @param obj object
     * @param prop property name
     * @returns true if contains, false otherwise
    */
    hasProperty(obj: any, prop: string) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    createFormField(controlField: any, value: any, optionalValues: any[]) {
        const field = new ObjectsDataRowCell();
       
        field.ApiName = controlField.ApiName;
        field.Value = value;
        field.FieldType = controlField.FieldType;
        field.Enabled = !controlField.ReadOnly;
        field.Visible = !controlField.Hidden;
       /* field.Accessory = "";
        field.AdditionalValue = "";
        field.BackgroundColor = "";
        field.FormattedValue = "";*/
        field.GroupFields = [];
        field.Highlighted = false;
       // field.NotificationInfo = "";
        field.OptionalValues = optionalValues;
       /* field.ReferenceObjectInternalType = "";
        field.ReferenceObjectSubType = "";
        field.ReferenceObjectType = '0';
        field.TextColor = "";
        field.UiPageKey = "";*/

        return field;
    }

    convertToUiControlField(field: any): any {
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
