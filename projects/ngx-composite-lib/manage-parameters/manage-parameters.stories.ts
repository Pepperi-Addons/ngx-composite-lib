import { Meta, Story, moduleMetadata,componentWrapperDecorator } from '@storybook/angular';
import { ManageParametersComponent } from './manage-parameters.component';
import { PepManageParametersModule } from './manage-parameters.module';
import { SBNgxCompositeHelperModule } from '../../../.storybook/ngx-helper-module';
import { action } from '@storybook/addon-actions';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [PepManageParametersModule, SBNgxCompositeHelperModule],
        }),
        componentWrapperDecorator(
            (story) => `<div style="height: 21vh">${story}</div>`
        ),
    ],
    title: 'Components/manage-parameters',
    component: ManageParametersComponent,
    argTypes: {
        showType: {
            description: 'Show type',
            defaultValue: false,
        },
        showAccessibility: {
            description: 'Show accessibility',
            defaultValue: false,
        },
        parametersColumns: {
            description: 'Parameters columns',
            defaultValue: [
                {
                    Key: 'Key',
                    Title: 'Key',
                    Type: 'TextHeader',
                    Width: 50,
                },
                {
                    Key: 'Description',
                    Title: 'Description',
                    Type: 'TextHeader',
                    Width: 50,
                },
                {
                    Key: 'Type',
                    Title: 'Type',
                    Type: 'TextHeader',
                    Width: 50,
                },
            ],
        },
        parameters: {
            description: 'parameters',
            defaultValue: [
                {
                    Key: 'Key1',
                    Type: 'String',
                    Description: 'Desc1',
                    DefaultValue: 'Default',
                },
                {
                    Key: 'Key2',
                    Type: 'String',
                    Description: 'Desc2',
                    DefaultValue: 'Default',
                },
            ],
        },
        parametersTitle: {
            description: 'Parameter Title',
            defaultValue: 'Parameter Title',
        },
        parametersChange: {
            description: 'Emit event for parameters change',
        },
    },
    parameters: {
        controls: {
            include: [
                'showType',
                'showAccessibility',
                'parametersColumns',
                'parameters',
                'parametersTitle',
                'parametersChange',
            ],
        },
    },
} as Meta;

const Template: Story<ManageParametersComponent> = (
    args: ManageParametersComponent
) => ({
    props: {
        ...args,
        parametersChange: action('parametersChange'),
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};

export const Story1 = Template.bind({});
Story1.storyName = 'Empty state';
Story1.args = {
    parametersColumns: [],
    parameters:[]

};
