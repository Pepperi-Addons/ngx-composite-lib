import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    IPepGenericListSmartFilter,
    IPepGenericListDataRow
} from './generic-list.model';
import {
    PepSmartFilterBaseField,
    IPepSmartFilterData,
} from '@pepperi-addons/ngx-lib/smart-filters';
import { PepQueryBuilderService, IPepQueryBuilderField } from '@pepperi-addons/ngx-lib/query-builder';
import { PepRowData } from '@pepperi-addons/ngx-lib';
import { GridDataViewField, DataViewFieldTypes } from '@pepperi-addons/papi-sdk/dist/entities/data-view';


@Injectable(/*{
    providedIn: 'root'
}*/)
export class PepGenericListService {

    constructor(
        private _translate: TranslateService,
        private _queryBuilderService: PepQueryBuilderService
    ) {
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

    getListViewType(dataViewType: string) {
        switch (dataViewType) {
            case 'Grid':
                return 'table';
            case 'Card':
                return 'cards';
            case 'Line':
                return 'lines';
            default:
                return 'table';
        }
    }

    convertToPepRowData(item: any, dataView: any, uuidMapping: string) {
        const row = new PepRowData();
        let itemFields: any;

        if (this.hasProperty(item, 'fields') && typeof item.fields === 'object') {
            itemFields = item.fields;
            if (item.isEditable === false) {
                row.IsEditable = false;
            }
            if (item.isSelectableForActions === false) {
                row.IsSelectableForActions = false;
            }
        } else {
            itemFields = item;
        }

        row.UUID = itemFields[uuidMapping] || undefined;
        row.Fields = [];

        if (dataView?.Fields && dataView.Columns) {
            for (let index = 0; index < dataView.Fields.length; index++) {
                const field = dataView.Fields[index] as GridDataViewField;
                row.Fields.push({
                    ApiName: field.FieldID,
                    Title: field.Title ? this._translate.instant(field.Title) : '',
                    XAlignment: 1,
                    FormattedValue: (itemFields[field.FieldID] || '').toString(),
                    Value: (itemFields[field.FieldID] || '').toString(),
                    ColumnWidth: dataView.Columns[index]?.Width || undefined,
                    AdditionalValue: '',
                    OptionalValues: [],
                    FieldType: DataViewFieldTypes[field.Type],
                    ReadOnly: field.ReadOnly,
                    Enabled: !field.ReadOnly
                })
            }
        }
        return row;
    }

    convertToUiControlField(field: any) {
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

    convertToSmartFilter(smartFilter: IPepGenericListSmartFilter) {
        let convertedFields: PepSmartFilterBaseField[] = [];
        let filterData: IPepSmartFilterData[] = [];

        if (smartFilter?.dataView) {
            convertedFields = this.createSmartFilterFields(smartFilter.dataView);
            if (smartFilter.data?.length) {
                filterData = smartFilter.data;
            }
        }

        return {
            fields: convertedFields,
            data: filterData
        }
    }

    createSmartFilterFields(dataView: any) {
        let smartFields: PepSmartFilterBaseField[] = [];

        const fields = dataView.Fields.map((field: any) => {
            return {
                FieldID: field.FieldID,
                FieldType: field.Type,
                Title: field.Title,
                OptionalValues: field.OptionalValues
            } as IPepQueryBuilderField
        });
        const smartFilterfields = this._queryBuilderService.convertToSmartFilterFields(fields);
        if (smartFilterfields?.length) {
            smartFields = smartFilterfields.map((field => field.smart));
        }

        return smartFields;
    }


}