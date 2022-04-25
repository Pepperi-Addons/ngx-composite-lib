import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

import { PepAddonService, PepCustomizationService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepIconModule } from '@pepperi-addons/ngx-lib/icon';

import { allIcons } from '@pepperi-addons/ngx-lib/icon';
import {
    PepIconRegistry,
    IPepIconData,
    PepIconType
} from '@pepperi-addons/ngx-lib/icon';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, '/assets/ngx-lib/i18n/', '.ngx-lib.json');
}

export function registerAllIcons(pepperiIconRegistry: PepIconRegistry): any {
    const pepIcons: IPepIconData[] = [];
    if (allIcons) {
        for (const [key, value] of Object.entries(allIcons)) {
            pepIcons.push({ name: key as PepIconType, data: value});
        }
        
    }

    return () => pepperiIconRegistry.registerIcons(pepIcons);
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        PepNgxLibModule,
        PepIconModule,   
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: registerAllIcons,
            multi: true,
            deps: [PepIconRegistry]
        }
    ]
})
export class PepNgxHelperModule { 
    constructor(
        private translate: TranslateService,
        private customizationService: PepCustomizationService,
       // private addonService: PepAddonService,
    ) {
        this.customizationService.setThemeVariables();
       // this.addonService.setDefaultTranslateLang(translate);
    }
}
