import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { PepDialogService, PepDialogSizeType } from '@pepperi-addons/ngx-lib/dialog';
import { PepRemoteLoaderOptions } from '@pepperi-addons/ngx-remote-loader';
import { AddonBlockLoaderService } from './addon-block-loader-service';
import { MatDialogRef } from '@angular/material/dialog';
import { addonBlockType } from './addon-block-loader-model';

@Component({
    selector: 'pep-addon-block-loader',
    templateUrl: './addon-block-loader.component.html',
    styleUrls: ['./addon-block-loader.component.scss']
})
export class AddonBlockLoaderComponent implements OnInit {
    @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate: TemplateRef<any> | undefined;
    
    @Input() blockType: addonBlockType = 'assets-manager';
    @Input() hostObject: any;
    @Input() inDialog: boolean = true;

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

 

    openDialog(title: string, showHeader: boolean = true, size: PepDialogSizeType = 'full-screen', hostObject: any = {}) {
            
        this.hostObject = hostObject;
        this.hostObject.inDialog = true;
        
        //await this.loadRemoteOptions();
        const config = this.dialogService.getDialogConfig({}, size);
        const data = {
                title: title,
                showHeader: showHeader,
                remotePathOptions: this.remotePathOptions,
                hostObject: this.hostObject
        }

        this.dialogRef = this.dialogService.openDialog(this.dialogTemplate as TemplateRef<any>, data, config);
                
            // TODO: Return another event for this or expose this.dialogRef to the user
            // this.dialogRef.afterClosed().subscribe((value) => {
            //     if (value !== undefined && value !== null) {
                    
            //     }
            // });
    }
}