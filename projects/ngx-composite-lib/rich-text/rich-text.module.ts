import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepRichHtmlTextareaModule } from '@pepperi-addons/ngx-lib/rich-html-textarea';
import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-lib/remote-loader';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { RichTextComponent } from './rich-text.component';
import { RichTextService } from './rich-text.service';
import { 
    PepIconModule,
    PepIconRegistry,
    pepIconSystemImage
} from '@pepperi-addons/ngx-lib/icon';

const pepIcons = [
    pepIconSystemImage
];

@NgModule({
    declarations: [
        RichTextComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepIconModule,
        PepButtonModule,
        PepRichHtmlTextareaModule,
        PepRemoteLoaderModule
    ],
    providers: [RichTextService],
    exports: [RichTextComponent],
})
export class PepRichTextModule {
    constructor(private pepIconRegistry: PepIconRegistry) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}
