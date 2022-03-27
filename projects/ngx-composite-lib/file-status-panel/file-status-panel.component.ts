import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileStatus } from './file-status-panel.model';

@Component({
    selector: 'pep-file-status-panel',
    templateUrl: './file-status-panel.component.html',
    styleUrls: ['./file-status-panel.component.scss']
})
export class FileStatusPanelComponent implements OnInit {
    @Input() title = '';
    @Input() filesList: Array<FileStatus> = [];
    
    @Output()
    closeClick: EventEmitter<void> = new EventEmitter<void>();
    
    constructor(public translate: TranslateService) {
       //
    }

    ngOnInit() {
        //
    }

    onCloseClicked(event: any): void {
        this.closeClick.emit();
    }


}