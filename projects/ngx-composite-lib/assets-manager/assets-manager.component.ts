import { Component, OnInit, Injectable, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepTextboxComponent } from '@pepperi-addons/ngx-lib/textbox';
import { AddonEndpoint } from '@pepperi-addons/papi-sdk/dist/endpoints';

@Component({
    selector: 'pep-assets-manager',
    templateUrl: './assets-manager.component.html',
    styleUrls: ['./assets-manager.component.scss']
})
export class AssetsManagerComponent implements OnInit {
    
    @Input() isOnPopUp: boolean = true;
    // @Input() filesList: Array<FileStatus> = [];
    @Input() hostObject = {};

    @Output()
    closeClick: EventEmitter<void> = new EventEmitter<void>();
    
    remoteEntry: string = '';
    
    remotePathOptions = {
        key:  '',//relation.Key,
        addonId: 'ad909780-0c23-401e-8e8e-f514cc4f6aa2',
        remoteEntry: this.remoteEntry, //'https://cdn.pepperi.com/Addon/Public/ad909780-0c23-401e-8e8e-f514cc4f6aa2/0.0.6/',// this.getRemoteEntryByType(relation, remoteBasePath),
        remoteName: 'addon.js',
        exposedModule: './AddonModule',
        componentName: 'AddonComponent'
    }
    constructor(private dialogService: PepDialogService) {
        
    }
    

    async ngOnInit() {

        if(this.isOnPopUp == true){
            const dialogRef = this.dialogService.openDialog(
                PepTextboxComponent,
                {},
            );
    
            dialogRef.afterClosed().subscribe((value) => {
                if (value !== undefined && value !== null) {
                    debugger;
                }
            });
        }
    }

    onCloseClicked(event: any): void {
        this.closeClick.emit();
    }

    onBlockLoad(event: any) {
        //this.pagesService.updateBlockLoaded(this.pageBlock.Key);
    }

    onBlockHostEvents(event: any) {
        // Implement blocks events.
        // switch(event.action){
            // case 'block-loaded':
            //     this.pagesService.updateBlockLoaded(this.pageBlock.Key);
            //     break;
            // case 'set-parameter':
            //     this.pagesService.setBlockParameter(this.pageBlock.Key, event);
            //     break;
            // case 'emit-event':
            //     break;
        // }
    }


}