import {
    GridDataView,
    MenuDataView
} from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import {
    PepListPagerType,
    PepListSelectionType,
    IPepListSortingChangeEvent,
    PepListTableViewType
} from '@pepperi-addons/ngx-lib/list';
import {
    PepSmartFilterBaseField,
    IPepSmartFilterData
} from '@pepperi-addons/ngx-lib/smart-filters';
import { TmplAstBoundAttribute } from '@angular/compiler';

export interface IPepGenericListDataSource {
    init(params: IPepGenericListParams): Promise<IPepGenericListInitData>;    
    update?(params: IPepGenericListParams): Promise<any[]>;    
    inputs?: IPepGenericListTableInputs;
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
    dataView: GridDataView;
    totalCount: number;
    items: any[];   
}

export interface IPepGenericListDataRow {
    fields: any[];
    isEditable?: boolean;
    isSelectableForActions?: boolean;
}

export interface IPepGenericListTableInputs {      
    supportSorting?: boolean;
    selectionType?: PepListSelectionType;
    pager?: IPepGenericListPager;
    noDataFoundMsg?: string;
    tableViewType?: PepListTableViewType;
    zebraStripes?: boolean;
    smartFilter?: IPepGenericListSmartFilter;
}

export interface IPepGenericListActions {
    get(data: any): Promise<{
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


