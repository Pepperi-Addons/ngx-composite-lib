import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,
    PepRowData,
    PepScreenSizeType,
    PepGuid,
} from '@pepperi-addons/ngx-lib';
import { IPepFormFieldClickEvent } from '@pepperi-addons/ngx-lib/form';
import {
    PepListComponent,
    PepSelectionData,
    IPepListLoadPageEvent,
    IPepListPagerChangeEvent,
    PepListPagerType,
    DEFAULT_PAGE_SIZE,
    IPepListLoadItemsEvent
} from '@pepperi-addons/ngx-lib/list';
import {
    PepMenuItem,
    IPepMenuItemClickEvent,
} from '@pepperi-addons/ngx-lib/menu';
import { IPepFormFieldValueChangeEvent } from '@pepperi-addons/ngx-lib/form';
import {
    PepBreadCrumbItem,
    IPepBreadCrumbItemClickEvent
} from '@pepperi-addons/ngx-lib/bread-crumbs';
import { IPepSearchClickEvent } from '@pepperi-addons/ngx-lib/search';

import { GridDataViewField, DataViewFieldTypes, GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import {
    IPepGenericListBaseData,
    IPepGenericListDataSource,
    IPepGenericListPager,
    IPepGenericListActions
} from './generic-list.model';


@Component({
    selector: 'pep-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss'],
})
export class GenericListComponent implements OnInit, AfterViewInit {
    @ViewChild(PepListComponent) customList: PepListComponent | undefined;

    private _baseData: IPepGenericListBaseData = {
        dataView: {
            Type: 'Grid'
        },
        totalCount: 0
    }
    dataList: any[] = [];
    @Input()
    data: IPepGenericListDataSource = {
        initList: async (params) => {
            return {
                base: this._baseData,
                items: []
            }
        },
        updateList: async (options: any) => {
            return []
        }
    };

    @Input()
    actions: IPepGenericListActions = {
        get: async (data: any) => {
            return []
        }
    };

    @Input()
    uuidMapping = 'key';

    @Input()
    addPadding = false;

    @Input()
    title = '';

    @Input()
    inline = false;

    @Input()
    showSearch = false;

    @Input()
    allowSelection = true;

    @Input()
    noDataFoundMsg: string = this.translate.instant('GENERIC_LIST.NO_DATA');

    @Input()
    allowMultipleSelection = false;

    @Input()
    firstFieldAsLink = false;

    @Input()
    supportSorting = false;

    @Input()
    showTopBar = false;

    @Input()
    breadCrumbsItems = new Array<PepBreadCrumbItem>();

    @Input()
    pager: IPepGenericListPager = {
        type: 'scroll',
        size: DEFAULT_PAGE_SIZE,
        index: 0
    }

    @Output()
    fieldClick = new EventEmitter<IPepFormFieldClickEvent>();

    @Output()
    valueChange = new EventEmitter<IPepFormFieldValueChangeEvent>();

    @Output()
    breadCrumbItemClick = new EventEmitter<IPepBreadCrumbItemClickEvent>();

    // dataObjects: any[] = [];
    searchString = '';
    menuHandlers: { [key: string]: (obj: any) => Promise<void> } = {};
    menuActions: Array<PepMenuItem> = [];
    hasRows = true;

