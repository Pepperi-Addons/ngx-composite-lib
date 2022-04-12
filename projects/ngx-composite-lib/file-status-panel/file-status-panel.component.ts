import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { PepSnackBarData } from '@pepperi-addons/ngx-lib/snack-bar';
import { FileStatus } from './file-status-panel.model';

@Component({
    selector: 'pep-file-status-panel',
    templateUrl: './file-status-panel.component.html',
    styleUrls: ['./file-status-panel.component.scss']
})
export class FileStatusPanelComponent implements OnInit {
    // @Input() title = '';
    // @Input() filesList: Array<FileStatus> = [];
    
    @Output()
    closeClick: EventEmitter<void> = new EventEmitter<void>();
    
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: PepSnackBarData,
        public snackBarRef: MatSnackBarRef<FileStatusPanelComponent>
    ) {
       //
    }

    ngOnInit() {
        //
    }

    onCloseClicked(event: any): void {
        this.closeClick.emit();
    }


}