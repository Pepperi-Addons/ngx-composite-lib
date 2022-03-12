import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MaterialModule } from '@pepperi-addons/ngx-lib/';
//import { ReactiveFormsModule } from '@angular/forms';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepFormModule } from '@pepperi-addons/ngx-lib/form';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
//import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
//import { PepDateModule } from '@pepperi-addons/ngx-lib/date';

import { PepGenericFormService } from './generic-form.service';

import { GenericFormComponent } from './generic-form.component';

@NgModule({
    declarations: [
        GenericFormComponent
    ],
    imports: [
        CommonModule, 

       // MatFormFieldModule,
     //   ReactiveFormsModule,

        PepNgxLibModule,
       // PepListModule,
        PepFormModule,
        PepMenuModule,
        PepPageLayoutModule,
        PepTopBarModule,
     //   PepTextboxModule,
      //  PepDateModule
     //   PepSearchModule,
      //  PepBreadCrumbsModule
    ],
    exports: [
        GenericFormComponent
    ],
    providers: [
        PepGenericFormService
    ]
})
export class PepGenericFormModule { }
