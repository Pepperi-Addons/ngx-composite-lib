import { Component, OnInit } from '@angular/core';
import { IFile } from '@pepperi-addons/ngx-composite-lib/file-status-panel';

@Component({
    selector: 'app-components-example',
    templateUrl: './components-example.component.html',
    styleUrls: ['./components-example.component.scss']
})
export class ComponentsExampleComponent implements OnInit {

    public files: Array<IFile> = [];

    constructor() { }

    ngOnInit(): void {
        
        this.addFiles();

        
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
