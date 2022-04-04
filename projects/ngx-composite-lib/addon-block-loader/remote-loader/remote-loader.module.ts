import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteLoaderComponent } from './remote-loader.component';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';

import { PepAddonLoaderModule } from '@pepperi-addons/ngx-remote-loader';

import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        RemoteLoaderComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        MatDialogModule,
        PepDialogModule,
        PepAddonLoaderModule
    ],
    exports: [RemoteLoaderComponent],
    providers: [
        
    ]
})
export class RemoteLoaderModule { 
    constructor(
       
    ) {
        
    }
}