import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { NgxLibHelperModule } from './common/ngx-helper.module';

import { PepNgxCompositeLibModule } from '@pepperi-addons/ngx-composite-lib';
import { PepColorSettingsModule } from '@pepperi-addons/ngx-composite-lib/color-settings';
import { PepShadowSettingsModule } from '@pepperi-addons/ngx-composite-lib/shadow-settings';
import { PepGroupButtonsSettingsModule } from '@pepperi-addons/ngx-composite-lib/group-buttons-settings';
import { PepFileStatusPanelModule } from '@pepperi-addons/ngx-composite-lib/file-status-panel';
import { PepGenericListModule } from '@pepperi-addons/ngx-composite-lib/generic-list';

import { ComponentsExampleComponent } from './components-example/components-example.component';
import { GenericListExampleComponent } from './generic-list-example/generic-list-example.component';

import {
    TranslateModule,
    TranslateLoader,
    TranslateService,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        ComponentsExampleComponent,
        GenericListExampleComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxLibHelperModule,
        PepNgxCompositeLibModule,
        PepColorSettingsModule,
        PepShadowSettingsModule,
        PepGroupButtonsSettingsModule,
        PepFileStatusPanelModule,
        PepGenericListModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(addonService, ['ngx-lib', 'ngx-composite-lib']),
                deps: [PepAddonService]
            }
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
