import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatIconModule } from '@angular/material/icon';

import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepDraggableItemsModule } from '@pepperi-addons/ngx-lib/draggable-items';
import { PepIconRegistry, PepIconModule, pepIconSystemClose, pepIconArrowDownAlt, pepIconSystemBin, pepIconNumberPlus } from '@pepperi-addons/ngx-lib/icon';

import { DataViewBuilderComponent } from './data-view-builder.component';

const pepIcons = [
    pepIconSystemClose,
    pepIconArrowDownAlt,
    pepIconSystemBin,
    pepIconNumberPlus
];

@NgModule({
    declarations: [
        DataViewBuilderComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
        MatIconModule,
        PepNgxLibModule,
        PepButtonModule,
        PepDialogModule,
        PepIconModule,
        PepMenuModule,
        PepPageLayoutModule,
        PepTextboxModule,
        PepTopBarModule,
        PepDraggableItemsModule,
    ],
    exports: [DataViewBuilderComponent],
})
export class PepDataViewBuilderModule {
    constructor(
        private pepIconRegistry: PepIconRegistry,
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}
