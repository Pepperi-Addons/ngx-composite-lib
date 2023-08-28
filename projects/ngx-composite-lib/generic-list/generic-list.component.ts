import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    ViewContainerRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,
    ObjectsDataRow,
    PepGuid,
    UIControl,
    PepLoaderService,
    PepRowData,
    PepSessionService
} from '@pepperi-addons/ngx-lib';
import { Subscription } from 'rxjs';
import { IPepFormFieldClickEvent } from '@pepperi-addons/ngx-lib/form';
import {
    PepListComponent,
    PepSelectionData,
    IPepListLoadPageEvent,
    PepListSelectionType,
    IPepListSortingChangeEvent,
    DEFAULT_PAGE_SIZE,
    IPepListLoadItemsEvent,
    PepListTableViewType,
    IPepListSortingData,
    IPepListStartIndexChangeEvent
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
import { IPepSearchClickEvent, PepSearchComponent } from '@pepperi-addons/ngx-lib/search';

import {
    DataView,
    GridDataView
} from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import {
    IPepGenericListInitData,
    IPepGenericListDataSource,
    IPepGenericListPager,
    IPepGenericListActions,
    IPepGenericListSmartFilter,
    IPepSmartFilters,
    IPepGenericListEmptyState
} from './generic-list.model';
import { PepGenericListService } from './generic-list.service';
import { DataViewConverter } from '@pepperi-addons/data-views';
import {
    IPepSmartFilterData,
    PepSmartFilterBaseField,
    PepSmartFiltersComponent
} from '@pepperi-addons/ngx-lib/smart-filters';


@Component({
    selector: 'pep-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss', './generic-list.component.theme.scss'],
    providers: [PepGenericListService]
})
export class GenericListComponent implements OnInit {
    @ViewChild('search') search: PepSearchComponent | undefined;
    @ViewChild('smartFiltersComponent') smartFiltersComponent: PepSmartFiltersComponent | undefined;

    private _pepListContainer: ViewContainerRef | undefined;
    @ViewChild('pepListContainer', { read: ViewContainerRef })
    set pepListContainer(val: ViewContainerRef) {
        this._pepListContainer = val;
    }

