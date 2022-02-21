import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepIconModule } from '@pepperi-addons/ngx-lib/icon';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, '/assets/ngx-lib/i18n/', '.ngx-lib.json');
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
    ]
})
export class PepNgxHelperModule { }
