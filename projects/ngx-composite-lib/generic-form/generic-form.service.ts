import { Injectable } from '@angular/core';


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

    createFormField(data: any) {
        const field: any = {};
       
        field.ApiName = data.ApiName;
        field.Value = data.controlFieldValue;
        field.FieldType = data.FieldType;
        field.Enabled = !data.ReadOnly;
        field.Visible = !data.Hidden;
        field.GroupFields = [];
        field.Highlighted = false;
        field.OptionalValues = data.OptionalValues;
        field.AdditionalProps = data.AdditionalProps;    

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
