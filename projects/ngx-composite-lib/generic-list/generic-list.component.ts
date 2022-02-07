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
    ObjectsDataRow,
    PepScreenSizeType,
    PepGuid,
    UIControl,
} from '@pepperi-addons/ngx-lib';
import { IPepFormFieldClickEvent } from '@pepperi-addons/ngx-lib/form';
import {
    PepListComponent,
    PepSelectionData,
    IPepListLoadPageEvent,
    PepListSelectionType,
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
    IPepGenericListInitData,
    IPepGenericListDataSource,
    IPepGenericListPager,
    IPepGenericListActions,
} from './generic-list.model';
import { DataViewConverter } from '@pepperi-addons/data-views';
import { Subscription } from 'rxjs';
import { PepGenericListService } from './generic-list.service';


@Component({
    selector: 'pep-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements OnInit, AfterViewInit {
    @ViewChild('customList') 
    set customList(val: PepListComponent) {
        this._genericListService.pepList = val;
    }
   
    _dataSource: IPepGenericListDataSource = {
        init: async (params: any) => {
            return {
                dataView: {
                    Type: 'Grid'
                },
                totalCount: -1,
                items: []
            }
        },
        update: async (params: any) => {
            return []
        }
    }
    @Input()
    set dataSource(obj: IPepGenericListDataSource) {
        this._dataSource = obj;
        if (this._genericListService.pepList) {
            this.initDataSource();
        }
    }

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
    noDataFoundMsg = '';

    @Input()
    selectionType: PepListSelectionType = 'single';

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

    private _resize$: Subscription = new Subscription();
    private _dataView: GridDataView = {
        Type: 'Grid'
    };
    private _totalRowCount = -1;
    private _searchString = '';
    private _isDataSourceInitialized = false;

    menuHandlers: { [key: string]: (obj: any) => Promise<void> } = {};
    menuActions: Array<PepMenuItem> = [];
    //hasRows = false;

    constructor(
        private _genericListService: PepGenericListService,
        private _dataConvertorService: PepDataConvertorService,
        private _layoutService: PepLayoutService,
        private _translate: TranslateService
    ) {
        this._resize$ = this._layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });

    }

    ngOnInit() {
        //
    }

    ngAfterViewInit() {
        if (!this._isDataSourceInitialized) {
            this.initDataSource();
        }
    }

    private async initDataSource() {
        this._isDataSourceInitialized = true;
        const fromIndex = 0;
        let toIndex = 0;

        if (this.pager.type === 'scroll') {
            toIndex = 100;//TO DO - get reesult from - this.customList.getTopItems()
        } else {
            toIndex = fromIndex + this.pager.size - 1;
        }

        const data = await this.loadData(fromIndex, toIndex);
        this._totalRowCount = data?.totalCount ? data.totalCount : 0;

        let convertedList: ObjectsDataRow[] = [];
        if (data) {
            if (data?.items?.length > 0) {
                convertedList = this._dataConvertorService.convertListData(data.items);
            }
            const uiControl = this.getUiControl(DataViewConverter.toUIControlData(data.dataView));
            this._genericListService.pepList.initListData(uiControl, data.totalCount, convertedList);
            this.loadMenuItems();
        }
    }

    private getUiControl(data: any): UIControl {
        const uiControl = new UIControl();
        uiControl.ControlFields = [];
        
        if (data?.ControlFields) {
            uiControl.ControlFields = data.ControlFields.map((field: any) => this.convertToUiControlField(field));
        }

        return uiControl;
    }

    private loadMenuItems(): void {
        if (this.selectionType !== 'none') {
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
                    Title: this._translate.instant(field.Title),
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

    private convertToUiControlField(field: any) {
        return {
            ApiName: field.ApiName,
            FieldType: field.FieldType,
            Title: field.Title,
            ReadOnly: field.ReadOnlyField,
            ColumnWidth: field.ColumnWidth,
            ColumnWidthType: 1,
            Layout: {
                X: field.Layout.X,
                Y: field.Layout.Y,
                Width: field.Layout.Width,
                Height: field.Layout.Field_Height,
                XAlignment: field.Layout.xAlignment,
                YAlignment: field.Layout.yAlignment,
            }
        }
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
        const selectedData = this._genericListService.pepList.getSelectedItemsData() || new PepSelectionData();

        return selectedData;
    }

    onMenuItemClicked(action: IPepMenuItemClickEvent): void {
        this.menuHandlers[action.source.key](this.getMenuObjects());
    }

    onSearchChanged(event: IPepSearchClickEvent) {
        this._searchString = event.value;
        this.initDataSource();
    }

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

    private async loadData(fromIndex: number, toIndex: number): Promise<IPepGenericListInitData> {
        const data: IPepGenericListInitData = await this._dataSource.init({
            searchString: this._searchString || undefined,
            fromIndex: fromIndex,
            toIndex: toIndex
        });

        if (data) {
            this._dataView = data.dataView;

            if (data.items?.length > 0) {
                data.items = data.items.map(item => this.convertToPepRowData(item, data.dataView));
            }
        }

        return data;
    }


    private async updateDataList(fromIndex: number, toIndex: number, pageIndex: number | undefined = undefined) {
        //  console.log(`pageIndex - ${pageIndex}`);
        const dataList = await this._dataSource.update({
            searchString: this._searchString || undefined,
            fromIndex: fromIndex,
            toIndex: toIndex,
            pageIndex: pageIndex
        });

        if (dataList?.length > 0) {
            return dataList.map(item => this.convertToPepRowData(item, this._dataView));
        } else {
            return [];
        }

    }

    /**
     * loads virtual scroll items from api
     */
    async onLoadItems(event: IPepListLoadItemsEvent) {
         // console.log('onitemsload', event);
        const list = await this.updateDataList(event.fromIndex, event.toIndex);
        const convertedList = this._dataConvertorService.convertListData(list);
        this._genericListService.pepList.updateItems(convertedList, event);
    }

    /**
     * loads paging bulk from api
     */
    async onLoadPage(event: IPepListLoadPageEvent) {
       // console.log('onLoadPage', event);
        const fromIndex = event.pageIndex * event.pageSize;
        const toIndex = Math.min(fromIndex + event.pageSize - 1, this._totalRowCount - 1);
        const list = await this.updateDataList(fromIndex, toIndex, event.pageIndex);
        const convertedList = this._dataConvertorService.convertListData(list);
        this._genericListService.pepList.updatePage(convertedList, event);
    }

    ngOnDestroy() {
        if (this._resize$) {
            this._resize$.unsubscribe();
        }
    }

}
