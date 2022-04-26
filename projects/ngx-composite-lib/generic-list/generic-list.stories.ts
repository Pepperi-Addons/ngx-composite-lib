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
    title: 'Components/GenericList',
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
                                    ReadOnly: true
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
                        totalCount: 3,
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

                            }
                        ]
                    }
                }
            },
            table: {
                type: {summary: 'IPepGenericListDataSource'}
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
            defaultValue: 'key',
            control: 'text'
        },
        disabled: {
            description: 'Whether the list is disabled',
            defaultValue: false,
            control: 'boolean',
        },
        addPadding: {
            description: 'Whether the container has padding',
            defaultValue: false,
            control: 'boolean'
        },
        title: {
            description: 'Top bar title',
            control: 'text'
        },
        inline: {
            description: 'Whether the component is inline. when inline is set to true, the container width and height have to be set manually',
            defaultValue: false,
            control: 'boolean'
        },
        showSearch: {
            description: 'Whether the search box is displayed',
            defaultValue: false,
            control: 'boolean'
        },
        selectionType: {
            description: 'Item selection type',
            defaultValue: 'single',
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
                defaultValue: { summary: 'single' },
            }
        },
        noDataFoundMsg: {
            description: 'No data found text message',
            defaultValue: '',
            control: 'text',
            table: {
                defaultValue: { summary: '' }
            }
        },
        supportSorting: {
            description: 'Whether column sorting is enabled',
            control: 'boolean'
        },
        showTopBar: {
            description: 'Whether the top bar is displayed',
            //control: 'boolean',
            
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
            description: 'List line height type',
            defaultValue: 'regular',
            options: [
                'compact',
                'regular'
            ],
            control: { type: 'radio' },
            table: {
                type: {
                    summary: `'compact' | 'regular'`,
                },
                defaultValue: { summary: 'regular' },
            }
        },
        zebraStripes: {
            description: 'Whether zebra stripes are displayed',
            defaultValue: false,
            control: 'boolean'
        },
        smartFilter: {
            description: 'Smart Filter\'s data and data view',
            defaultValue: {
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
                    ],
                    FrozenColumnsCount: 0,
                    MinimumColumnWidth: 0
                }
            },
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
                'addPadding',
                'title',
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
                'valueChange',
                'fieldClick',
                'breadCrumbItemClick'
            ],
        },
    }
   

} as Meta;

const Template: Story<GenericListComponent> = (args: GenericListComponent) => ({
    props: {
        ...args,
        fieldClick: action('fieldClick'),
        valueChange: action('valueChange'),
        breadCrumbItemClick: action('breadCrumbItemClick')
    }
});

export const Base = Template.bind({});
Base.args = {}