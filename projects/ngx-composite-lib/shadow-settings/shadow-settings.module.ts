import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowSettingsComponent as ShadowSettingsComponent } from './shadow-settings.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepFieldTitleModule } from '@pepperi-addons/ngx-lib/field-title';
import { PepGroupButtonsModule } from '@pepperi-addons/ngx-lib/group-buttons';
import { PepSliderModule } from '@pepperi-addons/ngx-lib/slider';

@NgModule({
    declarations: [
        ShadowSettingsComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepCheckboxModule,
        PepFieldTitleModule,
        PepGroupButtonsModule,
        PepSliderModule
    ],
    exports: [ShadowSettingsComponent],
})
export class PepShadowSettingsModule { }
