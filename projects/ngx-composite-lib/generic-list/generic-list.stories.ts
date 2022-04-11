import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { PepGenericListModule } from './generic-list.module';
import { GenericListComponent } from './generic-list.component';
import { PepNgxHelperModule } from '../src/core/common/modules/ngx-helper-module';
import { PepListSelectionType } from '@pepperi-addons/ngx-lib/list';
import { PepBreadCrumbItem } from '@pepperi-addons/ngx-lib/bread-crumbs';
import { IPepGenericListPager } from './generic-list.model';
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
            description: 'This is a data source',
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
            }

        },
        actions: {},
        breadCrumbsItems: {
            description: 'This is a list of Bread Crumbs items',
            defaultValue: [],
            control: 'array',
            table: {
                type: {
                    summary: 'Array<PepBreadCrumbItem>'
                },
                defaultValue: {
                    summary: null
                }
            }
        },
        uuidMapping: {
            description: 'This is the name of the table column used for UUID Mapping ',
            defaultValue: 'key',
            control: 'text'
        },
        disabled: {
            description: 'is the form locked for edit?',
            defaultValue: false,
            control: 'boolean',
        },
        addPadding: {
            description: 'Add container padding?',
            defaultValue: false,
            control: 'boolean'
        },
        title: {
            description: 'This is the title of',
            control: 'text'
        },
        inline: {
            description: 'Is inline?',
            defaultValue: false,
            control: 'boolean'
        },
        showSearch: {
            description: 'Show search box?',
            defaultValue: false,
            control: 'boolean'
        },
        selectionType: {
            description: 'This is the table selection type',
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
            description: 'This is the displayed message in case no data was supplied',
            defaultValue: '',
            control: 'text',
            table: {
                defaultValue: { summary: '' }
            }
        },
        supportSorting: {
            description: 'Support column sorting?',
            control: 'boolean'
        },
        showTopBar: {
            description: 'Show Top Bar?',
            control: 'boolean'
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
            description: 'line height type',
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
            description: 'show zebra stripes?',
            defaultValue: false,
            control: 'boolean'
        }
    },
    parameters: {
        controls: {
            include: [
                'dataSource',
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
                'zebraStripes'
            ],
        },
    }
    /*
    argTypes: {
        dataSource: {
            description: 'This is data source object',
            defaultValue: {
                init: async (params: any) => {
                    return {
                        dataView: {
                            Type: 'Grid'
                        },
                        totalCount: 0,
                        items: []
                    };
                }
            },
            control: 'object',
            table: {
                type: {
                    summary: 'IPepGenericListDataSource'
                }
            }
        },
        actions: {
            description: 'This is the legacy query',
            defaultValue: {
                get: async (data: any) => {
                    return []
                }
            },
            control: 'object',
            table: {
                type: {
                    summary: 'IPepGenericListActions'
                }
            }
        },
        uuidMapping: {
            description: 'This is the name of the table column used for UUID Mapping ',
            defaultValue: 'key',
            control: 'text'
        },
        addPadding: {
            description: 'Add container padding?',
            defaultValue: false,
            control: 'boolean'
        },
        title: {
            description: 'This is the title of',         
            control: 'text',            
            table: {
                defaultValue: ''
            }
        },
        inline: {
            description: 'Is inline?',
            defaultValue: false,
            control: 'boolean'
        },
        showSearch: {
            description: 'Show search box?',
            defaultValue: false,
            control: 'boolean'
        },
        selectionType: {
            description: 'This is the table selection type',
            defaultValue: 'multi',
            options: [
                'multi',
                'single',
                'none'
            ],
            control: { type: 'radio' }, table: {
                type: {
                    summary: `'multi' | 'single' | 'none'`,
                },
                defaultValue: { summary: 'multi' },
            }
        },
        noDataFoundMsg: {
            description: 'This is the displayed message in case no data was supplied',
            defaultValue: '',
            control: 'text'           
        },
        supportSorting: {
            description: 'Support column sorting?',
            defaultValue: false,
            control: 'boolean'
        },
        showTopBar: {
            description: 'Show Top Bar?',
            defaultValue: false,
            control: 'boolean'
        },
        breadCrumbsItems: {
            description: 'This is a list of Bread Crumbs items',
            defaultValue: [],
            control: 'array',
            table: {
                type: {
                    summary: 'Array<PepBreadCrumbItem>'
                },
                defaultValue: {
                    summary: null
                }
            }
        },
        pager: {
            description: 'This is the legacy query',
            defaultValue: {
                type: 'scroll',
                size: 50,
                index: 0
            },
            control: {
                type: 'object',
            },
            table: {
                type: {
                    summary: 'IPepGenericListPager'
                },
                defaultValue: {
                    summary: {
                        type: 'scroll',
                        size: 50,
                        index: 0
                    }
                }

            }
        }
    },
    parameters: {
        controls: {
            include: [
                'dataSource',
                'actions',
                'uuidMapping',
                'addPadding',
                'title',
                'inline',
                'showSearch',
                'selectionType',
                'noDataFoundMsg',
                'supportSorting',
                'showTopBar',
                'breadCrumbsItems',
                'pager',
                'fieldClick',
                'valueChange',
                'breadCrumbItemClick'
            ],
        },
    }  */

} as Meta;

const Template: Story<GenericListComponent> = (args: GenericListComponent) => ({
    props: args,
    /*props: {
        fieldClick: action('fieldClick'),
        valueChange: action('valueChange'),
        breadCrumbItemClick: action('breadCrumbItemClick')
    } */
});

export const Base = Template.bind({});
Base.args = {}