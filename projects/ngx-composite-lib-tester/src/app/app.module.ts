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


import { PepGenericListModule } from '@pepperi-addons/ngx-composite-lib/generic-list';

import { ComponentsExampleComponent } from './components-example/components-example.component';
import { GenericListExampleComponent } from './generic-list-example/generic-list-example.component';

export function createTranslateLoader(addonService: PepAddonService) {
    const ngxLibTranslationResource = addonService.getNgxLibTranslationResource();
    const addonTranslationResource = addonService.getAddonTranslationResource();
    const ngxCompositeLibAssetsFolder = 'assets/ngx-composite-lib/i18n/';
    
    return addonService.translateService.createMultiTranslateLoader([
        ngxLibTranslationResource,
        addonTranslationResource,
        {
            prefix: `/${ngxCompositeLibAssetsFolder}`,
            suffix: '.ngx-composite-lib.json',
        }
    ]);
}

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

        PepGenericListModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
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
