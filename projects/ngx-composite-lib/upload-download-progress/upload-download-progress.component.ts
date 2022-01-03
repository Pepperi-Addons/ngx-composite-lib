import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { assetProcess } from './upload-download-progress.model';

@Component({
    selector: 'upload-download-progress',
    templateUrl: './upload-download-progress.component.html',
    styleUrls: ['./upload-download-progress.component.scss']
})

@Injectable()
export class UploadDownloadProgressComponent implements OnInit {
    
    public folderName: string = '';

    @Input() assetsList: Array<assetProcess> = [];
    
    constructor() {
       
    }
    ngOnInit(): void {
 
    }

    closeClick(){

    }


}