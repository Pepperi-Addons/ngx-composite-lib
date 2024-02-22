import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ShadowSettingsComponent } from './shadow-settings.component';
import { PepShadowSettingsModule } from './shadow-settings.module';
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
            imports: [PepShadowSettingsModule, SBNgxCompositeHelperModule],
        }),
    ],
    title: 'Components/shadow-settings',
    component: ShadowSettingsComponent,
    argTypes: {
        shadow: {
            description: 'Shadow properties object',
            defaultValue: { use: true, size: 'md', intensity: 'regular' },
        },
        shadowChange: {
            description: 'shadowChange emit event',
        },
    },
    parameters: {
        controls: {
            include: ['shadow', 'shadowChange'],
        },
    },
} as Meta;

const Template: Story<ShadowSettingsComponent> = (
    args: ShadowSettingsComponent
) => ({
    props: {
        ...args,
        shadowChange: action('shadowChange'),
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};
