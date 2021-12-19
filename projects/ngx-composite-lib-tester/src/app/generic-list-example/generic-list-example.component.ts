import { Component, OnInit } from '@angular/core';
import { IPepMenuItemClickEvent, PepMenuItem } from '@pepperi-addons/ngx-lib/menu';
import { GenericListDataSource } from 'projects/ngx-composite-lib/generic-list';
import { FakeData } from './fake-data';

@Component({
    selector: 'app-generic-list-example',
    templateUrl: './generic-list-example.component.html',
    styleUrls: ['./generic-list-example.component.scss']
})
export class GenericListExampleComponent implements OnInit {
    
    menuItems: Array<PepMenuItem> = new Array<PepMenuItem>();
    private selectedRowID = '';
    

    constructor() { }

    ngOnInit(): void {
        this.menuItems.push({
            key: 'test',
            text: 'test'
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

    dataSource: GenericListDataSource = {
        getList: (options) => {
            const dataSource = FakeData.Addons;
            const res = dataSource.map(addon => ({
                UUID: addon.UUID,
                Description: addon.Addon.Description,
                Version: addon.Version,
                Type: addon.Type,
                CreationDate: addon.CreationDate,
            }));

            return Promise.resolve(res);
        },

        getDataView: async () => {
            return {
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
        },

        getActions: async (objs) => {
            this.selectedRowID = objs.length > 0 ? objs[0].Key : '';
            return objs.length ? [
                {
                    title: 'Edit',
                    handler: async (objs) => {
                        alert('edit');
                    }
                }
            ] : []
        }
    }

    onMenuItemClicked(action: IPepMenuItemClickEvent): void {
        alert(action.source.key);
    }
}
