import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepListPagerType } from '@pepperi-addons/ngx-lib/list';

export interface IPepGenericListDataSource {
    init(params: {
        searchString?: string,
        filter?: any,
        sorting?: any,
        fromIndex: number, // 0
        toIndex: number // top || page-size
    }): Promise<{
        dataView: GridDataView,
        totalCount: number,
        items: any[]
    }>;
    update(params: {
        searchString?: string,
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

export interface IPepGenericListActions {
    get(data: any): Promise<{
        title: string;
        handler: (obj: any) => Promise<void>;
    }[]>;
}

export interface IPepGenericListPager {
    type: PepListPagerType;
    size: number;
    index: number;
}

