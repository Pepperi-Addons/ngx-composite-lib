import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { NgxLibHelperModule } from './common/ngx-helper.module';

// import { PepNgxCompositeLibModule } from '@pepperi-addons/ngx-composite-lib';
// import { PepBorderSettingsModule } from '@pepperi-addons/ngx-composite-lib/border-settings';
import { PepBorderSettingsModule } from 'projects/ngx-composite-lib/border-settings';
import { PepNgxCompositeLibModule } from 'projects/ngx-composite-lib/src';

import { ComponentsExampleComponent } from './components-example/components-example.component';

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

@NgModule({
    declarations: [
        AppComponent,
        ComponentsExampleComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxLibHelperModule,
        PepNgxCompositeLibModule,
        PepBorderSettingsModule,
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
