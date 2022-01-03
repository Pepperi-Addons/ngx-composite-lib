import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepFileService, PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { UploadDownloadProgressComponent } from './upload-download-progress.component';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepDialogModule } from '@pepperi-addons/ngx-lib/dialog';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';


@NgModule({
    declarations: [
        UploadDownloadProgressComponent
    ],
    imports: [
        CommonModule,
        PepTopBarModule,
        PepTextboxModule,
        PepButtonModule,
        PepDialogModule,
    ],
    exports: [UploadDownloadProgressComponent]
})
export class UploadDownloadProgressModule { }