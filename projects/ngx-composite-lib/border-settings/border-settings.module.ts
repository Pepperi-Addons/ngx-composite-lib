import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderSettingsComponent } from './border-settings.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepColorModule } from '@pepperi-addons/ngx-lib/color';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepSliderModule } from '@pepperi-addons/ngx-lib/slider';

@NgModule({
    declarations: [
        BorderSettingsComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepCheckboxModule,
        PepColorModule,
        PepSliderModule
    ],
    exports: [BorderSettingsComponent],
})
export class PepBorderSettingsModule { }
