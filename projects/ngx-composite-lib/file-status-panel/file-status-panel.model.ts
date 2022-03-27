export type FileStatusType = 'uploading' | 'downloading' | 'done' | 'failed' | 'hidden' | 'deleting';

export class FileStatus {
    key = 0;
    name = '';
    status: FileStatusType = 'uploading';
    statusMessage? = '';
}