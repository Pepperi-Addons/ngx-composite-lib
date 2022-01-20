import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepListPagerType } from '@pepperi-addons/ngx-lib/list';

export interface IPepGenericListDataSource {
    getList(params: { 
        searchString: string, 
        fromIndex: number, 
        toIndex: number 
    }): Promise<any[]>;    
    dataView: GridDataView;
    totalCount: number;
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
