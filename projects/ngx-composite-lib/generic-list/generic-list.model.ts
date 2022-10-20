import {
    DataView,
    GridDataView,
    CardDataView,
    LineDataView,
    MenuDataView,
    GridDataViewField,
    BaseFormDataViewField
} from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { KeyValuePair } from '@pepperi-addons/ngx-lib'; 
import {
    PepListPagerType,
    PepListSelectionType,
    IPepListSortingChangeEvent,
    PepListTableViewType,
    PepSelectionData
} from '@pepperi-addons/ngx-lib/list';
import {
    PepSmartFilterBaseField,
    IPepSmartFilterData
} from '@pepperi-addons/ngx-lib/smart-filters';
import { TmplAstBoundAttribute } from '@angular/compiler';

export interface IPepGenericListDataSource {
    init(params: IPepGenericListParams): Promise<IPepGenericListInitData>;    
    update?(params: IPepGenericListParams): Promise<any[]>;    
    inputs?: IPepGenericListListInputs;
}

export interface IPepGenericListParams {
    searchString?: string;
    filters?: any;
    sorting?: IPepListSortingChangeEvent;
    fromIndex?: number; // 0
    toIndex?: number; // top || page-size
    pageIndex?: number;
}

export interface IPepGenericListInitData {
    dataView: GridDataView | CardDataView | LineDataView;
    totalCount: number;
    items: {[key: string]: any}[] | IPepGenericListDataRow[];   
    isPepRowData?: boolean;
}

export interface IPepGenericListDataRow {
    fields: {[key: string]: any}[];
    isEditable?: boolean;
    isSelected?: boolean;
    isSelectableForActions?: boolean;
}

export interface IPepGenericListListInputs {      
    supportSorting?: boolean;
    selectionType?: PepListSelectionType;
    pager?: IPepGenericListPager;
    noDataFoundMsg?: string;
    tableViewType?: PepListTableViewType;
    zebraStripes?: boolean;
    smartFilter?: IPepGenericListSmartFilter;
    emptyState?: IPepGenericListEmptyState;
}

export interface IPepGenericListActions {
    get(data: PepSelectionData): Promise<{
        title: string;
        handler: (obj: any) => Promise<void>;
    }[]>;
}

export interface IPepGenericListPager {
    type: PepListPagerType;
    size?: number;
    index?: number;
}

export interface IPepGenericListSmartFilter {    
    dataView: MenuDataView;
    data?: IPepSmartFilterData[];
}

/*export interface IPepGenericListDataView extends GridDataViewField {
    OptionalValues: any[];
} */

export interface IPepGenericListDataViewField extends BaseFormDataViewField {    
    OptionalValues?: Array<KeyValuePair<string>>;        
}

export interface IPepGenericListEmptyState { 
    show: boolean;
    title?: string;
    description?: string;
}



