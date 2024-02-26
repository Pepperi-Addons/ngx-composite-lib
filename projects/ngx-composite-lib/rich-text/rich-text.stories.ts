import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { PepRichTextModule } from './rich-text.module';
import { RichTextComponent } from './rich-text.component';
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
            imports: [PepRichTextModule, SBNgxCompositeHelperModule],
        }),
    ],
    title: 'Components/rich-text',
    component: RichTextComponent,
    argTypes: {
        key: {
            description: 'Key',
        },
        value: {
            description: 'Value',
        },
        label: {
            description: 'Label value',
            defaultValue: 'Label',
        },
        mandatory: {
            defaultValue: false,
            description: 'If mandatory',
        },
        disabled: {
            defaultValue: false,
            description: 'If disabled',
        },
        readonly: {
            defaultValue: false,
            description: 'If readonly',
        },
        maxFieldCharacters: {
            defaultValue: 300,
            description: 'Max value length',
        },
        xAlignment: {
            description: 'Alignment: left, right, center',
            defaultValue: 'left',
        },
        sanitize: {
            defaultValue: true,
            description: 'Sanitize HTML',
        },
        rowSpan: {
            defaultValue: 1,
            description: 'Row span',
        },
        visible: {
            defaultValue: true,
            description: 'If visible',
        },
        isActive: {
            defaultValue: false,
            description: 'If component is active',
        },
        showTitle: {
            defaultValue: true,
            description: 'If title should be shown',
        },
        renderTitle: {
            defaultValue: true,
            description:
                'if title should be rendered (if not, no space taken on layout)',
        },
        renderEnlargeButton: {
            defaultValue: true,
            description: 'Render Enlarge Button',
        },
        layoutType: {
            description: 'Layout Type',
            defaultValue: 'form',
        },
        inlineMode: {
            defaultValue: true,
            description: 'If editor will be displayed as inline',
        },
        useAssetsForImages: {
            defaultValue: false,
            description: 'Use assests manager for images',
        },
        toolbarOptions: {
            description: 'Tool bar options',
        },
        valueChange: {
            description: 'Emit event for changed value',
        },
    },
    parameters: {
        controls: {
            include: [
                'key',
                'value',
                'label',
                'mandatory',
                'disabled',
                'readonly',
                'maxFieldCharacters',
                'xAlignment',
                'sanitize',
                'rowSpan',
                'visible',
                'isActive',
                'showTitle',
                'renderTitle',
                'renderEnlargeButton',
                'layoutType',
                'inlineMode',
                'useAssetsForImages',
                'toolbarOptions',
                'valueChange',
            ],
        },
    },
} as Meta;

const Template: Story<RichTextComponent> = (args: RichTextComponent) => ({
    props: {
        ...args,
        valueChange: action('valueChange'),
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};


export const Story1 = Template.bind({});
Story1.storyName = 'Inline false';
Story1.args = {
    inlineMode: false
};

export const Story2 = Template.bind({});
Story2.storyName = 'With content';
Story2.args = {
    value: 'This is the best rich text component ever',
};

export const Story3 = Template.bind({});
Story3.storyName = 'With content read-only';
Story3.args = {
    value: 'Again this is the best rich text component ever',
    readonly: true
};
