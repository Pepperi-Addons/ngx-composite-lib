import { Component, OnInit, ViewChild } from '@angular/core';
import { IFile } from '@pepperi-addons/ngx-composite-lib/file-status-panel';
import { DIMXComponent as DIMXComponent } from 'projects/ngx-composite-lib/dimx-export';

@Component({
    selector: 'app-components-example',
    templateUrl: './components-example.component.html',
    styleUrls: ['./components-example.component.scss'],
})
export class ComponentsExampleComponent implements OnInit {
    @ViewChild('dimx') dimx:DIMXComponent | undefined;
    public files: Array<IFile> = [];

    constructor() { }

    ngOnInit(): void {
        
        this.addFiles();
        
    }

    menuItems = [{"key":'dimxexport', "text":"Export"}, {"key":'dimximport', "text":"Import"}];
    selectedMenuItem = {"key":'dimxexport'};
    menuItemClick(value: any){
        console.log(`menu item was clicked with value ${JSON.stringify(value)}`);
       
        switch(value["source"]["key"]){
            case "dimxexport":
                this.dimx?.DIMXExportRun({});
                break;
            case "dimximport":
                this.dimx?.uploadFile(value, {});
                
                break;
            default:
                console.log("default reached in menuItemClick switch-case");
        }
        
    }

    menuClick(value: any){
        console.log(`menu click with value: ${JSON.stringify(value)}`);
    }

    addFiles(){
        
        let self = this;
        let file: IFile = new IFile();
        file.name = 'Test';
        file.status = 'downloading';

        window.setInterval(function () { 

            self.files.push(file);

            if(self.files.length === 4){
                self.files[2].status = 'done';
                self.files[0].status = 'failed';
            }
            else if(self.files.length === 6){
                self.files = [];
            }
          }, 2000);
    }
}
