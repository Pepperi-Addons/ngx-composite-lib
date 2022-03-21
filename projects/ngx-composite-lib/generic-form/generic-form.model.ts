import {
    PepDataConvertorService,
    PepLayoutService,
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid,
    KeyValuePair
} from '@pepperi-addons/ngx-lib';
import { FormDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

/**
 * Interface representing the form data
 */
export interface IPepGenericFormDataSource {
    /*UID: string;
    IsEnabled?: boolean;
    Values: any;*/
    Values: Array<KeyValuePair<any>>;
}

/**
 * Interface represending the form data view
 */
export interface IPepGenericFormDataView extends FormDataView {
    UID?: string;
}

/**
 * Interface containing form data and data view
 */
export interface IPepGenericFormData {
    data: IPepGenericFormDataSource;
    dataView: IPepGenericFormDataView;
}

export interface IPepGenericFormValueChange {
    uid: string;
    apiName: string;
    value: any;
}

export interface IPepGenericFormFieldUpdate {
    FieldId: string;
    Params: IPepGenericFormDataParams
}

export interface IPepGenericFormDataParams {      
    Visible?: boolean;     
    Enabled?: boolean;         
    OptionalValues?: [];   
}