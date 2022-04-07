import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FileStatus } from '@pepperi-addons/ngx-composite-lib/file-status-panel';
import { AddonBlockLoaderService } from 'projects/ngx-composite-lib/addon-block-loader';
import { DIMXComponent as DIMXComponent } from 'projects/ngx-composite-lib/dimx-export';

@Component({
    selector: 'app-components-example',
    templateUrl: './components-example.component.html',
    styleUrls: ['./components-example.component.scss'],
})
export class ComponentsExampleComponent implements OnInit {
    @ViewChild('addonLoaderContainer', { read: ViewContainerRef }) addonLoaderContainer!: ViewContainerRef;
    
    @ViewChild('dimx') dimx:DIMXComponent | undefined;
    public files: Array<FileStatus> = [];

    @Output() hostEvents: EventEmitter<any> = new EventEmitter();
    
    constructor(private addonBlockLoaderService: AddonBlockLoaderService) { 
        //
    }

    ngOnInit(): void {
        
        this.addFiles();
        
    }

    menuItems = [{"key":'dimxexport', "text":"Export"}, {"key":'dimximport', "text":"Import"}];
    selectedMenuItem = {"key":'dimxexport'};
    menuItemClick(value: any){
        console.log(`menu item was clicked with value ${JSON.stringify(value)}`);
       
        switch(value["source"]["key"]){
            case "dimxexport":
                this.dimx?.DIMXExportRun({"DIMXExportFormat":"csv"});
                break;
            case "dimximport":
                this.dimx?.uploadFile({});
                
                break;
            default:
                console.log("default reached in menuItemClick switch-case");
        }
        
    }

    onDIMXProcessDone(event:any){
        console.log(`DIMXProcessDone: ${JSON.stringify(event)}`);
    }

    menuClick(value: any){
        console.log(`menu click with value: ${JSON.stringify(value)}`);
    }

    addFiles(){
        const file: FileStatus = new FileStatus();
        file.name = 'Test';
        file.status = 'downloading';
        
        window.setInterval(() => { 
            this.files.push(file);
            if(this.files.length === 4){
                this.files[2].status = 'done';
                this.files[0].status = 'failed';
            }
            else if(this.files.length === 6){
                this.files = [];
            }
        }, 2000);
    }

    openDialog() {
        debugger;
        this.addonBlockLoaderService.openDialog(this.addonLoaderContainer, 'assets-manager', {}, this.hostEvents);
        // this.addonBlockLoaderService.loadAddonBlock(this.addonLoaderContainer, 'assets-manager', {}, this.hostEvents);
    }
}
