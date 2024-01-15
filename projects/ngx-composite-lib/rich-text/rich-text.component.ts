import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';
import { RichTextService } from './rich-text.service';
import { DEFAULT_HORIZONTAL_ALIGNMENT, PepHorizontalAlignment, PepLayoutType } from '@pepperi-addons/ngx-lib';
import { FormGroup } from '@angular/forms';
import { IPepRichHtmlTextareaToolbarOptions } from '@pepperi-addons/ngx-lib/rich-html-textarea';
import Quill from 'quill';

@Component({
    selector: 'pep-rich-text',
    templateUrl: './rich-text.component.html',
    styleUrls: ['./rich-text.component.scss']
})
export class RichTextComponent implements OnInit {

    @Input() key = '';
    @Input() value = '';
    @Input() label = '';
    @Input() mandatory = false;
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() maxFieldCharacters = 300;
    @Input() xAlignment: PepHorizontalAlignment = DEFAULT_HORIZONTAL_ALIGNMENT;
    @Input() sanitize = true;
    @Input() rowSpan = 1;
    @Input() visible = true;
    @Input() isActive = false;
    @Input() showTitle = true;
    @Input() renderTitle = true;
    @Input() renderEnlargeButton = true;
    @Input() layoutType: PepLayoutType = 'form';
    @Input() inlineMode = false;
    @Input() useAssetsForImages = true;
    
    private quillEditor: any;
    protected _toolbarOptions: IPepRichHtmlTextareaToolbarOptions = this.getDefaultToolbarOptions();
    @Input()
    get toolbarOptions(): IPepRichHtmlTextareaToolbarOptions {
        return this._toolbarOptions;
    }
    set toolbarOptions(options: IPepRichHtmlTextareaToolbarOptions) {
        if (options) {
            this._toolbarOptions = options;
        }
    }

    @Output()
        assetChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private viewContainerRef: ViewContainerRef,
        private addonBlockLoaderService: PepAddonBlockLoaderService, 
        private RichTextService: RichTextService) { 
            this.toolbarOptions = this.getDefaultToolbarOptions();
        }

    ngOnInit() {
        // Do nothing.
        
    }


    getDefaultToolbarOptions(): IPepRichHtmlTextareaToolbarOptions {
        return {
            font: false,
            size: false,
            header: true,
            bold: true,
            italic: true,
            underline: true,
            strike: false,
            link: true,
            image: { useAssetsABI : true },
            ordered: true,
            bullet: true,
            color: true,
            background: false,
            align: true
        };
    }

    onEditorOpen(editor: any){
        this.quillEditor = editor;

        if(this.useAssetsForImages){
            const imageButton = document.querySelector('.ql-image');
            const newButton = document.querySelector('.quill-editor-image-btn')?.cloneNode(true);
            
            if(imageButton && newButton){
                newButton.addEventListener("click", () => { this.openAssetsPickerDialog();});
                imageButton.parentNode?.appendChild(newButton);
                imageButton.setAttribute('style','display:none');    
            }
        }
    }

    openAssetsPickerDialog() {
        const dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
            container: this.viewContainerRef,
            name: 'AssetPicker',
            hostObject: {
                selectionType: 'single',
                allowedAssetsTypes: 'images',
                inDialog: true
            },
            size: 'full-screen',
            hostEventsCallback: async (event) => {
                if (event?.action === 'on-save') {
                    const range = this.quillEditor.getSelection() || { index: 0, length: 0};
                    if(event.url){
                        this.quillEditor.insertEmbed(range.index, 'image', event.url);
                        this.assetChanged.emit(event.url);
                    }
                    dialogRef?.close();
                } else if (event.action === 'on-cancel') {
                    dialogRef?.close();
                }
            }
        });
    }
}
