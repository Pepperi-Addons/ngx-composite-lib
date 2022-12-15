import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FileStatus } from '@pepperi-addons/ngx-composite-lib/file-status-panel';
import { PepDialogService, PepDialogData, PepDialogSizeType, PepDialogActionButton } from '@pepperi-addons/ngx-lib/dialog';

@Component({
    selector: 'app-components-example',
    templateUrl: './components-example.component.html',
    styleUrls: ['./components-example.component.scss'],
})
export class ComponentsExampleComponent implements OnInit {
    public files: Array<FileStatus> = [];

    @Output() hostEvents: EventEmitter<any> = new EventEmitter();
    
    constructor(private dialog: PepDialogService) { 
        //
    }

    ngOnInit(): void {
        
        this.addFiles();
        
    }

    menuItems = [{"key":'dimxexport', "text":"Export"}, {"key":'dimximport', "text":"Import"}];
    selectedMenuItem = {"key":'dimxexport'};
    menuItemClick(value: any){
        console.log(`menu item was clicked with value ${JSON.stringify(value)}`);
       
        // TODO: add dimx addon loader example code here
        switch(value["source"]["key"]) {
            // case "dimxexport":
            //     this.dimx?.DIMXExportRun({"DIMXExportFormat":"csv"});
            //     break;
            // case "dimximport":
            //     this.dimx?.uploadFile({});
                
            //     break;
            default:
                console.log("default reached in menuItemClick switch-case");
        }
        
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

    testOpenDialog() {
        const data = new PepDialogData({
            title: 'dialog title',
            content: 'dialog content text',
            actionsType: 'close'
          });
          const config = this.dialog.getDialogConfig({ minWidth: '30rem' }, 'regular');
      
          this.dialog.openDefaultDialog(data, config).afterClosed().subscribe(action => {
            if (action) {
              console.log('action', action);
            }
          });
    }
}
