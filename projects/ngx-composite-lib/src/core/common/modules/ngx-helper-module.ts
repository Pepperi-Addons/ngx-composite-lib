import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

import { PepCustomizationService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { of } from 'rxjs';

const staticTraslationLoader: TranslateLoader = {
    getTranslation(lang: string) {
        return of(require('@pepperi-addons/ngx-lib/src/assets/i18n/en.ngx-lib.json'));
    }
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        PepNgxLibModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useValue: staticTraslationLoader
            },
        })
    ]
})
// This module is helper module for storybook
export class PepNgxHelperModule {
    constructor(
        private translate: TranslateService,
        private customizationService: PepCustomizationService
    ) {
        this.customizationService.setThemeVariables();
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
