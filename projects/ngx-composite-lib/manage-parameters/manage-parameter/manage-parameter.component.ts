import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GenericFormComponent, IPepGenericFormDataView, IPepGenericFormValueChange } from '@pepperi-addons/ngx-composite-lib/generic-form';
import { IParamemeter, IParameterFormData } from '../manage-parameters.model';

import { TranslateService } from '@ngx-translate/core';
import { ManageParametersService } from '../manage-parameters.service';
import { SchemeFieldType } from '@pepperi-addons/papi-sdk';

@Component({
    selector: 'manage-parameter',
    templateUrl: './manage-parameter.component.html',
    styleUrls: ['./manage-parameter.component.scss']
})
export class ManageParameterComponent implements OnInit {

    // @ViewChild('flowsList', {read: GenericFormComponent}) set genericFormSetter(inForm: GenericFormComponent) {
    //     if (inForm) {
    //         this.form = inForm;
    //     }
    // };
    
    form!: GenericFormComponent;
    parameter: IParamemeter | undefined = undefined;
    showType: boolean = false;
    showAccessibility: boolean = false;
    dataView!: IPepGenericFormDataView;
    isValid: boolean = true;

    constructor ( private dialogRef: MatDialogRef<ManageParameterComponent>,
        private manageParametersService: ManageParametersService,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public incoming: IParameterFormData) {

    }

    private loadDataView(paramType: SchemeFieldType) {
        this.dataView = this.manageParametersService.getParameterFormDataView(this.incoming.Mode, paramType || 'String', this.showType, this.showAccessibility);
    }

    ngOnInit(): void {
        this.parameter = this.getParameter(this.incoming.Parameter);
        this.showType = this.incoming.ShowType ?? false;
        this.showAccessibility = this.incoming.ShowAccessibility ?? false;
        this.loadDataView(this.parameter?.Type);
    }

    saveParameter() {
        // before updating the parameter, remove redundant properties
        if (this.parameter && this.showAccessibility) {
            delete this.parameter['Accessibility'];
            delete this.parameter['Accessibility_Description'];
        }

        this.close(this.parameter);
    }

    close(parameter: IParamemeter | undefined = undefined) {
        this.dialogRef.close(parameter || null);
    }

    getParameter(parameter: IParamemeter): IParamemeter {
        let ret: IParamemeter = JSON.parse(JSON.stringify(parameter));
        Object.keys(parameter || {}).forEach(prop => {
            if (typeof(parameter[prop]) != 'boolean') {
                // if the value is null/undefined, don't copy it
                if (parameter[prop]) {
                    ret[prop] = parameter[prop].toString();
                }
            } else if (prop === 'Internal' && this.showAccessibility) {
                ret['Accessibility'] = parameter[prop] ? 'Internal' : 'External'
            } else {
                ret[prop] = parameter[prop];
            }
        });
        
        if (this.showAccessibility) {
            ret['Accessibility_Description'] = this.translate.instant('MANAGE_PARAMETERS.INTERNAL_DESCRIPTION');
        }

        return ret;
    }

    onValueChanged(event: IPepGenericFormValueChange) {
        if (event.ApiName === 'Type' && this.showType) {
            this.loadDataView(event.Value);
        } else if (event.ApiName === 'Accessibility' && this.showAccessibility) {
            if (this.parameter) {
                this.parameter['Internal'] = event.Value === 'Internal';
            }
        }
    }

}