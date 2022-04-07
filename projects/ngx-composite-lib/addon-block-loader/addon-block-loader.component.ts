import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { AddonBlockLoaderService } from './addon-block-loader.service';
import { addonBlockType } from './addon-block-loader.model';

@Component({
    selector: 'pep-addon-block-loader',
    templateUrl: './addon-block-loader.component.html',
    styleUrls: ['./addon-block-loader.component.scss']
})
export class AddonBlockLoaderComponent implements OnInit {
    @ViewChild('dialogTemplate', { static: true, read: TemplateRef }) dialogTemplate!: TemplateRef<any>;
    
    private _blockType: addonBlockType = '';
    @Input() 
    set blockType(value: addonBlockType) {
        this._blockType = value;
        this.addonBlockLoaderService.getRemoteLoaderOptions(value).then(options => {
            this.remotePathOptions = options;
        });
    }
    get blockType(): addonBlockType {
        return this._blockType;
    }

    @Input() hostObject = null;
    @Input() inDialog: boolean = false;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @Output() blockLoad: EventEmitter<void> = new EventEmitter<void>();
    
    remotePathOptions!: PepRemoteLoaderOptions;
    
    constructor(private addonBlockLoaderService: AddonBlockLoaderService) {
        //
    }
    
    ngOnInit() {
        //
    }

    onBlockLoad() {
        this.blockLoad.emit();
    }

    onHostEvents(event: any) {
        this.hostEvents.emit(event);
    }
}