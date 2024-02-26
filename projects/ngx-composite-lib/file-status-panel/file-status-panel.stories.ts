import {
    Meta,
    Story,
    moduleMetadata,
    componentWrapperDecorator,
} from '@storybook/angular';
import { FileStatusPanelComponent } from './file-status-panel.component';
import { PepFileStatusPanelModule } from './file-status-panel.module';
import { PepSnackBarData } from '@pepperi-addons/ngx-lib/snack-bar';
import { SBNgxCompositeHelperModule } from '../../../.storybook/ngx-helper-module';
import { action } from '@storybook/addon-actions';
import { APP_INITIALIZER } from '@angular/core';
import { PepSnackBarService } from '@pepperi-addons/ngx-lib/snack-bar';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { MatSnackBarRef } from '@angular/material/snack-bar';

let snackBarService: PepSnackBarService | null = null;
let snackBarRef: MatSnackBarRef<FileStatusPanelComponent> | null = null;

function initSnackBarService(sb: PepSnackBarService) {
    return () => (snackBarService = sb);
}

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: initSnackBarService,
                    multi: true,
                    deps: [PepSnackBarService],
                },
            ],
            imports: [
                PepButtonModule,
                PepFileStatusPanelModule,
                SBNgxCompositeHelperModule,
            ],
        }),
        componentWrapperDecorator(
            (story) => `<div style="width: 25vw">${story}</div>`
        ),
    ],
    title: 'Components/file-status-panel',
    argTypes: {
        closeClick: {
            description: 'Emit event for the close click event',
        },
        title: {
            description: 'snack-bar title',
        },
        content: {
            description: 'snack-bar content objects array',
        },
    },
    parameters: {
        layout: 'centered',
        controls: {
            include: ['closeClick', 'title', 'content'],
        },
    },
} as Meta;

function getSnackBarData(args: any) {
    const dataMsg = new PepSnackBarData({
        title: args.title,
        content: args.content,
    });

    return dataMsg;
}

function openFilePanel(event: any, args: any) {
    const config = (snackBarService as PepSnackBarService).getSnackBarConfig(
        {}
    );
    const msg = getSnackBarData(args);
    snackBarRef = (
        snackBarService as PepSnackBarService
    ).openSnackBarFromComponent(
        FileStatusPanelComponent,
        {
            title: msg.title,
            content: msg.content, //[{ key: 123, name: 'Name', status: 'Status' }],
        },
        config
    );

    snackBarRef.afterDismissed().subscribe((res) => {});
}

const Template: Story<FileStatusPanelComponent> = (
    args: FileStatusPanelComponent
) => ({
    props: {
        ...args,
        closeClick: action('closeClick'),
        onButtonClick: (event: any) => openFilePanel(event, args),
    },
    template: `
    <pep-button sizeType="md" value="Click me" (buttonClick)="onButtonClick($event)"></pep-button>
`,
});

export const Base: any = Template.bind({});
Base.storyName = 'Basic';
Base.args = {
    title: 'Here is the title',
    content: [{ key: 123, name: 'SalesOrder.txt', status: 'Loaded' }],
};
Base.parameters = {
    docs: {
        description: {
            component:
                '[Code Usage Example](https://github.com/search?q=org%3APepperi-Addons+filestatuspanel+repo%3APepperi-Addons%2Fassets_manager_client&type=code) <br /> [HTML Usage example](https://github.com/search?q=org%3APepperi-Addons%20pep-file-status-panel&type=code)',
        },
    },
};

export const Story1: any = Template.bind({});
Story1.storyName = 'With 5 status updates';
Story1.args = {
    title: 'Processing',
    content: [
        { key: 123, name: 'SalesOrder.txt', status: 'Already Loaded' },
        { key: 124, name: 'API_Items.csv', status: 'Done' },
        { key: 125, name: 'Related_Items_Collection.csv', status: 'Done' },
        { key: 126, name: 'Frog.jpg', status: 'Loaded' },
        { key: 127, name: 'Invoices.csv', status: 'Loaded' },
    ],
};

export const Story2: any = Template.bind({});
Story2.storyName = 'With 10 status updates';
Story2.args = {
    title: 'Processing',
    content: [
        { key: 123, name: 'SalesOrder.txt', status: 'Already Loaded' },
        { key: 124, name: 'API_Items.csv', status: 'Done' },
        { key: 125, name: 'Related_Items_Collection.csv', status: 'Done' },
        { key: 126, name: 'Frog.jpg', status: 'Loaded' },
        { key: 127, name: 'Invoices.csv', status: 'Loaded' },
        { key: 128, name: 'Flame_Thrower.jgp', status: 'Failed' },
        { key: 129, name: 'UDC_Collection_2.csv', status: 'Done' },
        { key: 130, name: 'Script_22.txt', status: 'Loaded' },
        { key: 131, name: 'Sales_Order_66.xml', status: 'In Progress' },
        { key: 132, name: 'YehudaKeisarLive.mp3', status: 'Done' },
    ],
};
