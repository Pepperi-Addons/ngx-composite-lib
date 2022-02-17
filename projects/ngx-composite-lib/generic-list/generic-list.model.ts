import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { 
    PepListPagerType, 
    PepListSelectionType,
    IPepListSortingChangeEvent
 } from '@pepperi-addons/ngx-lib/list';

export interface IPepGenericListDataSource {
    init(params: {
        searchString?: string,
        filter?: any,
        sorting?: IPepListSortingChangeEvent,
        fromIndex: number, // 0
        toIndex: number // top || page-size
    }): Promise<IPepGenericListInitData>;
    inputs?(): Promise<IPepGenericListTableInputs>;
    update?(params: {
        searchString?: string,
        sorting?: IPepListSortingChangeEvent,
        fromIndex: number,
        toIndex: number,
        pageIndex?: number
    }): Promise<any[]>;
}

export interface IPepGenericListInitData {
    dataView: GridDataView,
    totalCount: number,
    items: any[]
}

export interface IPepGenericListTableInputs {
    supportSorting?: boolean;
    selectionType?: PepListSelectionType;
    pager?: IPepGenericListPager;
    noDataFoundMsg?: string;
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

