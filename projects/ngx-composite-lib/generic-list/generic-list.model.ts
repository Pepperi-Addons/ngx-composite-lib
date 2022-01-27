import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepListPagerType } from '@pepperi-addons/ngx-lib/list';

export interface IPepGenericListDataSource {
    initList(params: { 
        searchString?: string,
        filter?: {},
        sorting?: {},
        fromIndex: number, // 0
        toIndex: number // top || page-size
    }): Promise<{ base: IPepGenericListBaseData, items: any[] }>;    
    updateList(params: { 
        fromIndex: number, 
        toIndex: number 
    }): Promise<any[]>;    
    // dataView: GridDataView;
    // totalCount: number;
}

export interface IPepGenericListBaseData {
    dataView: GridDataView, 
    totalCount: number    
}
/*
export interface IPepGenericListDataSource {
    getList(params: { 
        searchString: string, 
        fromIndex: number, 
        toIndex: number 
    }): Promise<any[]>;    
    dataView: GridDataView;
    totalCount: number;
} */

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
