import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IPepMenuItemClickEvent, PepMenuItem } from '@pepperi-addons/ngx-lib/menu';
import {
    IPepGenericListDataSource,
    IPepGenericListPager,
    IPepGenericListActions,
    IPepGenericListInitData,
    PepGenericListService

} from 'projects/ngx-composite-lib/generic-list'; //from '@pepperi-addons/ngx-composite-lib/generic-list';

import { PepSelectionData, DEFAULT_PAGE_SIZE, PepListTableViewType } from '@pepperi-addons/ngx-lib/list';
import { TranslateService } from '@ngx-translate/core';
import { GenericListComponent } from '@pepperi-addons/ngx-composite-lib/generic-list';
import { PepBreadCrumbItem, IPepBreadCrumbItemClickEvent } from '@pepperi-addons/ngx-lib/bread-crumbs';
import { FakeData, FakeSmartFilterFields, FakeCardsData, FakeCardsDataView, FakeLineDataView, FakeLineData } from './fake-data';


@Component({
    selector: 'app-generic-list-example',
    templateUrl: './generic-list-example.component.html',
    styleUrls: ['./generic-list-example.component.scss']
})
export class GenericListExampleComponent implements OnInit {
    @ViewChild('glist1') glist1: GenericListComponent | undefined;
    @ViewChild('glist2') glist2: GenericListComponent | undefined;

    inline = true;
    dataSource: IPepGenericListDataSource = {
        init: async (params: any) => {
            return {
                dataView: {
                    Type: 'Grid'
                },
                totalCount: -1,
                items: []
            }
        }
    };
    dataSource2: IPepGenericListDataSource = {
        init: async (params: any) => {
            return {
                dataView: {
                    Type: 'Card'
                },
                totalCount: -1,
                items: []
            }
        }
    };
    dataSourceLine: IPepGenericListDataSource = {
        init: async (params: any) => {
            return {
                dataView: {
                    Type: 'Line'
                },
                totalCount: -1,
                items: []
            }
        }
    };
    addPadding = false;
    title = 'Generic list 2 inline title';
    menuItems = new Array<PepMenuItem>();
    breadCrumbsItems = new Array<PepBreadCrumbItem>();
    description = 'Some description';
    disableTable = false;
    pager: IPepGenericListPager = {
        type: 'pages',
        size: 10,
        index: 1
    };
    selectionType: any = 'multi';
    supportSorting = false;
    firstFieldAsLink = false;
    tableViewType: PepListTableViewType = 'compact';

    //private selectedRowID = '';


    constructor(private translate: TranslateService/*, private genericListService: PepGenericListService*/) {
        //
    }

    ngOnInit(): void {
        this.menuItems.push({
            key: 'test',
            text: 'test'
        });

        this.loadBreadCrumbs();

        this.dataSource = this.getDataSource();
        this.dataSource2 = this.getDataSourceEmpty();
        this.dataSourceLine = this.getDataSourceLine();

    }

    private getRegularReadOnlyColumn(columnId: string): any {
        return {
            FieldID: columnId,
            Type: 'TextBox',
            Title: columnId,
            Mandatory: false,
            ReadOnly: true
        }
    }

    private getNumberColumn(columnId: string) {
        return {
            FieldID: columnId,
            Type: 'NumberInteger',
            Title: columnId,
            Mandatory: false,
            ReadOnly: true
        }
    }

    getColumn(columnId: string, type: string, isEnabled: boolean) {
        return {
            FieldID: columnId,
            Type: type,//'Currency',
            Title: columnId,
            Mandatory: false,
            ReadOnly: !isEnabled
        }
    }

    private getLinkColumn(columnId: string): any {
        return {
            FieldID: columnId,
            Type: 'Link',
            Title: columnId,
            Mandatory: false,
            ReadOnly: true
        }
    }

