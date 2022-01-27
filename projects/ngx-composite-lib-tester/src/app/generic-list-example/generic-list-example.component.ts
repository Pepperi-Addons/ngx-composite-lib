import { Component, OnInit } from '@angular/core';
import { IPepMenuItemClickEvent, PepMenuItem } from '@pepperi-addons/ngx-lib/menu';
import { IPepGenericListDataSource, IPepGenericListPager, IPepGenericListActions } from 'projects/ngx-composite-lib/generic-list';
import { PepSelectionData, DEFAULT_PAGE_SIZE } from '@pepperi-addons/ngx-lib/list';
import { TranslateService } from '@ngx-translate/core';
import { PepBreadCrumbItem, IPepBreadCrumbItemClickEvent } from '@pepperi-addons/ngx-lib/bread-crumbs';
import { FakeData } from './fake-data';

@Component({
    selector: 'app-generic-list-example',
    templateUrl: './generic-list-example.component.html',
    styleUrls: ['./generic-list-example.component.scss']
})
export class GenericListExampleComponent implements OnInit {
    menuItems = new Array<PepMenuItem>();
    breadCrumbsItems = new Array<PepBreadCrumbItem>();
    pager: IPepGenericListPager = {
        type: 'pages',
        size: 5,
        index: 0
    };
    private selectedRowID = '';


    constructor(private translate: TranslateService) {
        //
    }

    ngOnInit(): void {
        this.menuItems.push({
            key: 'test',
            text: 'test'
        });

        this.translate.get('ExampleComponentsTitle').subscribe((text) => {
            this.loadBreadCrumbs();
        });
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


    dataSource: IPepGenericListDataSource = {
        initList: (params) => {
            console.log('params', params);
            const dataSource = FakeData.Addons;
            console.log('orig list', dataSource);
            //dataSource.concat();
            const filteredData = dataSource.slice(params.fromIndex, params.toIndex + 1)
            console.log('filteredData list', filteredData);
            const res = filteredData.map(addon => ({
                UUID: addon.UUID,
                Description: addon.Addon.Description,
                Version: addon.Version,
                Type: addon.Type,
                CreationDate: addon.CreationDate,
            }));
            console.log('list', res);
            return Promise.resolve({base: {
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
                totalCount: FakeData.Addons.length
            }, items: res});
        },
        updateList: (params) => {
            console.log('params', params);
            const dataSource = FakeData.Addons;
            console.log('orig list', dataSource);
            //dataSource.concat();
            const filteredData = dataSource.slice(params.fromIndex, params.toIndex + 1)
            console.log('filteredData list', filteredData);
            const res = filteredData.map(addon => ({
                UUID: addon.UUID,
                Description: addon.Addon.Description,
                Version: addon.Version,
                Type: addon.Type,
                CreationDate: addon.CreationDate,
            }));
            console.log('list', res);
            return Promise.resolve(res);
        }  
    }

    actions: IPepGenericListActions = {        
        get: async (data: PepSelectionData) => {
            if (data?.selectionType === 0) {
                /*const list = await this.dataSource.getList({ searchString: '', fromIndex: 0, toIndex: 20 });
                if (list?.length === data?.rows.length) {
                    return [];
                } */
            }
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
    }
}
