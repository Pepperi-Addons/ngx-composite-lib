import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { PepGenericFormModule } from './generic-form.module';
import { GenericFormComponent } from './generic-form.component';
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
            imports: [
                PepGenericFormModule,
                PepNgxHelperModule
            ]
        })
    ], 
    title: 'Components/GenericForm',
    component: GenericFormComponent,
    /*argTypes: {
        dataSource: {
            description: 'This is a data source',
           
        },
        dataView: {
            description: 'This is a data view',
        },
        addPadding: {
            description: 'Add container padding?',
            control: 'boolean'
        },
        inline: {
            description: 'Is inline?',
            control: 'boolean'
        },
        showTopBar: {
            description: 'Show Top Bar?',           
            control: 'boolean'
        },
        isLocked: {
            description: 'is Locked'
        }
    },
    parameters: {
        controls: {
            include: [
                'dataSource',
                'dataView',
                'isLocked',
                'addPadding',
                'inline',
                'showTopBar',
                'valueChange',
                'fieldClick',
                'formValidationChange'
                
            ],
        },
    } */
} as Meta;

const Template: Story<GenericFormComponent> = (args: GenericFormComponent) => ({
    props: args,
    /*props: {
        fieldClick: action('fieldClick'),
        valueChange: action('valueChange'),
        breadCrumbItemClick: action('breadCrumbItemClick')
    } */
});

export const Base = Template.bind({});
//Base.args = {}