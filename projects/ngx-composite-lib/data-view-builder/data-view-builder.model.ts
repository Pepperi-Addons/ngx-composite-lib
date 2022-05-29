export type PepDataViewBuilderType = 'menu' | 'list' | 'card';

export interface IMappedFieldBase {
    fieldKey: string;
}

export interface IMappedMenuField extends IMappedFieldBase {
    title: string;
}