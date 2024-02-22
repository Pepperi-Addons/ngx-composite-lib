import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { DataViewBuilderComponent } from './data-view-builder.component';
import { PepDataViewBuilderModule } from './data-view-builder.module';
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
            imports: [PepDataViewBuilderModule, SBNgxCompositeHelperModule],
        }),
    ],
    title: 'Components/data-view-builder',
    component: DataViewBuilderComponent,
    argTypes: {
        builderTitle: {
            description: 'Builder title',
            defaultValue: 'Builder Title',
        },
        builderTitleHint: {
            description: 'Builder title hint',
            defaultValue: 'Builder Title Hint',
        },
        showAddSeparator: {
            description: 'showAddSeparator',
            defaultValue: true,
        },
        itemKeyLabel: {
            defaultValue: 'Label key',
            description: 'itemKeyLabel',
        },
        itemTitleLabel: {
            description: 'Item title label',
            defaultValue: '',
        },
        availableFields: {
            description: 'Available fields',
            defaultValue: [
                {
                    title: 'First Field',
                    data: { key: 'random-key1', 'random-key1': 'value' },
                },
                {
                    title: 'Second Field',
                    data: { key: 'random-key2', 'random-key2': 'value' },
                },
                {
                    title: 'Third Field',
                    data: { key: 'random-key3', 'random-key3': 'value' },
                },
            ],
        },
        dataViewChange: {
            description: 'Emit event with data view changes object',
        },
        dataView: {
            description: 'Dataview object',
            defaultValue: { Type: 'Menu' },
        },
    },
    parameters: {
        controls: {
            include: [
                'builderTitle',
                'builderTitleHint',
                'showAddSeparator',
                'itemKeyLabel',
                'itemTitleLabel',
                'availableFields',
                'dataViewChange',
                'dataView',
            ],
        },
    },
} as Meta;

const Template: Story<DataViewBuilderComponent> = (
    args: DataViewBuilderComponent
) => ({
    props: {
        ...args,
        dataViewChange: action('dataViewChange'),
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};
