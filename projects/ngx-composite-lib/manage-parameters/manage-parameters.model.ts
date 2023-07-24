// import { AddonDataScheme, FlowParam, FormDataView, NgComponentRelation } from "@pepperi-addons/papi-sdk";
// import { IAddonBlockLoaderDialogOptions } from "@pepperi-addons/ngx-lib/remote-loader";

import { DataViewFieldType, SchemeFieldType } from "@pepperi-addons/papi-sdk";

// import { DebugFlowResult, FlowObject, LogicBlock } from "shared";
// import { IPepDraggableItem } from "@pepperi-addons/ngx-lib/draggable-items";
// import { PepStyleType } from "@pepperi-addons/ngx-lib";

// export interface LogicBlockEditorOptions extends IAddonBlockLoaderDialogOptions {
//     block: LogicBlock;
// }

// export interface LogicBlockRelation extends NgComponentRelation {
//     BlockExecutionRelativeURL: string;
// }

// export type ActionType = 'Add' | 'Edit' | 'Delete' | 'Duplicate' | 'Logs' | 'Test';

// export interface ActionClickedEventData {
//     ActionType: ActionType,
//     ItemKey?: string
// }

// export const GL_PAGE_SIZE = 30;
// export const API_PAGE_SIZE = 100;
// export const SELECTION_FIELD_PREFIX = 'ValueSelectionType_';

// export const SECOND = 1000;
// export const MINUTE = 60 * SECOND;

export type ParameterFormType = 'add' | 'edit';

export interface IParametersColumn {
    Key: string; // This is the property name of the parameter.
    Title: string;
    Type: DataViewFieldType,
    Width: number;
}

export interface IParamemeter {
    Name: string;
    Type: SchemeFieldType;
    Description?: string;
    DefaultValue: any;
    [key: string]: any;
}

export interface IParameterFormData {
    Mode: ParameterFormType;
    Parameter: IParamemeter;
    ShowType?: boolean;
    ShowAccessibility?: boolean;
}

// export interface FlowDraggableItem extends IPepDraggableItem {
//     data: {
//         key: string;
//         addonUUID: string;
//         blockExecutionRelativeURL: string;
//         moduleName: string;
//         componentName: string;
//     }
// }

// export interface FlowPickerData {
//     runFlowData?: FlowObject
//     fields?: AddonDataScheme['Fields']
// }

// export interface PageTitleButton {
//     Key: string;
//     Title: string;
//     StyleType: PepStyleType;
//     Disabled: boolean
// }

// export type PollResultCallback = (status: DebugFlowResult)=> void;