import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranslateModule } from '@ngx-translate/core';
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { PepResetConfigurationFieldDirective } from './core/common/directives/reset-configuration-field.directive';
import { PepDIMXHelperService, PepCompositeLibUtilitiesService } from './core/common/services/index';

import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-lib/remote-loader';

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
        CommonModule,
        PepIconModule,
        PepRemoteLoaderModule,
    ],
    exports: [
        utilitiesList
        // TranslateModule
    ],
    providers: [
        PepDIMXHelperService,
        PepCompositeLibUtilitiesService
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
