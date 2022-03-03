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


@Injectable({
    providedIn: 'root'
})
export class PepFormGeneratorService {
    private _uiControl: UIControl = new UIControl();
    private _data: ObjectsDataRow = new ObjectsDataRow();

    constructor() {
        //
        this.initDefaults();
    }

    get uiControl() {
        return this._uiControl;
    }

    get data() {
        return this, this._data;
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

    setUiControl(view: FormDataView) {
        const uiControlData = DataViewConverter.toUIControlData(view);

        if (uiControlData?.ControlFields) {
            this._uiControl.ControlFields = uiControlData.ControlFields.map((field: any) => this.convertToUiControlField(field));
        }

        console.log('uiControl in service', this._uiControl);
    }

    setData(array: Array<ObjectsDataRowCell>) {
        //TODO - set properties defaults 
        if (array?.length > 0) {
            this._data.Fields = array;
        }

        console.log('data in service', this._data);
    }

    setNumOfColumns(val: number) {
        this._uiControl.Columns = val;
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