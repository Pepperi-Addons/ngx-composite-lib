import { Meta, Story, moduleMetadata,componentWrapperDecorator } from '@storybook/angular';
import { PepGroupButtonsSettingsModule } from './group-buttons-settings.module';
import { GroupButtonsSettingsComponent } from './group-buttons-settings.component';
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
            imports: [
                PepGroupButtonsSettingsModule,
                SBNgxCompositeHelperModule,
            ],
        }),
        componentWrapperDecorator(
            (story) => `<div style="width: 30vw">${story}</div>`
        ),
    ],
    title: 'Components/group-buttons-settings',
    component: GroupButtonsSettingsComponent,
    argTypes: {
        header: {
            description: 'Group Header',
            defaultValue: 'Header',
        },
        subHeader: {
            description: 'Group SubHeader',
            defaultValue: 'Sub-Header',
        },
        groupType: {
            description: 'Group Type',
            defaultValue: 'sizes',
        },
        useNone: {
            description: 'Use None option on group buttons',
            defaultValue: false,
        },
        dir: {
            description: 'Text direction (ltr/rtl)',
            defaultValue: 'ltr',
        },
        btnKey: {
            description: 'Buttons keys',
            defaultValue: 'xs'
        },
        btnkeyChange: {
            description: 'Buttons key change event',
            action: 'btnkeyChange',
        },
        btnsArray: {
            description: 'Custom buttons array',
            defaultValue: [
                { key: 'firstButton', value: 'First' },
                { key: 'secondButton', value: 'Second' },
            ],
        },
        excludeKeys: {
            description: 'excludeKeys',
            defaultValue: [],
        },
    },
    parameters: {
        layout:'centered',
        controls: {
            include: [
                'header',
                'subHeader',
                'groupType',
                'useNone',
                'dir',
                'btnKey',
                'btnkeyChange',
                'btnsArray',
                'excludeKeys',
            ],
        },
    },
} as Meta;

const Template: Story<GroupButtonsSettingsComponent> = (
    args: GroupButtonsSettingsComponent
) => ({
    props: {
        ...args,
        btnkeyChange: action('btnkeyChange'), 
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {
    btnKey:'xs'
};

export const Story1 = Template.bind({});
Story1.storyName = 'Without preset value';
Story1.args = {
    btnKey:'none'
};
