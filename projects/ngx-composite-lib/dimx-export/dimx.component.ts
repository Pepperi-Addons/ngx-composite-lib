import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DIMXService } from './dimx.service';
import { saveAs } from 'file-saver';
import { PepGuid } from '@pepperi-addons/ngx-lib';
import { IFileExt } from '.';
import { FileStatus } from '@pepperi-addons/ngx-composite-lib/file-status-panel';

@Component({
    selector: 'pep-dimx',
    templateUrl: './dimx.component.html',
    styleUrls: ['./dimx.component.scss']
})
export class DIMXComponent implements OnInit {
    @ViewChild('fileField') fileField:ElementRef | undefined;
    @Input() DIMXAddonUUID!: string;
    @Input() DIMXResource!: string;
    @Output() DIMXProcessDone: EventEmitter<any> = new EventEmitter();
    dimxImportOptions: { OverwriteOBject?: boolean | undefined; Delimiter?: string | undefined; OwnerID?: string | undefined; ActionID?: string | undefined} | undefined;
    constructor(
        private translate: TranslateService,
        public addonService: DIMXService
    ) {

    }


    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('SHADOW_SETTINGS.INTENSITY_SOFT').toPromise().then((typeSoft) => { console.log("something");
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

    async pollDIMXResult(pollingURL:string, ifile:IFileExt){
        console.log(`polling audit with the executionUUID: ${pollingURL}`);
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        let seconds = 0;
        const waitingTime = 1000; //in ms
        try{
            let result;
            while(true){
                result = await this.addonService.papiClient.get(`/audit_logs/${pollingURL}`);
        
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
                    ifile.returnedObject = {"ErrorMessage": result["AuditInfo"]["ErrorMessage"]}
                    await this.SendDoneEventIfDone();
                    return null;
                case 1:
                    console.log(`polling result: ${result["AuditInfo"]["ResultObject"]}`);
                    return JSON.parse(result["AuditInfo"]["ResultObject"]);
                default:
                    ifile.status = "failed";
                    ifile.returnedObject = {"ErrorMessage": `unknown audit log type: ${result["Status"]}`}
                    await this.SendDoneEventIfDone();
                    return null
            }
        }
        catch(ex){
            console.log(`pollDIMXResult: ${ex}`);
            ifile.status = "failed";
            ifile.returnedObject = {"ErrorMessage": (ex as {message:string}).message}
            await this.SendDoneEventIfDone();
            return null;
        }
    }

    getNewFileName(value:{
        DIMXExportFormat:string,
        DIMXExportFileName: string,
    }){
        let extension;
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
        const filename = value.DIMXExportFileName;
        return filename+extension;
    }
    
    iFileID = 0;
    iFileArray:IFileExt[] = [];
    createNewIFile(fileName:string , status:"downloading"|"uploading"):IFileExt{
        return {
            "key":this.iFileID++,
            "name":fileName,
            "status":status};
    }

    async removeIfilesWithDelay(iFile:FileStatus, delay = 2000) {
        window.setTimeout(() => {
            const index = this.iFileArray.findIndex(element => element === iFile);
            if (index >= 0){
                this.iFileArray.splice(index,1);
            }
        }, delay)
    }

    async clearIFilesWithDelay(delay = 2000){
        window.setTimeout(() => {
            this.iFileArray = [];
        }, delay)
    }


    uploadFile(options?:{OverwriteOBject?:boolean, Delimiter?:string, OwnerID?:string, ActionID?:string}){
        this.dimxImportOptions = options;
        const elem = document.getElementById("fileuploader");
   if(elem && document.createEvent) {
      const evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
   }
        // this.fileField?.nativeElement.click();
    }   

    IsFileInProgress(iFile:FileStatus){
        return iFile.status == "downloading" || iFile.status == "uploading";
    }

    AnyFilesInProgress(){
        if (this.iFileArray.find(this.IsFileInProgress) === undefined){
            return false;
        }
        return true
    }

    GetDoneEventBody(){
        return this.iFileArray.map(iFile => {
            return {
                "FileName": iFile.name, 
                "Status": iFile.status,
                "ReturnedObject": iFile.returnedObject!
        }
        });
    }

    async SendDoneEventIfDone(){
        if (this.AnyFilesInProgress()){
            return;
        }
        const eventObject:any = this.GetDoneEventBody();
        this.DIMXProcessDone.emit(eventObject);
        await this.clearIFilesWithDelay();
    }

    async dimximportrun(e:any) {
        console.log("Enter DIMXImportRun");
        const files = e.target.files;
        const fileListAsArray = Array.from(files);
        fileListAsArray.forEach(async (file, i) => {

            const filex = (file as HTMLInputElement);
            const dimx_import_relativeURL = `/addons/api/44c97115-6d14-4626-91dc-83f176e9a0fc/api/file_import_upload`;
            const str = (await this.toBase64(filex)) as string; //???
            const ext = filex.name.split('.')[1];
            const value = {fileStr:str, fileExt:ext}
            const dimxUploadObject = {...this.getPFSUploadObject(value), ...this.dimxImportOptions, Resource:this.DIMXResource, AddonUUID:this.DIMXAddonUUID};
            const iFile:IFileExt = this.createNewIFile(filex.name, "uploading");
            console.log(`created new iFile: ${iFile}`);
            this.iFileArray.push(iFile);
            console.log(`added iFile to iFileArray`);
            
            try{
                console.log("posting to dimx import_upload now");
                const header:any = {};
                if(dimxUploadObject.ActionID){
                    header["X-Pepperi-ActionID"]=dimxUploadObject.ActionID;
                }
                if(dimxUploadObject.OwnerID){
                    header["X-Pepperi-OwnerID"]=dimxUploadObject.OwnerID;
                }
                const res = await this.addonService.papiClient.post(dimx_import_relativeURL, dimxUploadObject, header);
                console.log("Got reply from dimx, calling poll with the result:");
                console.log(JSON.stringify(res));

                const poll_result = await this.pollDIMXResult(res['ExecutionUUID'], iFile);
                if (poll_result === null) {
                    return;
                }
                console.log(`done polling, got result: ${JSON.stringify(poll_result)}`);
                iFile.status = "done";
                iFile.returnedObject = poll_result;
                await this.SendDoneEventIfDone();
                console.log("Imported the file");
                //await this.removeIfileWithDelay(iFile);
                // check all done
                

            }
            catch(ex){
                console.log(`DIMXImportRun: ${ex}`);
                iFile.status = "failed";
                iFile.returnedObject = {"ErrorMessage": (ex as {message:string}).message}
                await this.SendDoneEventIfDone();
                //await this.removeIfileWithDelay(iFile, 2000);
                return;
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
        DIMXExportDelimiter?:string,
        ActionID?:string
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
        const iFile:IFileExt = this.createNewIFile(fileName, "downloading");
        console.log(`created new iFile: ${iFile}`);
        this.iFileArray.push(iFile);
        console.log(`added iFile to iFileArray`);
     
        try{

            console.log("posting to dimx export now");
            const header:any = {};
            if(value.ActionID){
                header["X-Pepperi-ActionID"]=value.ActionID;
            }
            const res = await this.addonService.papiClient.post(`/addons/data/export/file/${this.DIMXAddonUUID}/${this.DIMXResource}`, bod, header);
            console.log("Got reply from dimx, calling poll with the result:");
            console.log(res);
            const result = await this.pollDIMXResult(res['ExecutionUUID'], iFile);
            if (result === null){
                return 
            }
            const url = result["DownloadURL"];

            console.log("attempting to download the file");
            console.log(`url is: ${url}`);
            const blob = await fetch(url).then(r => r.blob());
            saveAs(blob, fileName);
            iFile.status = "done";
            iFile.returnedObject = result;
            await this.SendDoneEventIfDone();
            console.log("downloaded the file");
            //await this.removeIfileWithDelay(iFile);
        }
        catch(ex){
            iFile.status= "failed";
            iFile.returnedObject = {"ErrorMessage":(ex as {message:string}).message}
            await this.SendDoneEventIfDone();
            //await this.removeIfileWithDelay(iFile);
            console.log(`buttonClick: ${ex}`);
            return;
        }
        
    }

   

   
}