    private _dataSource: IPepGenericListDataSource = {
        init: async (params: any) => {
            return {
                dataView: {
                    Type: 'Grid'
                },
                totalCount: -1,
                items: []
            }
        }
    }
    @Input()
    set dataSource(val: IPepGenericListDataSource) {
        this._dataSource = val;
        this._sorting = undefined;
        this.initSearch();
        this.initSmartSearch();
        this.initList();
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
    disabled = false;

    @Input()
    addPadding = false;

    @Input()
    title = '';

    @Input()
    description = '';

    @Input()
    inline = false;

    @Input()
    showSearch = false;

    @Input()
    noDataFoundMsg = '';

    @Input()
    emptyState: IPepGenericListEmptyState | undefined;

    @Input()
    selectionType: PepListSelectionType = 'multi';

    @Input()
    supportSorting = false;

    @Input()
    sorting: IPepListSortingData | undefined;

    @Input()
    cacheSize = -1;

    @Input()
    hideSelectAll = false;
    
    @Input()
    pager: IPepGenericListPager = {
        type: 'scroll'
    }

    @Input()
    tableViewType: PepListTableViewType = 'regular';

    @Input()
    zebraStripes = false;

    @Input()
    set smartFilter(val: IPepGenericListSmartFilter) {
        this.smartFilters = this._genericListService.convertToSmartFilter(val);
        this.showSmartFilter = this.smartFilters.fields.length > 0; 
    }

    @Input()
    showTopBar = false;

    @Input()
    breadCrumbsItems: PepBreadCrumbItem[] = new Array<PepBreadCrumbItem>();

    @Input()
    selectAll = false

    @Input()
    scrollPosition = 0

    @Output()
    fieldClick = new EventEmitter<IPepFormFieldClickEvent>();

    @Output()
    valueChange = new EventEmitter<IPepFormFieldValueChangeEvent>();

    @Output()
    breadCrumbItemClick = new EventEmitter<IPepBreadCrumbItemClickEvent>();

    @Output()
    startIndexChange = new EventEmitter<IPepListStartIndexChangeEvent>()

    @Output()
    listLoad: EventEmitter<void> = new EventEmitter<void>();

    set pepList(val: PepListComponent) {
        this._pepList = val;
    }

    get pepList() {
        return this._pepList;
    }

    private _resize$: Subscription = new Subscription();
    private _loader$: Subscription = new Subscription();

    private _dataView: DataView = {
        Type: 'Grid'
    };
    private _pepList: any;
    onLoad = true;
    listInputs: any;
    totalRowCount = -1;
    searchString = '';
    showSmartFilter = false;
    showEmptyState = false;
    smartFilters: IPepSmartFilters = {
        fields: [],
        data: [],
        title: 'Filters'
    };
    private _appliedFilters: IPepSmartFilterData[] = [];
    private _sorting: IPepListSortingChangeEvent | undefined = undefined;

    menuHandlers: { [key: string]: (obj: any) => Promise<void> } = {};
    menuActions: Array<PepMenuItem> = [];

    constructor(
        private _dataConvertorService: PepDataConvertorService,
        private _layoutService: PepLayoutService,
        private _loaderService: PepLoaderService,
        private _translate: TranslateService,
        private _genericListService: PepGenericListService,
        private _sessionService: PepSessionService
    ) {
        this._resize$ = this._layoutService.onResize$.pipe().subscribe((size) => {            
            //            
        });
        this._loader$ = this._loaderService.onChanged$.subscribe((status: boolean) => {
            //
        });
    }

    ngOnInit() {
        //
    }

    private async initList() {
        this.onLoad = true;
        setTimeout(async () => { //making sure all input data is available
            if (this._dataSource) {
                //merge selector inputs with callback inputs
                this.loadTableInputs();

                let fromIndex = 0;
                let toIndex = 0;

                if (this.listInputs.pager.type === 'pages') {
                    fromIndex = this.listInputs.pager.size * this.listInputs.pager.index;
                    toIndex = fromIndex + (this.listInputs.pager.size || DEFAULT_PAGE_SIZE) - 1;
                } else {
                    toIndex = 100;//TO DO - get value from - this.customList.getTopItems()
                }

                const data = await this.loadData(fromIndex, toIndex);
                
                if (this.listInputs?.emptyState?.show === true) {
                    this.setEmptyState();
                }
                this.onLoad = false;
                //show empty state
                if (this.showEmptyState) {
                    if (!this.listInputs.emptyState.title) {                        
                        this._translate.get('GENERIC_LIST.EMPTY_STATE.TITLE').subscribe(text => {                            
                            this.listInputs.emptyState.title = text;
                        });
                    }
                    if (!this.listInputs.emptyState.description) {                        
                        this._translate.get('GENERIC_LIST.EMPTY_STATE.DESCRIPTION').subscribe(text => {                            
                            this.listInputs.emptyState.description = text;
                        });
                    }
                    return;
                }
                setTimeout(async () => {
                    if (this._pepListContainer) {
                        if (this._pepListContainer.length > 0) {
                            this._pepListContainer.remove();
                        }
                        const { PepListComponent } = await import('@pepperi-addons/ngx-lib/list');
                        const componentRef = this._pepListContainer.createComponent(PepListComponent);

                        this.pepList = componentRef.instance;
                        
                        componentRef.instance.viewType = this._genericListService.getListViewType(this._dataView.Type);
                        componentRef.instance.tableViewType = this.listInputs.tableViewType;
                        componentRef.instance.zebraStripes = this.listInputs.zebraStripes;
                        if (this.disabled) {
                            componentRef.instance.disabled = true;
                            componentRef.instance.lockItemInnerEvents = true;
                        }
                        componentRef.instance.supportSorting = this.listInputs.supportSorting;
                        componentRef.instance.sorting = this.listInputs.sorting;
                        componentRef.instance.cacheSize = this.listInputs.cacheSize;

                        componentRef.instance.selectionTypeForActions = this.listInputs.selectionType;
                        componentRef.instance.hideAllSelectionInMulti = this.listInputs.hideSelectAll;

                        componentRef.instance.showCardSelection = this.listInputs.selectionType !== 'none';
                        componentRef.instance.pagerType = this.listInputs.pager.type;
                        if (this.listInputs.pager.type === 'pages') {
                            componentRef.instance.pageSize = this.listInputs.pager?.size || DEFAULT_PAGE_SIZE;
                            componentRef.instance.pageIndex = this.listInputs.pager?.index || 0;
                        }
                        if(this.selectionType == "multi" && this.selectAll){
                            this._sessionService.setObject('AllSelected', true)
                        }
                        componentRef.instance.noDataFoundMsg = this.listInputs.noDataFoundMsg;
                        componentRef.instance.startIndexChange.subscribe($event => {
                            this.startIndexChange.emit($event)
                        })
                        componentRef.instance.fieldClick.subscribe(($event) => {
                            this.onCustomizeFieldClick($event);
                        });
                        componentRef.instance.selectedItemsChange.subscribe(($event) => {
                            this.onSelectedItemsChanged($event);
                        });
                        componentRef.instance.loadItems.subscribe(($event) => {
                            this.onLoadItems($event);
                        });
                        componentRef.instance.loadPage.subscribe(($event) => {
                            this.onLoadPage($event);
                        });
                        componentRef.instance.valueChange.subscribe(($event) => {
                            this.onValueChanged($event);
                        });
                        componentRef.instance.sortingChange.subscribe(($event) => {
                            this.onSortingChange($event);
                        });
                        componentRef.instance.listLoad.subscribe(($event) => {
                            this.onListLoad();
                        });
                        let convertedList: ObjectsDataRow[] = [];
                        if (data) {
                            if (data?.length) {
                                convertedList = this._dataConvertorService.convertListData(data);
                            }
                            const uiControl = this.getUiControl(DataViewConverter.toUIControlData(this._dataView));
                            const selectedItems = this._genericListService.getSelectedItems(convertedList);
                            if (selectedItems?.length) {
                                componentRef.instance.setSelectedIds(selectedItems);
                            }                           
                            
                            componentRef.instance.initListData(uiControl, this.totalRowCount, convertedList);
                        }
                        componentRef.instance.scrollToIndex(this.scrollPosition)
                    }
                }, 0);
            }
        }, 0);
    }

    /**
     * loads inputs in case they are provided and merge with selector inputs
     * @returns merged pep-list inputs
     */
    private loadTableInputs() {
        this.listInputs = {
            supportSorting: this.supportSorting,
            sorting: this.sorting,
            cacheSize: this.cacheSize,
            hideSelectAll: this.hideSelectAll,
            selectionType: this.selectionType,
            pager: this.pager,
            noDataFoundMsg: this.noDataFoundMsg,
            tableViewType: this.tableViewType,
            zebraStripes: this.zebraStripes,
            emptyState: this.emptyState,
            selectAll: this.selectAll
        };
        if (this._dataSource.inputs) {
            Object.entries(this._dataSource.inputs).forEach((item: any) => {
                if (this._genericListService.hasProperty(this.listInputs, item[0])) {
                    this.listInputs[item[0]] = item[1];
                }
            });
        }
    }

    /**
     * detemines whether empty state is to be displayed
     */
    private setEmptyState() {
        this.showEmptyState = this.totalRowCount === 0 &&
            this.searchString === '' &&
            this._appliedFilters.length === 0;
    }

    private getUiControl(data: any): UIControl {
        const uiControl = new UIControl();
        uiControl.ControlFields = [];

        if (data?.ControlFields) {
            uiControl.ControlFields = data.ControlFields.map((field: any) => this._genericListService.convertToUiControlField(field));
        }

        return uiControl;
    }

    private loadMenuItems(): void { //TODO
        if (this.listInputs.selectionType !== 'none') {
            this.getMenuActions().then(
                x => this.menuActions = x
            );
        }
    }

    private async getMenuActions(): Promise<PepMenuItem[]> {
        const res: PepMenuItem[] = [];
        const result = this.getMenuObjects();
        if (result.success) {
            const actions = await this.actions.get(result.data);
            this.menuHandlers = {};
            actions?.forEach(item => {
                const uuid = PepGuid.newGuid();
                this.menuHandlers[uuid] = item.handler;
                res.push({
                    key: uuid,
                    text: item.title
                })
            })
        }

        return res;
    }

    private getMenuObjects() {
        const menuObjects: any = {
            success: false,
            data: new PepSelectionData()
        };

        if (this.pepList) {
            menuObjects.success = true;
            menuObjects.data = this.pepList.getSelectedItemsData();
        }

        return menuObjects;
    }

    private initSearch() {
        this.searchString = '';
        this.search?.initSearch();
    }

    private initSmartSearch() {
        this._appliedFilters = [];
        this.smartFiltersComponent?.clearFilters();
    }

    private async loadData(fromIndex: number, toIndex: number): Promise<PepRowData[]> {
        this._loaderService.show();
        let converedData: PepRowData[] = [];
        const data: IPepGenericListInitData = await this._dataSource.init({
            searchString: this.searchString || undefined,
            filters: this._appliedFilters.length ? this._appliedFilters : undefined,
            sorting: this._sorting || undefined,
            fromIndex: fromIndex,
            toIndex: toIndex
        });        
        this._loaderService.hide();

        // Set the total count
        this.totalRowCount = data?.totalCount || 0;

        if (data) {
            this._dataView = data.dataView;

            if (data.items?.length > 0 && !data.isPepRowData) {                
                converedData = data.items.map(item => this._genericListService.convertToPepRowData(item, data.dataView, this.uuidMapping));
            }
        }

        return converedData;
    }


    private async updateDataList(fromIndex: number, toIndex: number, pageIndex: number | undefined = undefined): Promise<PepRowData[]> {
        if (this._dataSource.update) {
            this._loaderService.show();
            let converedData: PepRowData[] = [];
            const dataList = await this._dataSource.update({
                searchString: this.searchString || undefined,
                filters: this._appliedFilters.length ? this._appliedFilters : undefined,
                sorting: this._sorting || undefined,
                fromIndex: fromIndex,
                toIndex: toIndex,
                pageIndex: pageIndex
            });
            this._loaderService.hide();

            if (dataList?.length > 0) {
                converedData = dataList.map(item => this._genericListService.convertToPepRowData(item, this._dataView, this.uuidMapping));
            } 
            return converedData;
        } else {
            return [];
        }
    }

    /**
     * loads virtual scroll items from api
     */
    private async onLoadItems(event: IPepListLoadItemsEvent) {
        const list = await this.updateDataList(event.fromIndex, event.toIndex);
        const convertedList = this._dataConvertorService.convertListData(list);
        const selectedItems = this._genericListService.getSelectedItems(convertedList);
        if (selectedItems?.length) {
            this.pepList.setSelectedIds(selectedItems);
        }
        this.pepList.updateItems(convertedList, event);
    }

    /**
     * loads paging bulk from api
     */
    private async onLoadPage(event: IPepListLoadPageEvent) {
        const fromIndex = event.pageIndex * event.pageSize;
        const toIndex = Math.min(fromIndex + event.pageSize - 1, this.totalRowCount - 1);
        const list = await this.updateDataList(fromIndex, toIndex, event.pageIndex);
        const convertedList = this._dataConvertorService.convertListData(list);
        const selectedItems = this._genericListService.getSelectedItems(convertedList);
        if (selectedItems?.length) {
            this.pepList.setSelectedIds(selectedItems);
        }
        this.pepList.updatePage(convertedList, event);
    }

    getItemById(id: string): ObjectsDataRow | null {
        if (this.pepList) {
            return this._pepList.getItemDataByID(id);
        } else {
            return null;
        }
    }

    getSelectedItems(): PepSelectionData | null {
        if (this.pepList) {
            return this._pepList.getSelectedItemsData();
        } else {
            return null;
        }
    }

    getPageIndex() {
        return this.pepList.pageIndex;
    }

    onActionItemClicked(action: IPepMenuItemClickEvent): void {
        const result = this.getMenuObjects();
        if (result.success) {
            this.menuHandlers[action.source.key](result.data);
        }
    }

    onSearchChanged(event: IPepSearchClickEvent) {
        this.searchString = event.value;
        this.initList();
    }

    onSelectedItemsChanged(selectedRowsCount: number) {
        //loading menu items after pep-list selected items are updated
        setTimeout(() => {
            this.loadMenuItems();
        }, 0);
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

    onSortingChange(event: IPepListSortingChangeEvent) {
        this._sorting = event;
        this.initList();
    }

    onFiltersChange(filters: IPepSmartFilterData[]) {
        this._appliedFilters = filters;
        this.initList();
    }

    onListLoad(): void {
        this.listLoad.emit();
    }

    ngOnDestroy() {
        if (this._resize$) {
            this._resize$.unsubscribe();
        }
        if (this._loader$) {
            this._loader$.unsubscribe();
        }
    }

}
