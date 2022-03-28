import { FileStatusType, FileStatus } from '@pepperi-addons/ngx-composite-lib/file-status-panel';

export class IFileExt extends FileStatus {
    status: FileStatusType = 'downloading';
    returnedObject?: any;
}