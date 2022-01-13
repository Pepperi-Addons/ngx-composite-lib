import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

export interface PepGenericListDataSource {
    getList(state: { searchString: string }): Promise<any[]>;
    getDataView(): Promise<GridDataView>;
    getActions(data: any): Promise<{
        title: string;
        handler: (obj: any) => Promise<void>;
    }[]>;
}