    constructor(
        private dataConvertorService: PepDataConvertorService,
        private layoutService: PepLayoutService,
        private translate: TranslateService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });
    }

    private loadMenuItems(): void {
        if (this.allowSelection) {
            this.getMenuActions().then(x => this.menuActions = x);
        }
    }

    private convertToPepRowData(object: any, dataView: GridDataView) {
        const row = new PepRowData();
        row.UUID = object[this.uuidMapping] || undefined;
        row.Fields = [];

        if (dataView?.Fields && dataView.Columns) {
            for (let index = 0; index < dataView.Fields.length; index++) {
                const field = dataView.Fields[index] as GridDataViewField
                row.Fields.push({
                    ApiName: field.FieldID,
                    Title: this.translate.instant(field.Title),
                    XAlignment: 1,
                    FormattedValue: (object[field.FieldID] || '').toString(),
                    Value: (object[field.FieldID] || '').toString(),
                    ColumnWidth: dataView.Columns[index].Width,
                    AdditionalValue: '',
                    OptionalValues: [],
                    FieldType: DataViewFieldTypes[field.Type],
                    ReadOnly: field.ReadOnly,
                    Enabled: !field.ReadOnly
                })
            }
        }
        return row;
    }

    private async getMenuActions(): Promise<PepMenuItem[]> {
        const actions = await this.actions.get(this.getMenuObjects());
        const res: PepMenuItem[] = [];
        this.menuHandlers = {};

        actions?.forEach(item => {
            const uuid = PepGuid.newGuid();
            this.menuHandlers[uuid] = item.handler;
            res.push({
                key: uuid,
                text: item.title
            })
        })

        return res;
    }

    private getMenuObjects() {
        const selectedData = this.customList?.getSelectedItemsData() || new PepSelectionData();

        // if (selectedData.rows?.length > 0 && this.customList?.getIsAllSelectedForActions()) {
        //     selectedData.rows = this.dataObjects.map(obj => obj.UID).filter(x => selectedData.rows.indexOf(x) !== -1);
        // }

        // if (selectedData.rows?.length > 0) {
        //     selectedData.rows = selectedData.rows.map(uuid => this.getObject(uuid));
        // }

        return selectedData;
    }

    getObject(uuid: string) {
        return this.customList?.getItemDataByID(uuid); // this.dataObjects.find(obj => obj.UID === uuid);
    }

    ngOnInit() {


    }

    ngAfterViewInit(): void {
        this.initData();
    }

    onMenuItemClicked(action: IPepMenuItemClickEvent): void {
        this.menuHandlers[action.source.key](this.getMenuObjects());
    }

    onSearchChanged(event: IPepSearchClickEvent) {
        this.searchString = event.value;
        this.initData();
    }

    async initData() {
        const fromIndex = 0;
        const toIndex = fromIndex + this.pager.size - 1;

        await this.initDataList(fromIndex, toIndex);
        setTimeout(() => {
            if (this.customList && this.dataList.length > 0) {
                const convertedList = this.dataConvertorService.convertListData(this.dataList);
                const uiControl = this.dataConvertorService.getUiControl(this.dataList[0]);
                this.customList.initListData(uiControl, this._baseData.totalCount, convertedList);
                this.loadMenuItems();
            }    
        }, 0);
        
    }

    /*
    async reload() {
        if (this.customList && this.data.totalCount > 0) {
            const fromIndex = 0;
            const toIndex = Math.min(fromIndex + this.pager.size - 1, this.data.totalCount - 1);

            const dataList = await this.getDataList(fromIndex, toIndex);
            const convertedList = this.dataConvertorService.convertListData(dataList);
            const uiControl = this.dataConvertorService.getUiControl(dataList[0]);

            this.customList.initListData(uiControl, this.data.totalCount, convertedList);
            this.loadMenuItems();
            this.hasRows = dataList.length > 0 ? true : false;
        } else {
            this.hasRows = false;
        }
    } */

    onSelectedRowsChanged(selectedRowsCount: number) {
        this.loadMenuItems();
    }

    onCustomizeFieldClick(fieldClickEvent: IPepFormFieldClickEvent) {
        this.fieldClick.emit(fieldClickEvent);
    }

    onBreadCrumbItemClick(event: IPepBreadCrumbItemClickEvent) {
        this.breadCrumbItemClick.emit(event);
    }

    onValueChanged(event: IPepFormFieldValueChangeEvent) {
        this.valueChange.emit(event);
    }

    private async initDataList(fromIndex: number, toIndex: number) {
        const initData = await this.data.initList({
            searchString: this.searchString || undefined,
            fromIndex: fromIndex,
            toIndex: toIndex
        });

        if (initData?.base) {
            this._baseData = initData.base;
        }
        if (initData?.items?.length > 0) {
            this.dataList = initData.items.map(item => this.convertToPepRowData(item, this._baseData.dataView));
        }
    }

    private async updateDataList(fromIndex: number, toIndex: number) {
        const updatedData = await this.data.updateList({
            fromIndex: fromIndex,
            toIndex: toIndex
        });

        this.dataList = updatedData.map(item => this.convertToPepRowData(item, this._baseData.dataView));
    }

    /**
     * loads virtual scroll items from api
     */
    public async onLoadItems(event: IPepListLoadItemsEvent) {
        await this.updateDataList(event.fromIndex, event.toIndex);
        const data = this.dataConvertorService.convertListData(this.dataList);

        this.customList?.updateItems(data, event);
    }

    /**
     * loads paging bulk from api
     */
    public async onLoadPage(event: IPepListLoadPageEvent) {
        const fromIndex = event.pageIndex * event.pageSize;
        const toIndex = Math.min(fromIndex + event.pageSize - 1, this._baseData.totalCount - 1);

        await this.updateDataList(fromIndex, toIndex);
        const data = this.dataConvertorService.convertListData(this.dataList);

        this.customList?.updatePage(data, event);
    }

}