    private getHiddenColumn(columnId: string) {
        return {
            FieldID: columnId,
            Type: 'TextBox',
            Title: columnId,
            Mandatory: false,
            Visible: false
        }
    }

    actions: IPepGenericListActions = {
        get: async (data: PepSelectionData) => {
            if (data?.rows.length === 1 && data?.selectionType !== 0) {
                return [
                    {
                        title: 'Edit',
                        handler: async (ddd) => {
                            alert('edit');
                        }
                    },
                    {
                        title: 'Delete',
                        handler: async (ddd) => {
                            alert('delete');
                        }
                    }
                ]
            } else if (data?.rows.length > 1 || data?.selectionType === 0) {
                return [
                    {
                        title: 'Delete',
                        handler: async (ddd) => {
                            //   alert('delete');
                        }
                    }
                ]
            } else return [];
        }
    }

    actions2: IPepGenericListActions = {
        get: async (data: PepSelectionData) => {
            if (data?.rows.length === 1 && data?.selectionType !== 0) {
                return [
                    {
                        title: 'Edit',
                        handler: async (ddd) => {
                            alert('edit');
                        }
                    },
                    {
                        title: 'Delete',
                        handler: async (ddd) => {
                            console.log('ddd', ddd);
                            alert('delete');
                        }
                    }
                ]
            } else if (data?.rows.length > 1 || data?.selectionType === 0) {
                return [
                    {
                        title: 'Delete',
                        handler: async (ddd) => {
                            console.log('ddd 2', ddd);
                            alert('delete');
                        }
                    }
                ]
            } else return [];
        }
    }


    loadBreadCrumbs() {
        this.breadCrumbsItems.push(new PepBreadCrumbItem({
            key: '1',
            text: 'Crumb1',
            title: 'Title1'
        }));
        this.breadCrumbsItems.push(new PepBreadCrumbItem({
            key: '2',
            text: 'Crumb2',
            title: 'Title2'
        }));

    }

    onMenuItemClicked(action: IPepMenuItemClickEvent): void {
        alert(action.source.key);
    }

    onBreadCrumbClick(event: IPepBreadCrumbItemClickEvent) {
        console.log('onBreadCrumbClick', event);
        if (event?.source?.text === 'Crumb1') {
            this.pager = {
                type: 'pages',
                size: 10,
                index: 1
            };
            this.selectionType = 'multi';
            this.firstFieldAsLink = false;
            this.supportSorting = false;
            this.tableViewType = 'compact';
            this.smartFilter = {
                dataView: this.getSmartFilters()
            }
            this.dataSource = this.getDataSource();


        } else {
            
            //this.selectionType = 'single';
            //this.firstFieldAsLink = true;
            
            this.pager.type = 'scroll';
            this.tableViewType = 'regular';
            this.supportSorting = true;
            this.smartFilter = undefined;/*{
                dataView: this.getSmartFilters2()
            } */
            this.dataSource = this.getDataSource2();

        }
    }

