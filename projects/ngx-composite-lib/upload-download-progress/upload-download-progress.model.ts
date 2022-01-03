export type assetStatus = 'uploading' | 'downloading' | 'done' | 'failed' | 'hidden';

export class assetProcess {
    key: number | undefined;
    name = '';
    status: assetStatus = 'uploading';
}