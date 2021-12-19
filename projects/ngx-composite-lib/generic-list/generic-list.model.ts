import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

export interface GenericListDataSource {
    getList(state: { searchString: string }): Promise<any[]>;
    getDataView(): Promise<GridDataView>;
    getActions(objs: any[]): Promise<{
        title: string;
        handler: (obj: any) => Promise<void>;
    }[]>;
}
