import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-lib/remote-loader';

import { FlowPickerButtonComponent } from './flow-picker-button.component';
import { FlowPickerService } from './flow-picker-button.service';

@NgModule({
    declarations: [
        FlowPickerButtonComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepButtonModule,
        PepRemoteLoaderModule
    ],
    providers: [FlowPickerService],
    exports: [FlowPickerButtonComponent],
})
export class PepFlowPickerButtonModule { }
