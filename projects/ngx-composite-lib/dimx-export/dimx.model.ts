type fileStatus = 'uploading'|'downloading'|'done'|'failed'|'hidden';
export class IFile {
    key: number = 0;
    name:string = '';
    status: fileStatus = 'downloading';
    }