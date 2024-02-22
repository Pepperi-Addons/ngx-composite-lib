import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { FileStatusPanelComponent } from './file-status-panel.component';
import { PepFileStatusPanelModule } from './file-status-panel.module';
import { SBNgxCompositeHelperModule } from '../../../.storybook/ngx-helper-module';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { action } from '@storybook/addon-actions';

// async function populatePanel() {
//  const fileStatusPanelRef = MatSnackBarRef<FileStatusPanelComponent>;
//  fileStatusPanelRef.instance.data
// }

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [PepFileStatusPanelModule, SBNgxCompositeHelperModule],
        }),
    ],
    title: 'Components/file-status-panel',
    component: FileStatusPanelComponent,
    argTypes: {
        closeClick: {
            description: 'Emit event for the close click event',
        },
    },
    parameters: {
        controls: {
            include: ['closeClick'],
        },
    },
} as Meta;

const Template: Story<FileStatusPanelComponent> = (
    args: FileStatusPanelComponent
) => ({
    props: {
        ...args,
        closeClick: action('closeClick'),
    },
});

export const Base = Template.bind({});
Base.storyName = 'Basic';
Base.args = {};
