import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from './generic-list.component';
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
import { PepGenericListService } from './generic-list.service';

@NgModule({
    declarations: [
        GenericListComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepListModule,
        PepFormModule,
        PepMenuModule,
        PepPageLayoutModule,
        PepTopBarModule,
        PepSideBarModule,
        PepSearchModule,
        PepBreadCrumbsModule,
        PepSmartFiltersModule
    ],
    exports: [
        GenericListComponent        
    ],
    providers: [
        PepGenericListService
    ]
})
export class PepGenericListModule { }
