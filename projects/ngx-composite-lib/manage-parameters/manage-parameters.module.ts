import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { ManageParametersComponent } from './manage-parameters.component';
import { ManageParameterComponent } from './manage-parameter/manage-parameter.component';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';
import { PepGenericListModule } from '@pepperi-addons/ngx-composite-lib/generic-list';
import { PepGenericFormModule } from '@pepperi-addons/ngx-composite-lib/generic-form';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';

@NgModule({
    declarations: [
        ManageParametersComponent, ManageParameterComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepDialogModule,
        PepButtonModule,
        PepGenericListModule,
        PepGenericFormModule
    ],
    exports: [ManageParametersComponent],
})
export class PepManageParametersModule { }
