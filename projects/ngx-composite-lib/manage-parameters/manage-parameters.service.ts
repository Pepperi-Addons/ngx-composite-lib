import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IPepGenericFormDataView } from "@pepperi-addons/ngx-composite-lib/generic-form";
import { KeyValuePair } from "@pepperi-addons/ngx-lib";
import { DataViewFieldType, GridDataView, SchemeFieldType, SchemeFieldTypes } from "@pepperi-addons/papi-sdk";
import { IParametersColumn, ParameterFormType } from "./manage-parameters.model";

@Injectable({
    providedIn:'root'
})
export class ManageParametersService {
    
    constructor (private translate: TranslateService) {

    }

    private getAvailableTypes(): KeyValuePair<string>[] {
        let types = SchemeFieldTypes.filter(type => ['Array', 'DateTime', 'Resource', 'ContainedResource', 'DynamicResource', 'ContainedDynamicResource', 'MultipleStringValues'].includes(type) === false);
        return types.map(type => {
            return {
                Key: type,
                Value: type
            }
        })
    }

    private convertParamsTypeToDVType(paramType: SchemeFieldType): DataViewFieldType {
        let res: DataViewFieldType = 'TextBox';
        switch (paramType) {
            case 'Bool': {
                res = 'Boolean';
                break;
            }
            case 'Integer': {
                res = 'NumberInteger';
                break;
            }
            case 'Double': {
                res = 'NumberReal';
                break;
            }
        }
        return res;
    }

    private getDataViewField(fieldId: string, type: DataViewFieldType, title: string, mandatory: boolean, readOnly: boolean, 
        optionalValues: any[] | undefined = undefined, additionalProps: any = undefined, layout: any = undefined): any {

        const res: any = {
            FieldID: fieldId,
            Type: type,
            Title: title,
            Mandatory: mandatory,
            ReadOnly: readOnly
        }

        if (optionalValues) {
            res['OptionalValues'] = optionalValues;
        }

        if (additionalProps) {
            res['AdditionalProps'] = additionalProps;
        }

        if (layout) {
            res['Layout'] = layout;
        }

        return res;
    }

    getParametersListDataView(parametersColumns: IParametersColumn[], showType: boolean, showAccessibility: boolean): GridDataView {
        let fields;
        let columns;

        // If columns are defined, use them. Otherwise, use the default columns.
        if (parametersColumns.length > 0) {
            fields = parametersColumns.map(column => {
                return this.getDataViewField(column.Key, column.Type, column.Title, false, true, [], {});
            });

            columns = parametersColumns.map(column => {
                return { Width: column.Width }
            });
        } else {
            // Add Name and Description fields.
            fields = [
                this.getDataViewField('Name', 'Link', this.translate.instant('MANAGE_PARAMETERS.NAME_TITLE'), false, true),
                this.getDataViewField('Description', 'TextBox', this.translate.instant('MANAGE_PARAMETERS.DESCRIPTION_TITLE'), false, true),
            ];

            // Add Type field only if showType is true.
            if (showType) {
                fields.push(this.getDataViewField('Type', 'TextBox', this.translate.instant('MANAGE_PARAMETERS.TYPE_TITLE'), false, true));
            }

            // Add DefaultValue field.
            fields.push(this.getDataViewField('DefaultValue', 'TextBox', this.translate.instant('MANAGE_PARAMETERS.DEFAULT_VALUE_TITLE'), false, true));

            // Add Internal field.
            if (showAccessibility) {
                fields.push(this.getDataViewField('Internal', 'Boolean', this.translate.instant('MANAGE_PARAMETERS.INTERNAL_TITLE'), false, true));
            }

            columns = fields.map(field => {
                return { Width: 100 / fields.length }
            });
        }

        return {
            Context: {
                Name: '',
                Profile: { InternalID: 0 },
                ScreenSize: 'Landscape'
            },
            Type: 'Grid',
            Title: '',
            Fields: fields,
            Columns: columns,
            FrozenColumnsCount: 0,
            MinimumColumnWidth: 0
        }
    }

    getParameterFormDataView(formMode: ParameterFormType, paramType: SchemeFieldType, showType: boolean, showAccessibility: boolean): IPepGenericFormDataView {
        const fieldTypes = this.getAvailableTypes();
        const noEmptyOption = { emptyOption: false };

        // Add Name and Description fields.
        const fields = [
            this.getDataViewField('Name', 'TextBox', this.translate.instant('MANAGE_PARAMETERS.NAME_TITLE'), formMode === 'add', formMode != 'add', [], 
                { regex: '^([a-zA-Z0-9-_])*$', regexError: this.translate.instant('MANAGE_PARAMETERS.NAME_REGEX_ERROR')}
            ),
            this.getDataViewField('Description', 'TextArea', this.translate.instant('MANAGE_PARAMETERS.DESCRIPTION_TITLE'), false, false, [], {}, 
                { Size: { Width:1, Height:2 } }
            )
        ];

        // Add Type field only if showType is true.
        if (showType) {
            this.getDataViewField('Type', 'ComboBox', this.translate.instant('MANAGE_PARAMETERS.TYPE_TITLE'), false, formMode != 'add', fieldTypes, noEmptyOption);
        }
        
        // Add DefaultValue field.
        fields.push(this.getDataViewField('DefaultValue', this.convertParamsTypeToDVType(paramType), this.translate.instant('MANAGE_PARAMETERS.DEFAULT_VALUE_TITLE'), 
            false, false, [], {}))
            
        // Add Internal and Accessibility_Description fields.
        if (showAccessibility) {
            const accessibilityDescAdditionalProps = { renderTitle: false, renderEnlargeButton: false };
            const accessibilityDescLayout = { Size: { Height: 0, Width: 1 } };

            fields.push(this.getDataViewField('Accessibility_Description', 'RichTextHTML', this.translate.instant('MANAGE_PARAMETERS.INTERNAL_DESCRIPTION'), 
            false, true, [], accessibilityDescAdditionalProps, accessibilityDescLayout)
            );
                
            const accessibilityOptionalValues = [{ Key: 'Internal', Value: 'Internal' }, { Key: 'External', Value: 'External' }];
            fields.push(this.getDataViewField('Accessibility', 'ComboBox', this.translate.instant('MANAGE_PARAMETERS.ACCESSIBILITY_TITLE'), 
                false, false, accessibilityOptionalValues, noEmptyOption)
            );
        }

        return {
            Type: "Form",
            Fields: fields,
            Context: {
                Name: "",
                Profile: { },
                ScreenSize: 'Tablet'
            }
        };
    }
}