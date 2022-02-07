import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { PepGenericListModule } from './generic-list.module';
import { GenericListComponent } from './generic-list.component';
import { PepNgxHelperModule } from '../src/core/common/modules/ngx-helper-module';
//import { SBNgxHelperModule } from '@storybook-settings/typings/';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [PepGenericListModule, PepNgxHelperModule]
        })
    ],
    title: 'Components/GenericList',
    component: GenericListComponent,
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
                },
                update: async (params: any) => {
                    return []
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
        addPadding: {
            description: 'Add container padding?',
            defaultValue: false,
            control: 'boolean'
        },
        title: {
            name: 'title',
            type: { name: 'string', required: false },
            description: 'demo description',
            table: {
                type: { summary: 'string' },
            },
            control: {
                type: 'text'
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
        allowSelection: {
            description: 'Allow selection',
            defaultValue: true,
            control: 'boolean'
        },
        noDataFoundMsg: {
            description: 'This is the displayed message in case no data was supplied',
            control: 'text',
            table: {
                defaultValue: { summary: '' },
            }
        },
        allowMultipleSelection: {
            description: 'Is multiple selection allowed?',
            defaultValue: false,
            control: 'boolean'
        },
        firstFieldAsLink: {
            description: 'Is first field in grid a link?',
            defaultValue: false,
            control: 'boolean'
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
            description: 'Array of Bread Crumbs items',
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
            control: 'object',
            table: {
                type: {
                    summary: 'IPepGenericListPager'
                }
            }
        }
    },
    parameters: {
        controls: {
            include: [
                'data',
                'actions',
                'addPadding',
                'title',
                'inline',
                'showSearch',
                'allowSelection',
                'noDataFoundMsg',
                'allowMultipleSelection',
                'firstFieldAsLink',
                'supportSorting',
                'showTopBar',
                'breadCrumbsItems',
                'pager',

                'fieldClick',
                'valueChange',
                'breadCrumbItemClick'
            ],
        },
    }

} as Meta;

const Template: Story<GenericListComponent> = (args: GenericListComponent) => ({
    props: {
        fieldClick: action('fieldClick'),
        valueChange: action('valueChange'),
        breadCrumbItemClick: action('breadCrumbItemClick')
    }
    //props: args,
    /*props: {
        queryChange: action('queryChange'),
        formValidationChange: action('formValidationChange'),
    }, 
    template: `
    <pep-generic-list>       
    </pep-generic-list>   
    `,*/
});

export const Base = Template.bind({});
Base.args = {

}