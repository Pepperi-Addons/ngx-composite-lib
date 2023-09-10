import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepFieldTitleModule } from '@pepperi-addons/ngx-lib/field-title';
import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-lib/remote-loader';

import { IconPickerComponent } from './icon-picker.component';
import { FlowPickerService } from './icon-picker.service';

@NgModule({
    declarations: [
        IconPickerComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepButtonModule,
        PepFieldTitleModule,
        PepRemoteLoaderModule
    ],
    providers: [FlowPickerService],
    exports: [IconPickerComponent],
})
export class PepIconPickerModule { }
