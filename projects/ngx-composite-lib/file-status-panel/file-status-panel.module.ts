import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileStatusPanelComponent } from './file-status-panel.component';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepIconModule, PepIconRegistry, pepIconArrowRightAlt } from '@pepperi-addons/ngx-lib/icon';
import { PepSnackBarModule } from '@pepperi-addons/ngx-lib/snack-bar';

const pepIcons = [
    pepIconArrowRightAlt,
]

@NgModule({
    declarations: [
        FileStatusPanelComponent
    ],
    imports: [
        CommonModule,
        PepTopBarModule,
        PepTextboxModule,
        PepButtonModule,
        PepIconModule,
        PepDialogModule,
        PepSnackBarModule
    ],
    exports: [FileStatusPanelComponent]
})

export class PepFileStatusPanelModule { 
    constructor(
        private pepIconRegistry: PepIconRegistry,
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}