import { ViewContainerRef } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { PepDialogData, PepDialogSizeType } from "@pepperi-addons/ngx-lib/dialog";

export interface IAddonBlockLoaderOptions {
    container: ViewContainerRef;
    blockType: addonBlockType;
    hostObject?: any;
    hostEventsCallback?: (event: any) => void;
}

export interface IAddonBlockLoaderDialogOptions extends IAddonBlockLoaderOptions {
    data?: IAddonBlockLoaderDialogDataOptions;
    config?: MatDialogConfig;
    size?: PepDialogSizeType;
}


export interface IAddonBlockLoaderDialogDataOptions {
    title?: string;
    showClose?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
}

export type addonBlockType = 'assets-manager' | '';

export const assetsManager = {
    addonId: 'ad909780-0c23-401e-8e8e-f514cc4f6aa2',
}