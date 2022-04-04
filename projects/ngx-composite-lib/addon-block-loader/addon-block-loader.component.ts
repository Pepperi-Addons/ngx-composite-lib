import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { PepDialogService, PepDialogSizeType } from '@pepperi-addons/ngx-lib/dialog';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { AddonBlockLoaderService, addonClockType } from './addon-block-loader-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pep-addon-block-loader',
    templateUrl: './addon-block-loader.component.html',
    styleUrls: ['./addon-block-loader.component.scss']
})
export class AddonBlockLoaderComponent implements OnInit {
    @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate: TemplateRef<any> | undefined;
    
    @Input() blockType: addonClockType = 'assets-manager';
    @Input() isOnPopUp: boolean = true;
    @Input() hostObject = null;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @Output() blockLoad: EventEmitter<void> = new EventEmitter<void>();
    
    remotePathOptions: PepRemoteLoaderOptions | null = null;
    private dialogRef: MatDialogRef<any> | null = null;
    
    constructor(private addonBlockLoaderService: AddonBlockLoaderService, private dialogService: PepDialogService) {
       
    }
    
    ngOnInit() {
        this.loadRemoteOptions();
    }

    async loadRemoteOptions() {
        this.remotePathOptions = await this.addonBlockLoaderService.getRemoteLoaderOptions(this.blockType);
    }

    onBlockLoad() {
        this.blockLoad.emit();
    }

    onHostEvents(event: any) {
        this.hostEvents.emit(event);
    }

    closeDialog(event: any) {
        if (this.dialogRef) {
            this.dialogRef.close(event);
        }
    }

    openDialog(title: string, size: PepDialogSizeType = 'large') {
        if (this.isOnPopUp) {
            const config = this.dialogService.getDialogConfig({}, size);
            const data = {
                title: title,
                remotePathOptions: this.remotePathOptions,
                hostObject: this.hostObject,
            }

            this.dialogRef = this.dialogService.openDialog(this.dialogTemplate as TemplateRef<any>, data, config);
                
            // TODO: Return another event for this or expose this.dialogRef to the user
            // this.dialogRef.afterClosed().subscribe((value) => {
            //     if (value !== undefined && value !== null) {
                    
            //     }
            // });
        }
    }
}