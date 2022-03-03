import { NgModule } from '@angular/core';
// import { TranslateModule } from '@ngx-translate/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { PepResetConfigurationFieldDirective } from './core/common/directives/reset-configuration-field.directive';

import {
    PepIconModule,
    PepIconRegistry,
    pepIconDeviceResponsive,
} from '@pepperi-addons/ngx-lib/icon';
    

const utilitiesList = [
    PepResetConfigurationFieldDirective
];

@NgModule({
    declarations: [
        utilitiesList
    ],
    imports: [
        // CommonModule, HttpClientModule, ReactiveFormsModule
        PepIconModule,
    ],
    exports: [
        utilitiesList
        // TranslateModule
    ]
})
export class PepNgxCompositeLibModule {
    constructor(
        private pepIconRegistry: PepIconRegistry
    ) {
        this.pepIconRegistry.registerIcons([
            pepIconDeviceResponsive
        ]);
    }
}
