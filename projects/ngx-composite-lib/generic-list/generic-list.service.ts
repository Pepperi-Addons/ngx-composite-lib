import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    IPepGenericListSmartFilter,
    IPepGenericListDataViewField
} from './generic-list.model';
import {
    PepSmartFilterBaseField,
    IPepSmartFilterData,
} from '@pepperi-addons/ngx-lib/smart-filters';
import { PepQueryBuilderService, IPepQueryBuilderField } from '@pepperi-addons/ngx-lib/query-builder';
import {
    PepRowData,
    ObjectsDataRow
} from '@pepperi-addons/ngx-lib';
import { GridDataViewField, DataViewFieldTypes } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

@Injectable()
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
            if (item.isEditable && item.isSelectableForActions && item.isSelected) {
                row.IsSelected = true;
            }
        } else {
            itemFields = item;
        }

        row.UUID = itemFields[uuidMapping] || undefined;
        row.Fields = [];

        if (dataView?.Fields && dataView.Columns) {
            for (let index = 0; index < dataView.Fields.length; index++) {
                const field = dataView.Fields[index] as IPepGenericListDataViewField;
                row.Fields.push({
                    ApiName: field.FieldID,
                    Title: field.Title ? this._translate.instant(field.Title) : '',
                    XAlignment: 1,
                    FormattedValue: (itemFields[field.FieldID] || '').toString(),
                    Value: (itemFields[field.FieldID] || '').toString(),
                    ColumnWidth: dataView.Columns[index]?.Width || undefined,
                    AdditionalValue: '',
                    OptionalValues: field.OptionalValues || [],
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
        let convertedData: {
            fields: PepSmartFilterBaseField[],
            data: IPepSmartFilterData[],
            title: string
        } = {
            fields: [],
            data: [],
            title: 'Filters'
        }

        if (smartFilter) {
            if (smartFilter.dataView) {
                convertedData.fields = this.createSmartFilterFields(smartFilter.dataView);
                if (smartFilter.data?.length) {
                    convertedData.data = smartFilter.data;
                }
            }
            if (smartFilter.title) {
                convertedData.title = smartFilter.title;
            }
        }

        return convertedData;        
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

    getSelectedItems(items: ObjectsDataRow[]) {
        const selectedItems = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].IsSelected) {
                selectedItems.push(items[i].UID);
            }
        }

        return selectedItems;
    }


}