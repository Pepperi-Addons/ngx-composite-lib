import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

    constructor() {
        
        if (this.remotePathOptions && this.hostObject) {
            
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

