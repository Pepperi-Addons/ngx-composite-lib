import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { KeyValuePair } from '@pepperi-addons/ngx-lib'; 

/**
 * Interface represending the form data view
 */
export interface IPepGenericFormDataView extends FormDataView {
    UID?: string;
    Fields: IPepGenericFormDataViewField[];
}

export interface IPepGenericFormDataViewField extends BaseFormDataViewField {
    OptionalValues: Array<KeyValuePair<string>>;
    AdditionalProps: { [key: string]: any };
}

/**
 * Interface representing form data
 */
export interface IPepGenericFormData {
    UID: string;
    Values: { [key: string]: any };
}

export interface IPepGenericFormValueChange {
    UID: string;
    ApiName: string;
    Value: any;
}

export interface IPepGenericFormFieldUpdate {
    FieldId: string;
    Params: IPepGenericFormDataParams;
}

export interface IPepGenericFormDataParams {   
    Value?: any;   
    Visible?: boolean;     
    Enabled?: boolean;      
    BackgroundColor?: string;
    TextColor?: string;
    Highlighted?: boolean;   
    OptionalValues?: Array<KeyValuePair<string>>;   
}

