import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ShowIfBadgeComponent } from './show-if-badge.component';
import { PepShowIfBadgeModule } from './show-if-badge.module';
import { SBNgxCompositeHelperModule } from '../../../.storybook/ngx-helper-module';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [PepShowIfBadgeModule, SBNgxCompositeHelperModule],
        }),
    ],
    title: 'Components/show-if-badge',
    component: ShowIfBadgeComponent,
    argTypes: {
        showIf: {
            description: 'If the icon should be shown',
            defaultValue: true,
        },
        iconName: {
            description: 'Icon name',
            defaultValue: 'system_view',
        },
        backgroundColor: {
            description: 'Icon background color',
            defaultValue: 'hsl(0,0%,0%)',
        },
    },
    parameters: {
        controls: {
            include: ["showIf","backgroundColor"],
        },
        layout: 'centered',
    },
} as Meta;

const Template: Story<ShowIfBadgeComponent> = (args: ShowIfBadgeComponent) => ({
    props: {
        ...args,
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};
