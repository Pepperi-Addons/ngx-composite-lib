import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsManagerComponent } from './assets-manager.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepIconRegistry, pepIconTextAlignCenter, pepIconTextAlignLeft, pepIconTextAlignRight } from '@pepperi-addons/ngx-lib/icon';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';

const pepIcons = [
    pepIconTextAlignCenter, 
    pepIconTextAlignLeft, 
    pepIconTextAlignRight
]

@NgModule({
    declarations: [
        AssetsManagerComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepDialogModule
    ],
    exports: [AssetsManagerComponent]
})
export class PepAssetsManagerModule { 
    constructor(
        private pepIconRegistry: PepIconRegistry,
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}