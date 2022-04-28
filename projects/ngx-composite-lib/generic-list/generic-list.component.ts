import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,    
    ObjectsDataRow,
    PepGuid,
    UIControl,
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
    PepListTableViewType
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
    IPepGenericListSmartFilter
} from './generic-list.model';
import { PepGenericListService } from './generic-list.service';
import { DataViewConverter } from '@pepperi-addons/data-views';
import {
    IPepSmartFilterData,
    PepSmartFilterBaseField
} from '@pepperi-addons/ngx-lib/smart-filters';


@Component({
    selector: 'pep-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss'],
    providers: [PepGenericListService]
})
export class GenericListComponent implements OnInit {
    @ViewChild('search') search: PepSearchComponent | undefined;

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
        this.initTable();
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
    inline = false;

    @Input()
    showSearch = false;

    @Input()
    noDataFoundMsg = '';

    @Input()
    selectionType: PepListSelectionType = 'multi';

    @Input()
    supportSorting = false;

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
        this.internalSmartFilter = this._genericListService.convertToSmartFilter(val);
        this.showSmartFilter = this.internalSmartFilter.fields.length > 0;
    }

    @Input()
    showTopBar = false;

    @Input()
    breadCrumbsItems: PepBreadCrumbItem[] = new Array<PepBreadCrumbItem>();

    @Output()
    fieldClick = new EventEmitter<IPepFormFieldClickEvent>();

    @Output()
    valueChange = new EventEmitter<IPepFormFieldValueChangeEvent>();

    @Output()
    breadCrumbItemClick = new EventEmitter<IPepBreadCrumbItemClickEvent>();

    set pepList(val: PepListComponent) {
        this._pepList = val;
    }

    get pepList() {
        return this._pepList;
    }

    private _resize$: Subscription = new Subscription();

    private _dataView: DataView = {
        Type: 'Grid'
    };
    private _tableInputs: any;
    private _pepList: any;
    totalRowCount = -1;
    searchString = '';
    showSmartFilter = false;
    internalSmartFilter: {
        fields: PepSmartFilterBaseField[],
        data: IPepSmartFilterData[]
    } = {
            fields: [],
            data: []
        };
    private _appliedFilters: IPepSmartFilterData[] = [];
    private _sorting: IPepListSortingChangeEvent | undefined = undefined;

    menuHandlers: { [key: string]: (obj: any) => Promise<void> } = {};
    menuActions: Array<PepMenuItem> = [];

    constructor(
        private _resolver: ComponentFactoryResolver,
        private _dataConvertorService: PepDataConvertorService,
        private _layoutService: PepLayoutService,
       // private _translate: TranslateService,
        private _genericListService: PepGenericListService
    ) {
        this._resize$ = this._layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });
    }

    ngOnInit() {
        //
    }

    private async initTable() {
        setTimeout(async () => {
            if (this._dataSource &&
                this._pepListContainer) {

                if (this._pepListContainer.length > 0) {
                    this._pepListContainer.remove();
                }
                const factory = this._resolver.resolveComponentFactory(PepListComponent);
                const componentRef = this._pepListContainer.createComponent(factory);
                this.pepList = componentRef.instance;

                //merge selector inputs with callback inputs
                this.loadTableInputs();

                const fromIndex = 0;
                let toIndex = 0;

                if (this._tableInputs.pager.type === 'pages') {
                    toIndex = fromIndex + (this._tableInputs.pager.size || DEFAULT_PAGE_SIZE) - 1;
                } else {
                    toIndex = 100;//TO DO - get value from - this.customList.getTopItems()
                }

                const data = await this.loadData(fromIndex, toIndex);
                this.totalRowCount = data?.totalCount || 0;

                componentRef.instance.viewType = this._genericListService.getListViewType(this._dataView.Type);
                componentRef.instance.tableViewType = this._tableInputs.tableViewType;
                componentRef.instance.zebraStripes = this._tableInputs.zebraStripes;
                if (this.disabled) {
                    componentRef.instance.disabled = true;
                    componentRef.instance.lockItemInnerEvents = true;
                }
                componentRef.instance.supportSorting = this._tableInputs.supportSorting;
                componentRef.instance.selectionTypeForActions = this._tableInputs.selectionType;
                componentRef.instance.showCardSelection = this._tableInputs.selectionType !== 'none';
                componentRef.instance.pagerType = this._tableInputs.pager.type;
                if (this._tableInputs.pager.type === 'pages') {
                    componentRef.instance.pageSize = this._tableInputs.pager?.size || DEFAULT_PAGE_SIZE;
                    componentRef.instance.pageIndex = this._tableInputs.pager?.index || 0;
                }
                componentRef.instance.noDataFoundMsg = this._tableInputs.noDataFoundMsg;
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
                    this.onValueChanged($event)
                });
                componentRef.instance.sortingChange.subscribe(($event) => {
                    this.onSortingChange($event);
                });
                let convertedList: ObjectsDataRow[] = [];
                if (data) {                   
                    if (data.items?.length) {
                        convertedList = this._dataConvertorService.convertListData(data.items);
                    }                    
                    const uiControl = this.getUiControl(DataViewConverter.toUIControlData(data.dataView));
                    componentRef.instance.initListData(uiControl, data.totalCount, convertedList);
                }
            }
        }, 0);
    }   

    /**
     * loads inputs in case they are provided and merge with selector inputs
     * @returns merged pep-list inputs
     */
    private loadTableInputs() {        
        this._tableInputs = {
            supportSorting: this.supportSorting,
            selectionType: this.selectionType,
            pager: this.pager,
            noDataFoundMsg: this.noDataFoundMsg,
            tableViewType: this.tableViewType,
            zebraStripes: this.zebraStripes
        };
        if (this._dataSource.inputs) {
            Object.entries(this._dataSource.inputs).forEach((item: any) => {
                if (this._genericListService.hasProperty(this._tableInputs, item[0])) {
                    this._tableInputs[item[0]] = item[1];
                }
            });
        }
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
        if (this._tableInputs.selectionType !== 'none') {
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
   
    private async loadData(fromIndex: number, toIndex: number): Promise<IPepGenericListInitData> {
        const data: IPepGenericListInitData = await this._dataSource.init({
            searchString: this.searchString || undefined,
            filters: this._appliedFilters.length ? this._appliedFilters : undefined,
            sorting: this._sorting || undefined,
            fromIndex: fromIndex,
            toIndex: toIndex
        });

        if (data) {
            this._dataView = data.dataView;           

            if (data.items?.length > 0) {
                data.items = data.items.map(item => this._genericListService.convertToPepRowData(item, data.dataView, this.uuidMapping));
            }
        }

        return data;
    }


    private async updateDataList(fromIndex: number, toIndex: number, pageIndex: number | undefined = undefined) {
        if (this._dataSource.update) {
            const dataList = await this._dataSource.update({
                searchString: this.searchString || undefined,
                filters: this._appliedFilters.length ? this._appliedFilters : undefined,
                sorting: this._sorting || undefined,
                fromIndex: fromIndex,
                toIndex: toIndex,
                pageIndex: pageIndex
            });

            if (dataList?.length > 0) {
                return dataList.map(item => this._genericListService.convertToPepRowData(item, this._dataView, this.uuidMapping));
            } else {
                return [];
            }
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
        this.pepList.updatePage(convertedList, event);
    }

    getItemById(id: string) {
        if (this.pepList) {
            return this._pepList.getItemDataByID(id);
        } else {
            return null;
        }
    }

    getSelectedItems() {
        if (this.pepList) {
            return this._pepList.getSelectedItemsData();
        } else {
            return null;
        }
    }

    onActionItemClicked(action: IPepMenuItemClickEvent): void {
        const result = this.getMenuObjects();
        if (result.success) {
            this.menuHandlers[action.source.key](result.data);
        }
    }

    onSearchChanged(event: IPepSearchClickEvent) {
        this.searchString = event.value;
        this.initTable();
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
        this.initTable();
    }

    onFiltersChange(filters: IPepSmartFilterData[]) {
        this._appliedFilters = filters;
        this.initTable();
    }

    ngOnDestroy() {
        if (this._resize$) {
            this._resize$.unsubscribe();
        }
    }

}
