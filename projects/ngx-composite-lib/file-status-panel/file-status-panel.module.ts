import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepFileService, PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { FileStatusPanelComponent } from './file-status-panel.component';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';


@NgModule({
    declarations: [
        FileStatusPanelComponent
    ],
    imports: [
        CommonModule,
        PepTopBarModule,
        PepTextboxModule,
        PepButtonModule,
        PepDialogModule,
    ],
    exports: [FileStatusPanelComponent]
})

export class FileStatusPanelModule { 
    constructor() { }
}