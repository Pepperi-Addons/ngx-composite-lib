import {
    Meta,
    Story,
    moduleMetadata,
    componentWrapperDecorator,
} from '@storybook/angular';
import { ColorSettingsComponent } from './color-settings.component';
import { PepColorSettingsModule } from './color-settings.module';
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
            imports: [PepColorSettingsModule, SBNgxCompositeHelperModule],
        }),
    ],
    title: 'Pages-Components/color-settings',
    component: ColorSettingsComponent,
    argTypes: {
        title: {
            description: 'title',
            defaultValue: 'Picker',
        },
        checkAAComplient: {
            description: 'Check AAComplient checkbox',
            defaultValue: true,
        },
        showAAComplient: {
            description: 'Show AAComplient checkbox',
            defaultValue: true,
        },
        color: {
            description:
                'Color - Can include RGB,HSL,HEX ; Can`t include: Named Css Color (black,red etc..),Should not include Alpha',
            defaultValue: { use: false, value: 'hsl(0, 0%, 57%)', opacity: 50 },
        },
        colorChange: {
            description: 'Event emitter for color settings value change',
        },
    },
    parameters: {
        layout: 'centered',
        controls: {
            include: [
                'title',
                'checkAAComplient',
                'showAAComplient',
                'color',
                'colorChange',
            ],
        },
    },
} as Meta;

const Template: Story<ColorSettingsComponent> = (
    args: ColorSettingsComponent
) => ({
    props: {
        ...args,
        colorChange: action('colorChange'),
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};

export const Story1 = Template.bind({});
Story1.storyName = 'AA Checkbox is unchecked';
Story1.args = {
    checkAAComplient: false,
};

export const Story2 = Template.bind({});
Story2.storyName = 'Without AA checkbox';
Story2.args = {
    showAAComplient: false,
};
