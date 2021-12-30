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
    PepListComponent
} from '@pepperi-addons/ngx-lib/list';
import {
    PepMenuItem,
    IPepMenuItemClickEvent,
} from '@pepperi-addons/ngx-lib/menu';
import { IPepSearchClickEvent } from '@pepperi-addons/ngx-lib/search';
  
import { GridDataViewField, DataViewFieldTypes, GridDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { GenericListDataSource } from './generic-list.model';

import * as tween from '@tweenjs/tween.js'

@Component({
    selector: 'pep-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss'],
})
export class GenericListComponent implements OnInit, AfterViewInit {
    @ViewChild(PepListComponent) customList: PepListComponent | undefined;
    
    @Input()
    dataSource: GenericListDataSource | undefined;
    dataObjects: any[] = []
  
    searchString: string = '';
  
    @Input()
    addPadding: boolean = false;

    @Input()
    title: string = '';
  
    @Input()
    inline: boolean = false;
  
    @Input()
    showSearch: boolean = false;
  
    @Input()
    allowSelection: boolean = true;
  
    @Input()
    noDataFoundMsg: string = this.translate.instant('GENERIC-LIST.NO_DATA');
  
    @Input()
    allowMultipleSelection: boolean = false;
    
    @Input() 
    firstFieldAsLink: boolean = false;

    @Input()
    supportSorting: boolean = false;

    @Output()
    fieldClick: EventEmitter<IPepFormFieldClickEvent> = new EventEmitter<IPepFormFieldClickEvent>();

    // @Output()
    // onAddClicked = new EventEmitter<void>();

    menuHandlers: { [key: string]: (obj: any) => Promise<void> } = {};
    menuActions: Array<PepMenuItem> = [];
    hasRows: boolean = true;
    // PepScreenSizeType = PepScreenSizeType;
    // screenSize: PepScreenSizeType;
  
    constructor(
        private dataConvertorService: PepDataConvertorService,
        private layoutService: PepLayoutService,
        private translate: TranslateService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            // this.screenSize = size;
        });
    }
  
    private loadMenuItems(): void {
        if (this.allowSelection) {
            this.getMenuActions().then(x => this.menuActions = x);
        }
    }
  
    private convertToPepRowData(object: any, dataView: GridDataView) {
        const row = new PepRowData();
        row.Fields = [];

        if (dataView?.Fields && dataView.Columns) {
            for (let index = 0; index < dataView.Fields.length; index++) {
                let field = dataView.Fields[index] as GridDataViewField
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
        const actions = await this.dataSource?.getActions(this.getMenuObjects());
        const res: PepMenuItem[] = []
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
        let uuids = this.customList?.getSelectedItemsData().rows ?? [];
        if (this.customList?.getIsAllSelectedForActions()) {
            uuids = this.dataObjects.map(obj => obj.UID).filter(x => uuids.indexOf(x) != -1);
        }
        const objects = uuids.map(uuid => this.getObject(uuid))
        return objects;
    }
  
    private getObject(uuid: string) {
        return this.dataObjects.find(obj => obj.UID === uuid);
    }
    
    ngOnInit() {
    }
  
    ngAfterViewInit(): void {
        this.reload();
    }
  
    onMenuItemClicked(action: IPepMenuItemClickEvent): void {
        this.menuHandlers[action.source.key](this.getMenuObjects());
    }
  
    onSearchChanged(event: IPepSearchClickEvent) {
        this.searchString = event.value
        this.reload();
    }
  
    async reload() {
        if (this.customList && this.dataSource) {
            this.dataObjects = await this.dataSource.getList({
              searchString: this.searchString
            });
            const dataView = await this.dataSource.getDataView();
            const tableData = this.dataObjects.map(x => this.convertToPepRowData(x, dataView));
            const data = this.dataConvertorService.convertListData(tableData);
            data.forEach((obj, i) => {
              this.dataObjects[i].UID = obj.UID;
            })
            const uiControl = this.dataConvertorService.getUiControl(tableData[0]);
            this.customList.initListData(uiControl, data.length, data);
          
            this.loadMenuItems();
        }
        this.hasRows = this.dataObjects?.length > 0 ? true : false;
    }

    selectedRowsChanged(selectedRowsCount: number) {
        this.loadMenuItems();
    }

    onCustomizeFieldClick(fieldClickEvent: IPepFormFieldClickEvent) {
        this.fieldClick.emit(fieldClickEvent);
    }
  
}
  