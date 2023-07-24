import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IPepGenericListActions, IPepGenericListDataSource, IPepGenericListParams } from '@pepperi-addons/ngx-composite-lib/generic-list';
import { PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepSelectionData } from '@pepperi-addons/ngx-lib/list';
import { ParameterFormType, IParameterFormData, IParamemeter, IParametersColumn } from './manage-parameters.model';
import { ManageParameterComponent } from './manage-parameter/manage-parameter.component';
import { IPepFieldClickEvent } from '@pepperi-addons/ngx-lib';
import { ManageParametersService } from './manage-parameters.service';

@Component({
    selector: 'pep-manage-parameters',
    templateUrl: './manage-parameters.component.html',
    styleUrls: ['./manage-parameters.component.scss']
})
export class ManageParametersComponent implements OnInit {

    @Input()
    showType = false;

    @Input()
    showAccessibility = false;

    // If columns are not defined, the default columns will be used (default is with no Internal - Accessibility).
    @Input()
    parametersColumns: IParametersColumn[] = [];

    @Input()
    parameters: IParamemeter[] = [];

    @Input()
    parametersTitle = '';

    @Output()
    parametersChange = new EventEmitter<IParamemeter[]>();
    
    dataSource!: IPepGenericListDataSource;
    listMessages: { [key: string]: string } = {};

    actions: IPepGenericListActions = {
        get: async (data: PepSelectionData) => {
            const actions = [];
            if (data && data.rows.length == 1) {
                actions.push({
                    title: this.translate.instant('Edit'),
                    handler: async (objs: any) => {
                        this.openCreateParamForm('edit', objs.rows[0]);
                    }
                });
                actions.push({
                    title: this.translate.instant('Delete'),
                    handler: async (objs: any) => {
                        this.showDeleteDialog(objs.rows[0]);
                    }
                })
            }
            return actions;
        }
    }

    constructor (private translate: TranslateService,
        private dataViewService: ManageParametersService,
        private dialogService: PepDialogService
    ) { }

    private notifyParametersChange() {
        this.parametersChange.emit(this.parameters);
        this.dataSource = this.getDataSource();
    }

    private getDataSource(): IPepGenericListDataSource {
        return {
            init: async (params: IPepGenericListParams) => {
                const listDataView = this.dataViewService.getParametersListDataView(this.parametersColumns, this.showType, this.showAccessibility);
                console.log('data view:', listDataView);
                return {
                    dataView: listDataView,
                    totalCount: this.parameters.length,
                    items: this.parameters
                };
            },
            inputs: {
                pager: {
                    type: 'scroll'
                },
                selectionType: 'single',
                emptyState: {
                    show: true,
                    title: this.listMessages['MANAGE_PARAMETERS.EMPTY_STATE_TITLE'],
                    description: this.listMessages['MANAGE_PARAMETERS.EMPTY_STATE_DESCRIPTION'],
                }
            },
        } as IPepGenericListDataSource
    }

    ngOnInit(): void {
        this.translate.get(['MANAGE_PARAMETERS.EMPTY_STATE_TITLE', 'MANAGE_PARAMETERS.EMPTY_STATE_DESCRIPTION']).subscribe(translations => {
            this.listMessages = translations;
            this.dataSource = this.getDataSource();
        })
    }

    onFieldClick(event: IPepFieldClickEvent) {
        this.openCreateParamForm('edit', event.value);
    }

    openCreateParamForm(formMode: ParameterFormType, paramName = '') {
        const paramItem = this.parameters.find(x => x.Key === paramName);
        const defaultParam: IParamemeter = {
            DefaultValue: '',
            Key: '',
            Type: 'String',
            Description: ''
        };

        // Add Accessibility field only if showAccessibility is true.
        if (this.showAccessibility) {
            defaultParam['Internal'] = false;
        }

        const parameter = { ...defaultParam, ...paramItem };
    
        const formData: IParameterFormData = {
            Parameter: parameter,
            Mode: formMode,
            ShowType: this.showType,
            ShowAccessibility: this.showAccessibility
        };

        const config = this.dialogService.getDialogConfig({}, 'large');
        config.data = new PepDialogData({
            content: ManageParameterComponent
        })
        
        this.dialogService.openDialog(ManageParameterComponent, formData, config).afterClosed().subscribe((value: IParamemeter) => {
            if (value) {
                const index = this.parameters.findIndex(param => param.Key === value.Key);
                // if the param doesn't exist, push to the end of the array, otherwise edit existing
                if (index < 0) {
                    this.parameters.push(value);
                }
                else {
                    this.parameters.splice(index, 1, value);
                }

                this.notifyParametersChange();
            }
        });
    }

    showDeleteDialog(paramName: string) {
        const dataMsg = new PepDialogData({
            title: this.translate.instant('MANAGE_PARAMETERS.DELETE_DIALOG_TITLE', { param_name: paramName }),
            actionsType: 'cancel-delete',
            content: this.translate.instant('MANAGE_PARAMETERS.DELETE_DIALOG_CONTENT')
        });

        this.dialogService.openDefaultDialog(dataMsg).afterClosed().subscribe(async (isDeletePressed) => {
            if (isDeletePressed) {
                const index = this.parameters.findIndex(x => x.Key === paramName);
                if (index > -1) {
                    this.parameters.splice(index, 1);
                    this.notifyParametersChange();
                }
            }
        });
    }
}
