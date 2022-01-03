import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFile } from './file-status-panel.model';

@Component({
    selector: 'file-status-panel',
    templateUrl: './file-status-panel.component.html',
    styleUrls: ['./file-status-panel.component.scss']
})

export class FileStatusPanelComponent implements OnInit {
    
    @Input() title: string = '';
    @Input() filesList: Array<IFile> = [];
    
    constructor( public translate: TranslateService) {
       
    }
    ngOnInit(): void {
 
    }

    closeClick(event: any){

    }


}