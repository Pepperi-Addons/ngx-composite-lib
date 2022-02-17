import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IPepMenuItemClickEvent, PepMenuItem } from '@pepperi-addons/ngx-lib/menu';
import {
    IPepGenericListDataSource,
    IPepGenericListPager,
    IPepGenericListActions, IPepGenericListInitData, PepGenericListService

} from '@pepperi-addons/ngx-composite-lib/generic-list';

import { PepSelectionData, DEFAULT_PAGE_SIZE } from '@pepperi-addons/ngx-lib/list';
import { TranslateService } from '@ngx-translate/core';
import { GenericListComponent } from '@pepperi-addons/ngx-composite-lib/generic-list';
import { PepBreadCrumbItem, IPepBreadCrumbItemClickEvent } from '@pepperi-addons/ngx-lib/bread-crumbs';
import { FakeData } from './fake-data';


@Component({
    selector: 'app-generic-list-example',
    templateUrl: './generic-list-example.component.html',
    styleUrls: ['./generic-list-example.component.scss']
})
export class GenericListExampleComponent implements OnInit {
    //@ViewChild(GenericListComponent) pList: GenericListComponent | undefined;
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
    menuItems = new Array<PepMenuItem>();
    breadCrumbsItems = new Array<PepBreadCrumbItem>();

    pager: IPepGenericListPager = {
        type: 'pages',
        size: 10,
        index: 0
    };
    selectionType: any = 'multi';
    supportSorting = false;
    firstFieldAsLink = false;
    //private selectedRowID = '';


    constructor(private translate: TranslateService, private genericListService: PepGenericListService) {
        //
    }

    ngOnInit(): void {
        this.menuItems.push({
            key: 'test',
            text: 'test'
        });

        this.loadBreadCrumbs();

        this.dataSource = this.getDataSource();

    }
    /*

    ngAfterViewInit(): void {
        this.pList?.initDataList(
            {
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
                    this.getRegularReadOnlyColumn('Type'),
                    this.getRegularReadOnlyColumn('CreationDate')
                ],
                Columns: [
                    { Width: 15 },
                    { Width: 30 },
                    { Width: 15 },
                    { Width: 20 },
                    { Width: 20 }
                ],
                FrozenColumnsCount: 0,
                MinimumColumnWidth: 0
            }
            , this.getBulk({ fromIndex: 0, toIndex: 9 })
            , FakeData.Addons.length

        ); 
    } */

    private getRegularReadOnlyColumn(columnId: string): any {
        return {
            FieldID: columnId,
            Type: 'TextBox',
            Title: columnId,
            Mandatory: false,
            ReadOnly: true
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

   
    /*dataSource: any = {
       init: (params : any) => {
            const dataList = FakeData.Addons;
            const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
            console.log('filteredData', filteredData.length);
            const res = filteredData.map(addon => ({
                UUID: addon.UUID,
                Description: addon.Addon.Description,
                Version: addon.Version,
                Type: addon.Type,
                CreationDate: addon.CreationDate,
            }));
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
                        this.getRegularReadOnlyColumn('Type'),
                        this.getRegularReadOnlyColumn('CreationDate')
                    ],
                    Columns: [
                        { Width: 15 },
                        { Width: 30 },
                        { Width: 15 },
                        { Width: 20 },
                        { Width: 20 }
                    ],
                    FrozenColumnsCount: 0,
                    MinimumColumnWidth: 0 
                },
                totalCount: res.length * 2,
                items: res
            });
        }, 
        update: (params: any) => {
            console.log('update',params);
            const dataList = FakeData.Addons;
            const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
            const res = filteredData.map(addon => ({
                UUID: addon.UUID,
                Description: addon.Addon.Description,
                Version: addon.Version,
                Type: addon.Type,
                CreationDate: addon.CreationDate,
            }));
            return Promise.resolve(res);
        } 
    }*/

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
            this.pager.type = 'pages';
            this.selectionType = 'multi';
            this.firstFieldAsLink = false;
            this.supportSorting = false;
            this.dataSource = this.getDataSource();
           

        } else {
            this.pager.type = 'scroll';
            //this.selectionType = 'single';
            //this.firstFieldAsLink = true;
            
            this.supportSorting = true;
            this.dataSource = this.getDataSourceEmpty();

        }
    }

    onClick() {
        console.log('item', this.genericListService.getItemById('2e51566e-7035-42dd-a7c2-fb92bc4ed135'));
        console.log('selected itens', this.genericListService.getSelectedItems());
        //PepGenericListService
        //this.dataSource = this.getDataSourceEmpty();
    }

    getDataSource() {
        return {
            init: async (params: any) => {
                const dataList = FakeData.Addons;
                const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                //const filteredData = dataList.slice(0, 5);
                console.log('filteredData', filteredData.length);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
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
                            this.getRegularReadOnlyColumn('CreationDate')
                        ],
                        Columns: [
                            { Width: 15 },
                            { Width: 30 },
                            { Width: 15 },
                            { Width: 20 },
                            { Width: 20 }
                        ],
                        FrozenColumnsCount: 0,
                        MinimumColumnWidth: 0
                    },
                    totalCount: res.length * 2,
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
            }, */
            update: async (params: any) => {
                console.log('update', params);
                const dataList = FakeData.Addons;
                const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                //const filteredData = dataList.slice(5, 10);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
                return Promise.resolve(res);
            } 
        } as IPepGenericListDataSource
    }

    getDataSourceEmpty() {
        return {
            init: (params: any) => {
                const dataList = FakeData.Addons;
                //const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = dataList.slice(10, 15);
                console.log('filteredData 2', filteredData.length);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
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
                            this.getRegularReadOnlyColumn('Type'),
                            this.getRegularReadOnlyColumn('CreationDate')
                        ],
                        Columns: [
                            { Width: 15 },
                            { Width: 30 },
                            { Width: 15 },
                            { Width: 20 },
                            { Width: 20 }
                        ],
                        FrozenColumnsCount: 0,
                        MinimumColumnWidth: 0
                    },
                    totalCount: res.length * 2,
                    items: res
                });
            },
            inputs: () => {
                return Promise.resolve(
                    {
                        selectionType: 'single',
                        firstFieldAsLink: true
                    }
                );
            },
            update: (params: any) => {
                console.log('update', params);
                const dataList = FakeData.Addons;
                //const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = dataList.slice(15, 20);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
                return Promise.resolve(res);
            }
        } as IPepGenericListDataSource
    }
}
