type fileStatus = 'uploading'|'downloading'|'done'|'failed'|'hidden';
export class IFile {
    key = 0;
    name = '';
    status: fileStatus = 'downloading';
    }