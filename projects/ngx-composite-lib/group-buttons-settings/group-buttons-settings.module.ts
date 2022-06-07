import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupButtonsSettingsComponent } from './group-buttons-settings.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepFieldTitleModule } from '@pepperi-addons/ngx-lib/field-title';
import { PepGroupButtonsModule } from '@pepperi-addons/ngx-lib/group-buttons';
import { PepIconModule, PepIconRegistry, pepIconTextAlignCenter, pepIconTextAlignLeft, pepIconTextAlignRight } from '@pepperi-addons/ngx-lib/icon';

const pepIcons = [
    pepIconTextAlignCenter, 
    pepIconTextAlignLeft, 
    pepIconTextAlignRight
]

@NgModule({
    declarations: [
        GroupButtonsSettingsComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepFieldTitleModule,
        PepGroupButtonsModule,
        PepIconModule
    ],
    exports: [GroupButtonsSettingsComponent]
})
export class PepGroupButtonsSettingsModule { 
    constructor(
        private pepIconRegistry: PepIconRegistry,
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}
