import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFile } from './dimx.model';
import { DIMXService } from './dimx.service';
import { saveAs } from 'file-saver';
import { PepGuid } from '@pepperi-addons/ngx-lib';

@Component({
    selector: 'pep-dimx',
    templateUrl: './dimx.component.html',
    styleUrls: ['./dimx.component.scss']
})
export class DIMXComponent implements OnInit {
    @ViewChild('fileField') fileField:ElementRef | undefined;
    @Input() DIMXAddonUUID!: string;
    @Input() DIMXResource!: string;
    dimxImportOptions: { OverwriteOBject?: boolean | undefined; Delimiter?: string | undefined; } | undefined;
    constructor(
        private translate: TranslateService,
        public addonService: DIMXService
    ) {

    }


    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('SHADOW_SETTINGS.INTENSITY_SOFT').toPromise().then((typeSoft) => {
        });
    }

    getDIMXExportPOSTBody(value:{
        DIMXExportFormat?:string,
        DIMXExportIncludeDeleted?: boolean,
        DIMXExportFileName?: string,
        DIMXExportWhere?: string,
        DIMXExportFields?: string,
        DIMXExportDelimiter?:string
    }){
        return {
            "Format":value.DIMXExportFormat,
            "IncludeDeleted":value.DIMXExportIncludeDeleted,
            "Where":value.DIMXExportWhere,
            "Fields":value.DIMXExportFields,
            "Delimiter":value.DIMXExportDelimiter
        }
    }

    printHello(){
        console.log("hello");
    }

    async pollDIMXResult(pollingURL:string, ifile:IFile){
        console.log(`polling audit with the executionUUID: ${pollingURL}`);
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        var seconds = 0;
        const waitingTime = 1000; //in ms
        try{
            while(true){
                var result = await this.addonService.papiClient.get(`/audit_logs/${pollingURL}`);
        
                console.log(`result from auditlog get is: ${result}`);
                if( !result || result["Status"]["ID"] === 2 || result["Status"]["ID"] === 4){
                    console.log(`waited for ${seconds++} seconds`);
                    await delay(waitingTime);
                }
                else{
                    break;
                }
            }
            switch(result["Status"]["ID"]){
                case 0:
                    ifile.status = "failed";
                    throw new Error(result["AuditInfo"]["ErrorMessage"]);
                case 1:
                    console.log(`polling result: ${result["AuditInfo"]["ResultObject"]}`);
                    return JSON.parse(result["AuditInfo"]["ResultObject"]);
                default:
                    ifile.status = "failed";
                    throw new Error(`pollDIMXResult: unknown audit log type: ${result["Status"]}`);
            }
        }
        catch(ex){
            console.log(`pollDIMXResult: ${ex}`);
            ifile.status = "failed";
            throw new Error((ex as {message:string}).message);
        }
    }

    getNewFileName(value:{
        DIMXExportFormat:string,
        DIMXExportFileName: string,
    }){
        var extension;
        var filename;
        switch (value.DIMXExportFormat.toLowerCase()){
            case "json":
                extension = ".json";
                break;
            case "csv":
                extension = '.csv';
                break;
            default:
                extension = "";
        }
        filename = value.DIMXExportFileName;
        return filename+extension;
    }
    
    iFileID = 0;
    iFileArray:IFile[] = [];
    createNewIFile(fileName:string , status:"downloading"|"uploading"):IFile{
        return {
            "key":this.iFileID++,
            "name":fileName,
            "status":status};
    }

    async removeIfileWithDelay(iFile:IFile, delay:number = 2000) {
        window.setTimeout(() => {
            const index = this.iFileArray.findIndex(element => element === iFile);
            if (index >= 0){
                this.iFileArray.splice(index,1);
            }
        }, delay)
    }

    async uploadasync(e:any){
      
    }

    uploadf(e:any){
        const files = e.target.files;
        const fileListAsArray = Array.from(files);
       
        fileListAsArray.forEach((file, i) => {

        const filex = (file as HTMLInputElement);
        



});
    }

    uploadFile(event:any, options?:{OverwriteOBject?:boolean, Delimiter?:string}){
        this.dimxImportOptions = options;
        var elem = document.getElementById("fileuploader");
   if(elem && document.createEvent) {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
   }
        // this.fileField?.nativeElement.click();
    }   


    async dimximportrun(e:any) {
        console.log("Enter DIMXImportRun");
        const files = e.target.files;
        const fileListAsArray = Array.from(files);
        fileListAsArray.forEach(async (file, i) => {

        const filex = (file as HTMLInputElement);
        const dimx_import_relativeURL = `/addons/api/44c97115-6d14-4626-91dc-83f176e9a0fc/api/file_import_upload`;
        var str = (await this.toBase64(filex)) as string; //???
        var ext = filex.name.split('.')[1];
        const value = {fileStr:str, fileExt:ext}
        const dimxUploadObject = {...this.getPFSUploadObject(value), ...this.dimxImportOptions, Resource:this.DIMXResource, AddonUUID:this.DIMXAddonUUID};
        const iFile:IFile = this.createNewIFile(filex.name, "uploading");
        console.log(`created new iFile: ${iFile}`);
        this.iFileArray.push(iFile);
        console.log(`added iFile to iFileArray`);
        
        try{

            console.log("posting to dimx import_upload now");
            var res = await this.addonService.papiClient.post(dimx_import_relativeURL, dimxUploadObject);
            console.log("Got reply from dimx, calling poll with the result:");
            console.log(res);

            const poll_result = await this.pollDIMXResult(res['ExecutionUUID'], iFile);

            console.log(`done polling, got result: ${JSON.stringify(poll_result)}`);
            iFile.status = "done";
            console.log("Imported the file");
            await this.removeIfileWithDelay(iFile);

        }
        catch(ex){
            console.log(`DIMXImportRun: ${ex}`);
            iFile.status = "failed";
            await this.removeIfileWithDelay(iFile, 2000);
            throw new Error((ex as {message:string}).message);
        }
        
        
        
        });
    }
    getNewPFSUploadKey(fileExt:string){
        const uuid = PepGuid.newGuid();
        const folder = 'DIMX_import';
        const pfsKey = `/${folder}/${uuid}.${fileExt}`;
        return pfsKey;
    }
    getPFSUploadObject(value:{fileStr:string, fileExt:string}){
        const fileStrArr = value.fileStr.split(';');
        const mime = fileStrArr[0].split(':')[1];
        const pfsKey = this.getNewPFSUploadKey(value.fileExt);
        const pfsUploadObject = {
            "Key": pfsKey,
            "MIME": mime,
            "URI":value.fileStr
        }
        return pfsUploadObject;
    }

    toBase64 = (file:any) => new Promise((resolve, reject) => {

        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        
        reader.onload = () => resolve(reader.result);
        
        reader.onerror = error => reject(error);
        
        });

    async DIMXExportRun(value: {
        DIMXExportFormat?:string,
        DIMXExportIncludeDeleted?: boolean,
        DIMXExportFileName?: string,
        DIMXExportWhere?: string,
        DIMXExportFields?: string,
        DIMXExportDelimiter?:string
    }) {
        if (!value){
            value = {};
        }
        if (!value.DIMXExportFormat){
            value.DIMXExportFormat = 'json';
        }
        if (!value.DIMXExportIncludeDeleted){
            value.DIMXExportIncludeDeleted = false;
        }
        if (!value.DIMXExportFileName){
            value.DIMXExportFileName = 'export';
        }
        const bod = this.getDIMXExportPOSTBody(value ? value : {});
        const fileName = this.getNewFileName(value as {DIMXExportFormat:string, DIMXExportFileName:string});
        const iFile:IFile = this.createNewIFile(fileName, "downloading");
        console.log(`created new iFile: ${iFile}`);
        this.iFileArray.push(iFile);
        console.log(`added iFile to iFileArray`);
     
        try{

            console.log("posting to dimx export now");
            var res = await this.addonService.papiClient.post(`/addons/data/export/file/${this.DIMXAddonUUID}/${this.DIMXResource}`, bod);
            console.log("Got reply from dimx, calling poll with the result:");
            console.log(res);

            const url = (await this.pollDIMXResult(res['ExecutionUUID'], iFile))["DownloadURL"];

            console.log("attempting to download the file");
            console.log(`url is: ${url}`);
            let blob = await fetch(url).then(r => r.blob());
            saveAs(blob, fileName);
            iFile.status = "done";
            console.log("downloaded the file");
            await this.removeIfileWithDelay(iFile);
        }
        catch(ex){
            iFile.status= "failed";
            await this.removeIfileWithDelay(iFile);
            console.log(`buttonClick: ${ex}`);
            throw new Error((ex as {message:string}).message);
        }
        
    }

   

   
}
