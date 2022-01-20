import { Meta, Story, moduleMetadata } from '@storybook/angular';
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
       // dataSource: {},
        inline: {
            description: 'Is inline?',
            defaultValue: true,
            control: 'boolean'
        },
        allowMultipleSelection: {
            description: 'Is multiple election allowed?',
            defaultValue: true,
            control: 'boolean'
        }
    }
} as Meta;

const Template: Story<GenericListComponent> = (args: GenericListComponent) => ({
    props: args,
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