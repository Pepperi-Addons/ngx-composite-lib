import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddonBlockLoaderComponent } from './addon-block-loader.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepIconRegistry, pepIconTextAlignCenter, pepIconTextAlignLeft, pepIconTextAlignRight } from '@pepperi-addons/ngx-lib/icon';

import { PepAddonLoaderModule } from '@pepperi-addons/ngx-remote-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';

const pepIcons = [
    pepIconTextAlignCenter, 
    pepIconTextAlignLeft, 
    pepIconTextAlignRight
]

@NgModule({
    declarations: [
        AddonBlockLoaderComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepAddonLoaderModule,
        PepDialogModule,
        MatDialogModule
    ],
    exports: [AddonBlockLoaderComponent]
})
export class PepAddonBlockLoaderModule { 
    constructor(
        private pepIconRegistry: PepIconRegistry,
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}