import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { DraggableItemComponent } from './draggable-item.component';

@NgModule({
    declarations: [
        DraggableItemComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepButtonModule,
        DragDropModule
    ],
    exports: [DraggableItemComponent],
})
export class DraggableItemModule { }
