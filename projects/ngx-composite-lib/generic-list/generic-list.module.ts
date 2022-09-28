import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { GenericListComponent } from './generic-list.component';
import { MatIconModule } from '@angular/material/icon';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepListModule } from '@pepperi-addons/ngx-lib/list';
import { PepFormModule } from '@pepperi-addons/ngx-lib/form';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepSideBarModule } from '@pepperi-addons/ngx-lib/side-bar';
import { PepSearchModule } from '@pepperi-addons/ngx-lib/search';
import { PepBreadCrumbsModule } from '@pepperi-addons/ngx-lib/bread-crumbs';
import { PepSmartFiltersModule } from '@pepperi-addons/ngx-lib/smart-filters';
import { PepIconModule, PepIconRegistry, pepIconLeafRound, pepIconLeafSkiny, pepIconSystemView } from '@pepperi-addons/ngx-lib/icon';
import { PepGenericListService } from './generic-list.service';
import { firstValueFrom } from 'rxjs';

const pepIcons = [
    pepIconLeafRound,
    pepIconLeafSkiny, pepIconSystemView
]

export function appInitializerFactory(translate: TranslateService) {
    return () => {
        translate.setDefaultLang('en');
        return firstValueFrom(translate.use('en'));
    }
}

@NgModule({
    declarations: [
        GenericListComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        MatIconModule,
        PepListModule,
        PepFormModule,
        PepMenuModule,
        PepPageLayoutModule,
        PepTopBarModule,
        PepSideBarModule,
        PepSearchModule,
        PepBreadCrumbsModule,
        PepIconModule,
        PepSmartFiltersModule
    ],
    exports: [
        GenericListComponent        
    ],
    providers: [
        PepGenericListService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService],
            multi: true
        }
    ]
})
export class PepGenericListModule { 
    constructor(
        private pepIconRegistry: PepIconRegistry
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}
