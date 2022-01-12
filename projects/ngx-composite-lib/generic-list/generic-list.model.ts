import { GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepSelectionData } from '@pepperi-addons/ngx-lib/list';

export interface GenericListDataSource {
    getList(state: { searchString: string }): Promise<any[]>;
    getDataView(): Promise<GridDataView>;
    getActions(data: any): Promise<{
        title: string;
        handler: (obj: any) => Promise<void>;
    }[]>;
}
