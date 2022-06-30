import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { PepGenericListModule } from './generic-list.module';
import { GenericListComponent } from './generic-list.component';
import { PepNgxHelperModule } from '../src/core/common/modules/ngx-helper-module';
import { PepListSelectionType } from '@pepperi-addons/ngx-lib/list';
import { PepBreadCrumbItem } from '@pepperi-addons/ngx-lib/bread-crumbs';
import { IPepGenericListPager } from './generic-list.model';
import { PepSelectionData, DEFAULT_PAGE_SIZE, PepListTableViewType } from '@pepperi-addons/ngx-lib/list';
//import { SBNgxHelperModule } from '@storybook-settings/typings/';


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [
                PepGenericListModule,
                PepNgxHelperModule
            ]
        })
    ],
    title: 'Components/generic-list',
    component: GenericListComponent,
    argTypes: {
        dataSource: {
            description: 'A callback to retrieve the list data and data view',
            defaultValue: {
                init: async (params: any) => {
                    return {
                        dataView: {
                            Context: {
                                Name: '',
                                Profile: { InternalID: 0 },
                                ScreenSize: 'Landscape'
                            },
                            Type: 'Grid',
                            Title: '',
                            Fields: [
                                {
                                    FieldID: 'UUID',
                                    Type: 'TextBox',
                                    Title: 'UUID',
                                    Mandatory: false,
                                    ReadOnly: true
                                },
                                {
                                    FieldID: 'Description',
                                    Type: 'TextBox',
                                    Title: 'Description',
                                    Mandatory: false,
                                    ReadOnly: false
                                },
                                {
                                    FieldID: 'Version',
                                    Type: 'TextBox',
                                    Title: 'Version',
                                    Mandatory: false,
                                    ReadOnly: true
                                },
                                {
                                    FieldID: 'Type',
                                    Type: 'TextBox',
                                    Title: 'Type',
                                    Mandatory: false,
                                    ReadOnly: true
                                },
                                {
                                    FieldID: 'CreationDate',
                                    Type: 'TextBox',
                                    Title: 'Creation Date',
                                    Mandatory: false,
                                    ReadOnly: true
                                }
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
                        totalCount: 4,
                        items: [
                            {
                                UUID: 'e738c47c-ed34-49a9-9c02-f8fb5209d151',
                                Description: 'Manage your add-ons',
                                Version: 'v1.0',
                                Type: 1,
                                CreationDate: '2020-04-22T11:56:09.863Z'
                            },
                            {
                                UUID: 'bd629d5f-a7b4-4d03-9e7c-67865a6d82a9',
                                Description: 'Manage the addons (install, uninstall, upgrade)',
                                Version: '0.3.3',
                                Type: 1,
                                CreationDate: '2020-06-08T09:39:08.703Z',
                            },
                            {
                                UUID: 'fcb7ced2-4c81-4705-9f2b-89310d45e6c7',
                                Description: 'Run, Schedule and Audit your jobs',
                                Version: '1.0.53',
                                Type: 1,
                                CreationDate: '2020-06-09T07:44:49.883Z'
                            },
                            {
                                UUID: 'fcb7ced2-4c81-4705-9f2b-89310d45e6c7',
                                Description: 'Manages the embeded Node.js app in the CPI',
                                Version: '0.0.3',
                                Type: 2,
                                CreationDate: '2020-05-25T08:31:44.01Z'
                            }
                        ]
                    }
                }
            },
            table: {
                type: { summary: 'IPepGenericListDataSource' }
            }

        },
        actions: {
            description: 'A callback to retrieve a list of actions in relation to the selected items',
            defaultValue: {
                get: async (data: PepSelectionData) => {
                    if (data?.rows.length === 1 && data?.selectionType !== 0) {
                        return [
                            {
                                title: 'Edit',
                                handler: async (params: any) => {
                                    alert('edit');
                                }
                            },
                            {
                                title: 'Delete',
                                handler: async (params: any) => {
                                    alert('delete');
                                }
                            }
                        ]
                    } else if (data?.rows.length > 1 || data?.selectionType === 0) {
                        return [
                            {
                                title: 'Delete',
                                handler: async (params: any) => {
                                    alert('delete');
                                }
                            }
                        ]
                    } else return [];
                }
            },
            control: 'object',
            table: {
                defaultValue: {
                    summary: null
                }
            }

        },
        breadCrumbsItems: {
            description: 'A list of breadcrumb items',
            defaultValue: [],
            control: 'array',
            table: {
                defaultValue: {
                    summary: null
                }
            }
        },
        uuidMapping: {
            description: 'Column name to be used as unique key',
            defaultValue: '',
            table: {
                defaultValue: {
                    summary: `'key'`
                }
            }
        },
        disabled: {
            description: 'Whether the list is disabled'
        },
        addPadding: {
            description: 'Whether list container has padding'
        },
        title: {
            description: 'Top bar title',
            table: {
                defaultValue: {
                    summary: null
                }
            }
        },
        description: {
            description: 'List description',
            table: {
                defaultValue: {
                    summary: null
                }
            }
        },

        inline: {
            description: 'false → is when you want to use the Generic List as a page (Full view, Unique URL). true → if you want to use the Generic List as a part of a page'
        },
        showSearch: {
            description: 'Whether the search box is displayed'
        },
        selectionType: {
            description: 'Item selection type',
            options: [
                'multi',
                'single',
                'none'
            ],
            control: { type: 'radio' },
            table: {
                type: {
                    summary: `'multi' | 'single' | 'none'`,
                },
                defaultValue: { summary: 'multi' },
            }
        },
        noDataFoundMsg: {
            description: 'No data found text message',
            table: {
                defaultValue: {
                    summary: null
                }
            }
        },
        supportSorting: {
            description: 'Whether column sorting is enabled'
        },
        showTopBar: {
            description: 'Whether the top bar is displayed'
        },
        pager: {
            description: 'Table paging type',
            defaultValue: {
                type: 'scroll'
            },
            table: {
                type: {
                    summary: 'IPepGenericListPager'
                },
                defaultValue: {
                    summary: `type: 'scroll'`
                }
            }
        },
        tableViewType: {
            description: 'List line height type. Relevant to data view of type \'Grid\' only',
            options: [
                'compact',
                'regular'
            ],
            control: { type: 'radio' },
            table: {
                type: {
                    summary: `'compact' | 'regular'`,
                },
                defaultValue: { summary: "'regular'" },
            }
        },
        zebraStripes: {
            description: 'Whether zebra stripes are displayed. Relevant to data view of type \'Grid\' only'
        },
        smartFilter: {
            description: 'Smart Filter\'s data and data view',
            defaultValue: null
            ,
            control: 'object',
            table: {
                type: {
                    summary: 'IPepGenericListSmartFilter'
                },
                defaultValue: {
                    summary: null
                }
            }
        },
        getItemById: {
            description: 'Retrieve item\'s data by Id, uuidMapping\'s value is used as search key. if uuidMapping was not provided, default value is used',
            control: false,
            table: {
                type: {
                    summary: `(id: string) => ObjectsDataRow | null`
                }
            }
        },
        getSelectedItems: {
            description: 'Retrieve selected items',
            control: false,
            table: {
                type: {
                    summary: `() => PepSelectionData | null`
                }
            }
        },
        valueChange: {
            action: 'valueChange',
            description: 'Emits a change event whenever a value is changed',
            control: false,
            table: {
                type: {
                    summary: 'EventEmitter<IPepFormFieldValueChangeEvent>'
                }
            }
        },
        fieldClick: {
            action: 'fieldClick',
            description: 'Emits a click event whenever a field is clicked',
            control: false,
            table: {
                type: {
                    summary: 'EventEmitter<IPepFormFieldClickEvent>'
                }
            }

        },
        breadCrumbItemClick: {
            action: 'breadCrumbItemClick',
            description: 'Emits a click event whenever a breadcrumb item is clicked',
            control: false,
            table: {
                type: {
                    summary: 'EventEmitter<IPepBreadCrumbItemClickEvent>'
                }
            }
        }
    },
    parameters: {
        controls: {
            include: [
                'dataSource',
                'actions',
                'breadCrumbsItems',
                'uuidMapping',
                'disabled',
                'addPadding',
                'title',
                "description",
                'inline',
                'showSearch',
                'selectionType',
                'noDataFoundMsg',
                'supportSorting',
                'showTopBar',
                'pager',
                'tableViewType',
                'zebraStripes',
                'smartFilter',
                'getItemById',
                'getSelectedItems',
                'valueChange',
                'fieldClick',
                'breadCrumbItemClick'
            ],
        },
        docs: {
            description: {
              component: 'The Generic List is made out of 3 main components: 1) Topbar, 2) Smart filters and 3) List. You can use them all or just the List, or any other combination - its up to you, the developer, to decide. **Inline** - `false` → is when you want to use the Generic List as a page (Full view, Unique URL) - `true` → if you want to use the Generic List as a part of a page'
            }
          }
    }


} as Meta;

const Template: Story<GenericListComponent> = (args: GenericListComponent) => ({
    props: {
        ...args,
        fieldClick: action('fieldClick'),
        valueChange: action('valueChange'),
        breadCrumbItemClick: action('breadCrumbItemClick')
    },
    template: `
        <div style="height: 40vh">
            <pep-generic-list [dataSource]="dataSource" [actions]="actions" [breadCrumbsItems]="breadCrumbsItems" [uuidMapping]="uuidMapping" [disabled]="disabled" 
                [addPadding]="addPadding" [title]="title" [description]="description" [inline]="inline" [showSearch]="showSearch" [selectionType]="selectionType"
                [noDataFoundMsg]="noDataFoundMsg" [supportSorting]="supportSorting" [supportSorting]="supportSorting" [showTopBar]="showTopBar" [pager]="pager"
                [tableViewType]="tableViewType" [zebraStripes]="zebraStripes" [smartFilter]="smartFilter" (valueChange)="valueChange" (fieldClick)="fieldClick" 
                (breadCrumbItemClick)="breadCrumbItemClick">
            </pep-generic-list>
        </div>
    `
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {
    showTopBar: true
}

export const NoDataFoundMsg = Template.bind({});
NoDataFoundMsg.storyName = 'No Data Found Message';
NoDataFoundMsg.args = {
    dataSource: {
        init: async (params: any) => {
            return {
                dataView: {
                    Context: {
                        Name: '',
                        Profile: { InternalID: 0 },
                        ScreenSize: 'Landscape'
                    },
                    Type: 'Grid',
                    Title: '',
                    Fields: [
                        {
                            FieldID: 'UUID',
                            Type: 'TextBox',
                            Title: 'UUID',
                            Mandatory: false,
                            ReadOnly: true
                        },
                        {
                            FieldID: 'Description',
                            Type: 'TextBox',
                            Title: 'Description',
                            Mandatory: false,
                            ReadOnly: false
                        },
                        {
                            FieldID: 'Version',
                            Type: 'TextBox',
                            Title: 'Version',
                            Mandatory: false,
                            ReadOnly: true
                        },
                        {
                            FieldID: 'Type',
                            Type: 'TextBox',
                            Title: 'Type',
                            Mandatory: false,
                            ReadOnly: true
                        },
                        {
                            FieldID: 'CreationDate',
                            Type: 'TextBox',
                            Title: 'Creation Date',
                            Mandatory: false,
                            ReadOnly: true
                        }
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
                totalCount: 0,
                items: [
                ]
            }
        }
    }
}

export const breadCrumbsItems = Template.bind({});
breadCrumbsItems.storyName = 'Bread Crumbs Items';
breadCrumbsItems.args = {
    breadCrumbsItems: [
        {
            key: '1',
            text: 'Item1',
            title: 'Item 1'
        },
        {
            key: '2',
            text: 'Item2',
            title: 'Item 2'
        }
    ]
}

export const SmartFilter = Template.bind({});
SmartFilter.storyName = 'Smart filter';
SmartFilter.args = {
    smartFilter: {
        dataView: {
            Context: {
                Name: '',
                Profile: { InternalID: 0 },
                ScreenSize: 'Landscape'
            },
            Type: 'Menu',
            Title: '',
            Fields: [
                {
                    FieldID: 'BillToName',
                    Type: 'MultipleStringValues',
                    Title: 'Bill To Name',
                    OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "Israel" }]
                },
                {
                    FieldID: 'AllowDecimal',
                    Type: 'Bool',
                    Title: 'Allow Decimal'
                },
                {
                    FieldID: 'CaseQuantity',
                    Type: 'Integer',
                    Title: 'Case Quantity'
                }
            ] as any
        }
    }
}