    onClick() {
        // console.log('glist1', this.glist1);
        console.log('items',this.glist1?.getSelectedItems());
        if (this.glist1) {
            console.log('item 1', this.glist1.getItemById('2e51566e-7035-42dd-a7c2-fb92bc4ed135'));
            console.log('selected itens 1', this.glist1.getSelectedItems());
        }
        //  console.log('glist2', this.glist2);
        if (this.glist2) {
            console.log('item 2', this.glist2.getItemById('7e51566e-7035-42dd-a7c2-fb92bc4ed135'));
            console.log('selected itens 2', this.glist2.getSelectedItems());
        }


        //console.log('item', this.glist1.getItemById('2e51566e-7035-42dd-a7c2-fb92bc4ed135'));
        // console.log('selected itens', this.genericListService.getSelectedItems());
        //PepGenericListService
        //this.dataSource = this.getDataSourceEmpty();
    }
    smartFilter: any = {
        dataView: this.getSmartFilters()
    }
    getDataSource() {
        return {
            init: async (params: any) => {
                const dataList = FakeData.Addons;
                // const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = [...dataList, ...dataList];
                //const filteredData = dataList.slice(0, 5);
                //console.log('init params', params);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                    TestNum: 100000

                }));
                const rows2 = filteredData.map((item) => {
                    return {
                        fields: {
                            UUID: item.UUID,
                            Description: item.Addon.Description,
                            Version: item.Version,
                            Type: item.Type,
                            CreationDate: item.CreationDate
                        },
                        isEditable: true,
                        isSelectableForActions: false,
                    }
                });
                return Promise.resolve({
                    dataView: {
                        Context: {
                            Name: '',
                            Profile: { InternalID: 0 },
                            ScreenSize: 'Landscape'
                        },
                        Type: 'Grid',
                        Title: '',
                        Fields: [
                            this.getRegularReadOnlyColumn('UUID'),
                            this.getRegularReadOnlyColumn('Description'),
                            this.getRegularReadOnlyColumn('Version'),
                            this.getLinkColumn('Type'),
                            this.getRegularReadOnlyColumn('CreationDate'),
                            this.getNumberColumn('TestNum'),
                            //this.getHiddenColumn('FirstName'),
                        ],
                        Columns: [
                            { Width: 15 },
                            { Width: 30 },
                            { Width: 15 },
                            { Width: 20 },
                            { Width: 15 },
                            { Width: 5 },

                            // { Width: 0 }
                        ],
                        FrozenColumnsCount: 0,
                        MinimumColumnWidth: 0
                    },
                    totalCount: res.length,
                    items: res

                });
            },
            /*inputs: () => {
                return Promise.resolve(
                    {
                        pager: {
                            type: 'scroll'
                        },
                        selectionType: 'multi'
                    }
                );
            },*/
            update: async (params: any) => {
                //                console.log('update', params);
                const dataList = FakeData.Addons;
                //const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = dataList.slice(5, 10);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
                return Promise.resolve(res);
            },
            inputs: {
               
                selectionType: 'multi'
            }
        } as IPepGenericListDataSource
    }

    getDataSource2() {
        return {
            init: async (params: any) => {
                const dataList = FakeData.Addons;
                // const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = [...dataList, ...dataList];
                //const filteredData = dataList.slice(0, 5);
                //console.log('init params', params);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                    TestNum: 100000

                }));
                const rows2 = filteredData.map((item) => {
                    return {
                        fields: {
                            UUID: item.UUID,
                            Description: item.Addon.Description,
                            Version: item.Version,
                            Type: item.Type,
                            CreationDate: item.CreationDate
                        },
                        isEditable: true,
                        isSelectableForActions: false,
                    }
                });
                return Promise.resolve({
                    dataView: {
                        Context: {
                            Name: '',
                            Profile: { InternalID: 0 },
                            ScreenSize: 'Landscape'
                        },
                        Type: 'Grid',
                        Title: '',
                        Fields: [
                            this.getRegularReadOnlyColumn('UUID'),
                            this.getRegularReadOnlyColumn('Description'),
                            this.getRegularReadOnlyColumn('Version'),
                            this.getLinkColumn('Type'),
                            this.getRegularReadOnlyColumn('CreationDate'),
                            this.getNumberColumn('TestNum'),
                            //this.getHiddenColumn('FirstName'),
                        ],
                        Columns: [
                            { Width: 15 },
                            { Width: 30 },
                            { Width: 15 },
                            { Width: 20 },
                            { Width: 15 },
                            { Width: 5 },

                            // { Width: 0 }
                        ],
                        FrozenColumnsCount: 0,
                        MinimumColumnWidth: 0
                    },
                    totalCount: res.length,
                    items: res

                });
            },
            /*inputs: () => {
                return Promise.resolve(
                    {
                        pager: {
                            type: 'scroll'
                        },
                        selectionType: 'multi'
                    }
                );
            },*/
            update: async (params: any) => {
                //                console.log('update', params);
                const dataList = FakeData.Addons;
                //const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = dataList.slice(5, 10);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
                return Promise.resolve(res);
            },
            inputs: {
               
                selectionType: 'single'
            }
        } as IPepGenericListDataSource
    }

    getDataSourceEmpty() {
        return {
            init: (params: any) => {

                return Promise.resolve({
                    dataView: {
                        InternalID: 3098435,
                        Type: "Card",
                        Title: "Sales Rep Form",
                        Hidden: false,
                        CreationDateTime: "2018-04-22T07:58:02Z",
                        ModificationDateTime: "2018-04-22T07:58:13Z",
                        Context: {
                            "Object": {
                                "Resource": "transactions",
                                "InternalID": 138173,
                                "Name": "sales avner"
                            },
                            "Name": "OrderCenterBarcodeLinesView",
                            "ScreenSize": "Tablet",
                            "Profile": {
                                "InternalID": 46273,
                                "Name": "Rep"
                            }
                        },
                        ListData: {},
                        Fields: FakeCardsDataView,
                        "Rows": [
                            {
                                "Mode": "MatchParent"
                            },
                            {
                                "Mode": "Fixed"
                            },
                            {
                                "Mode": "Fixed"
                            },
                            {
                                "Mode": "Fixed"
                            }
                        ],
                        "Columns": [
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {}
                        ]
                    },

                    totalCount: FakeCardsData.length * 2,
                    items: FakeCardsData

                });
            },
            update: (params: any) => {
                // console.log('update', params);
                const dataList = FakeData.Addons;
                //const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = dataList.slice(15, 20);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate
                }));
                return Promise.resolve(res);
            },
            inputs: {
                selectionType: 'single',
                firstFieldAsLink: true
            }
        } as IPepGenericListDataSource
    }

    getDataSourceLine() {
        return {
            init: (params: any) => {
                return Promise.resolve({
                    dataView: {
                        "InternalID": 2884561,
                        "Type": "Line",
                        "Title": "Sales Rep Form",
                        "Hidden": false,
                        "CreationDateTime": "2017-12-03T09:50:14Z",
                        "ModificationDateTime": "2017-12-03T09:50:14Z",
                        "Context": {
                            "Object": {
                                "Resource": "transactions",
                                "InternalID": 138173,
                                "Name": "sales avner"
                            },
                            "Name": "OrderCenterFlatMatrixLine",
                            "ScreenSize": "Tablet",
                            "Profile": {
                                "InternalID": 46273,
                                "Name": "Rep"
                            }
                        },
                        "ListData": {},
                        "Fields": FakeLineDataView,
                        "Rows": [],
                        "Columns": [
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {}
                        ]
                    },
                    totalCount: FakeLineData.length * 2,
                    items: FakeLineData
                });
            }
        } as IPepGenericListDataSource
    }

    getSmartFilters() {
        return {
            Context: {
                Name: '',
                Profile: { InternalID: 0 },
                ScreenSize: 'Landscape'
            },
            Type: 'Menu',
            Title: '',
            Fields: FakeSmartFilterFields,
            FrozenColumnsCount: 0,
            MinimumColumnWidth: 0
        }
    }

    getSmartFilters2() {
        return {
            Context: {
                Name: '',
                Profile: { InternalID: 0 },
                ScreenSize: 'Landscape'
            },
            Type: 'Menu',
            Title: '',
            Fields: [FakeSmartFilterFields[0], FakeSmartFilterFields[2]],
            FrozenColumnsCount: 0,
            MinimumColumnWidth: 0
        }
    }

    onBtnClicked() {
        // console.log('get selected', this.genericListService.getItemById('2e51566e-7035-42dd-a7c2-fb92bc4ed135'));
    }

    onBtn2Clicked() {
        //
    }
}
