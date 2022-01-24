import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { DIMXComponent } from './dimx.component';
import { PepIconRegistry, pepIconSystemDoc } from '@pepperi-addons/ngx-lib/icon';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepIconModule } from '@pepperi-addons/ngx-lib/icon';
import { PepFileStatusPanelModule } from '@pepperi-addons/ngx-composite-lib/file-status-panel';

const pepIcons = [
    pepIconSystemDoc,
]

@NgModule({
    declarations: [
        DIMXComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepButtonModule,
        PepIconModule,
        PepFileStatusPanelModule,
    ],
    exports: [DIMXComponent]
})
export class PepDIMXModule { 
    constructor(
        private pepIconRegistry: PepIconRegistry,
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }


}
