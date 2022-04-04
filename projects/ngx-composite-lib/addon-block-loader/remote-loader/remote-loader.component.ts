import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AddonEndpoint } from '@pepperi-addons/papi-sdk/dist/endpoints';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { AddonBlockLoaderService } from './addon-block-loader-service';

export interface IRemoteLoaderData {
    remotePathOptions: any;
    hostObject: any;
}

@Component({
    selector: 'remote-loader',
    templateUrl: './remote-loader.component.html'
})

export class RemoteLoaderComponent implements OnInit {
    @Input() remotePathOptions: any = null;
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @Output() blockLoad: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        @Optional()
        private dialogRef: MatDialogRef<RemoteLoaderComponent>,
        @Optional()
        @Inject(MAT_DIALOG_DATA) 
        private data: IRemoteLoaderData) {
        
        if (this.dialogRef && this.data?.hostObject && this.data?.remotePathOptions) {
            this.dialogRef.afterOpened().subscribe((res) => {
                debugger;
                this.remotePathOptions = this.data.remotePathOptions;
                this.hostObject = this.data.hostObject;
            });
            
            // this.dialogRef.componentInstance.hostEvents.subscribe((event) => {
            //     this.onHostEvents(event);
            // });
        }
    }
    

    ngOnInit() {
        
    }

    onHostEvents(event: any){
        this.hostEvents.emit(event);
    }

    onBlockLoad(){
        this.blockLoad.emit();
    }
}

