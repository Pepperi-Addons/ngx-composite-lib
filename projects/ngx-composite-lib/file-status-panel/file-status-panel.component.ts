import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFile } from './file-status-panel.model';

@Component({
    selector: 'pep-file-status-panel',
    templateUrl: './file-status-panel.component.html',
    styleUrls: ['./file-status-panel.component.scss']
})

export class FileStatusPanelComponent implements OnInit {
    
    @Input() title = '';
    @Input() filesList: Array<IFile> = [];
    
    constructor( public translate: TranslateService) {
       //
    }

    ngOnInit() {
        //
    }

    closeClick(event: any): void {
        //
    }


}