import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepColorModule } from '@pepperi-addons/ngx-lib/color';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepSliderModule } from '@pepperi-addons/ngx-lib/slider';

import { ColorSettingsComponent } from './color-settings.component';

@NgModule({
    declarations: [
        ColorSettingsComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepCheckboxModule,
        PepColorModule,
        PepSliderModule
    ],
    exports: [ColorSettingsComponent],
})
export class PepColorSettingsModule { }
