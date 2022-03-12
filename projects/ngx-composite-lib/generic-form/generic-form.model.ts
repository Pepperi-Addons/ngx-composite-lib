import {
    PepDataConvertorService,
    PepLayoutService,
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid    
} from '@pepperi-addons/ngx-lib';
import { FormDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

/**
 * Interface representing the form data
 */
export interface IPepGenericFormDataSource {
    UID: string;
    IsEnabled?: boolean;
    //Fields: Array<ObjectsDataRowCell>;
    Values: any;
}

/**
 * Interface represending the form data view
 */
export interface IPepGenericFormDataView {
    dataView: FormDataView;
    numOfColumns: number;
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