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
import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,
    PepRowData,
    ObjectsDataRow,
    PepGuid,
    UIControl,
} from '@pepperi-addons/ngx-lib';
import { IPepFormFieldClickEvent } from '@pepperi-addons/ngx-lib/form';
import {
    PepListComponent,
    PepSelectionData,
    IPepListLoadPageEvent,
    PepListSelectionType,
    IPepListSortingChangeEvent,
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
    IPepGenericListTableInputs,
} from './generic-list.model';
import { DataViewConverter } from '@pepperi-addons/data-views';
import { Subscription } from 'rxjs';
import { PepGenericListService } from './generic-list.service';


@Component({
    selector: 'pep-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements OnInit {
    private _pepListContainer: ViewContainerRef | undefined;
    @ViewChild('pepListContainer', { read: ViewContainerRef })
    set pepListContainer(val: ViewContainerRef) {
        this._pepListContainer = val;
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
        }
    }
    @Input()
    set dataSource(val: IPepGenericListDataSource) {
        this._dataSource = val;
        this.searchString = '';
        this._sorting = undefined;
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
    addPadding = false;

    @Input()
    title = '';

    @Input()
    inline = false;

    @Input()
    showSearch = false;

    @Input()
    set noDataFoundMsg(val: string) {
        this._tableInputs.noDataFoundMsg = val;
    }

    @Input()
    set selectionType(val: PepListSelectionType) {
        this._tableInputs.selectionType = val;
    }

    @Input()
    set supportSorting(val: boolean) {
        this._tableInputs.supportSorting = val;
    }

    @Input()
    set pager(val: IPepGenericListPager) {
        this._tableInputs.pager = val;
    }

    @Input()
    showTopBar = false;

    @Input()
    breadCrumbsItems = new Array<PepBreadCrumbItem>();

    @Output()
    fieldClick = new EventEmitter<IPepFormFieldClickEvent>();

    @Output()
    valueChange = new EventEmitter<IPepFormFieldValueChangeEvent>();

    @Output()
    breadCrumbItemClick = new EventEmitter<IPepBreadCrumbItemClickEvent>();

    set pepList(val: PepListComponent) {
        this._genericListService.pepList = val;
    }

    get pepList() {
        return this._genericListService.pepList;
    }

    private _resize$: Subscription = new Subscription();

    private _dataView: GridDataView = {
        Type: 'Grid'
    };
    private _tableInputs: IPepGenericListTableInputs = {
        supportSorting: false,
        selectionType: 'single',
        pager: {
            type: 'scroll'
        },
        noDataFoundMsg: ''
    };
    totalRowCount = -1;
    searchString = '';
    private _sorting: IPepListSortingChangeEvent | undefined = undefined;

    menuHandlers: { [key: string]: (obj: any) => Promise<void> } = {};
    menuActions: Array<PepMenuItem> = [];

    constructor(
        private _resolver: ComponentFactoryResolver,
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
                const tableInputs = await this.loadTableInputs();

                const fromIndex = 0;
                let toIndex = 0;

                if (tableInputs.pager?.type === 'pages') {
                    toIndex = fromIndex + (tableInputs.pager?.size || DEFAULT_PAGE_SIZE) - 1;
                } else {
                    toIndex = 100;//TO DO - get reesult from - this.customList.getTopItems()
                }

                const data = await this.loadData(fromIndex, toIndex);
                this.totalRowCount = data?.totalCount || 0;

                componentRef.instance.viewType = 'table';
                componentRef.instance.supportSorting = tableInputs.supportSorting;
                componentRef.instance.selectionTypeForActions = tableInputs.selectionType;
                componentRef.instance.pagerType = tableInputs.pager.type;
                if (tableInputs.pager.type === 'pages') {
                    componentRef.instance.pageSize = tableInputs.pager?.size || DEFAULT_PAGE_SIZE;
                    componentRef.instance.pageIndex = tableInputs.pager?.index || 0;
                }
                componentRef.instance.noDataFoundMsg = tableInputs.noDataFoundMsg;
                
                componentRef.instance.fieldClick.subscribe(($event) => {
                    this.onCustomizeFieldClick($event);
                });

                componentRef.instance.selectedItemsChange.subscribe(($event) => {
                    this.onSelectedRowsChanged($event);
                })

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
                    if (data?.items?.length > 0) {
                        convertedList = this._dataConvertorService.convertListData(data.items);
                    }
                    const uiControl = this.getUiControl(DataViewConverter.toUIControlData(data.dataView));
                    componentRef.instance.initListData(uiControl, data.totalCount, convertedList);
                }
            }
        }, 0);

    }

    /**
    * checks if the object contains property
    * @param obj object
    * @param prop property name
    * @returns true if contains, false otherwise
    */
    private hasProperty(obj: any, prop: string) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    /**
     * loads callback inputs in case they are provided and merge with selector inputs
     * @returns merged pep-list inputs
     */
    private async loadTableInputs() {
        const tableInputs: any = { ...this._tableInputs };

        if (this._dataSource.inputs) {
            const inputs: IPepGenericListTableInputs = await this._dataSource.inputs();
            if (inputs) {
                Object.entries(inputs).forEach((item: any) => {
                    if (this.hasProperty(tableInputs, item[0])) {
                        tableInputs[item[0]] = item[1];
                    }
                });
            }
        }

        return tableInputs;
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
        if (this._tableInputs.selectionType !== 'none') {
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

    onMenuItemClicked(action: IPepMenuItemClickEvent): void {
        const result = this.getMenuObjects();
        if (result.success) {
            this.menuHandlers[action.source.key](result.data);
        }
    }

    onSearchChanged(event: IPepSearchClickEvent) {
        this.searchString = event.value;
        this.initTable();
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

    onSortingChange(event: IPepListSortingChangeEvent) {
        this._sorting = event;
        this.initTable();
    }

    private async loadData(fromIndex: number, toIndex: number): Promise<IPepGenericListInitData> {
        const data: IPepGenericListInitData = await this._dataSource.init({
            searchString: this.searchString || undefined,
            sorting: this._sorting || undefined,
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
        if (this._dataSource.update) {
            const dataList = await this._dataSource.update({
                searchString: this.searchString || undefined,
                sorting: this._sorting || undefined,
                fromIndex: fromIndex,
                toIndex: toIndex,
                pageIndex: pageIndex
            });

            if (dataList?.length > 0) {
                return dataList.map(item => this.convertToPepRowData(item, this._dataView));
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
    async onLoadItems(event: IPepListLoadItemsEvent) {
        const list = await this.updateDataList(event.fromIndex, event.toIndex);
        const convertedList = this._dataConvertorService.convertListData(list);
        this.pepList.updateItems(convertedList, event);
    }

    /**
     * loads paging bulk from api
     */
    async onLoadPage(event: IPepListLoadPageEvent) {
        const fromIndex = event.pageIndex * event.pageSize;
        const toIndex = Math.min(fromIndex + event.pageSize - 1, this.totalRowCount - 1);
        const list = await this.updateDataList(fromIndex, toIndex, event.pageIndex);
        const convertedList = this._dataConvertorService.convertListData(list);
        this.pepList.updatePage(convertedList, event);
    }

    ngOnDestroy() {
        if (this._resize$) {
            this._resize$.unsubscribe();
        }
    }

}
