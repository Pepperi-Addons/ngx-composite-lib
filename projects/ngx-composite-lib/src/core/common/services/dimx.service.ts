import { Injectable, ViewContainerRef } from "@angular/core";
import { PepRemoteLoaderService } from "@pepperi-addons/ngx-lib/remote-loader";

export interface DIMXHostObject {
    DIMXAddonUUID: string;
    DIMXResource: string;
}

export interface DIMXImportOptions {
    OverwriteObject?: boolean;
    Delimiter?: string;
    OwnerID?: string;
    ActionID?: string;
}

export interface DIMXExportOptions {
    DIMXExportFormat?: string;
    DIMXExportIncludeDeleted?: boolean;
    DIMXExportFileName?: string;
    DIMXExportWhere?: string;
    DIMXExportFields?: string;
    DIMXExportDelimiter?: string;
    ActionID?: string;
}

@Injectable()
export class PepDIMXHelperService {
    private dimxFunctions!: { 
        DIMXImport: (options: DIMXImportOptions) => void, 
        DIMXExport: (options: DIMXExportOptions) => void 
    };

    constructor(
        private remoteLoaderService: PepRemoteLoaderService
    ) {
    }

    register(viewContainerRef: ViewContainerRef, dimxHostObject: DIMXHostObject, onDIMXProcessDoneCallback: (dimxEvent: any) => void) {
        this.remoteLoaderService.loadAddonBlockInContainer({
            container: viewContainerRef,
            name: 'DIMX',
            hostObject: dimxHostObject,
            hostEventsCallback: (event: any) => {
                if (event.action === 'DIMXFunctionsRegister') {
                    this.dimxFunctions = event.value;
                } else if (event.action === 'DIMXProcessDone') {
                    onDIMXProcessDoneCallback(event.value);
                } else {
                    console.error('Unknown event action: ' + event.action);
                }
            }
        });
    }

    import(options: DIMXImportOptions) {
        if (typeof(this.dimxFunctions?.DIMXImport) === 'function') {
            this.dimxFunctions.DIMXImport(options);
        } else {
            console.error('DIMXImport function not found, are you registered?');
        }
    }

    export(options: DIMXExportOptions) {
        if (typeof(this.dimxFunctions?.DIMXExport) === 'function') {
            this.dimxFunctions.DIMXExport(options);
        } else {
            console.error('DIMXExport function not found, are you registered?');
        }
    }
}