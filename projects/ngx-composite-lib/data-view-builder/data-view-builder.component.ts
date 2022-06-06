import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IPepDraggableItem } from '@pepperi-addons/ngx-lib/draggable-items';
import { BaseDataView, DataViewField } from '@pepperi-addons/papi-sdk';
import { PepDataViewBuilderType } from './data-view-builder.model';
import { DataViewBuilderService } from './data-view-builder.service';

@Component({
    selector: 'pep-data-view-builder',
    templateUrl: './data-view-builder.component.html',
    styleUrls: ['./data-view-builder.component.scss']
})
export class DataViewBuilderComponent implements OnInit {
    // @Input() title: string = '';
    @Input() builderTitle: string = '';
    @Input() builderTitleHint: string = '';
    
    @Input() availableFields: Array<IPepDraggableItem> = [];
    
    private _dataView!: BaseDataView;
    @Input()
    set dataView(value: BaseDataView) {
        this._dataView = value;
        this.setType();
        this.refreshAvailableFields();
    }
    get dataView() : BaseDataView {
        return this._dataView;
    }

    @Output()
    dataViewChange: EventEmitter<BaseDataView> = new EventEmitter<BaseDataView>();
    
    type: PepDataViewBuilderType = 'not-supported';
    
    emptyDropAreaId = 'emptyDropArea';
    mappedFieldsId = 'mappedFields';

    constructor(
        private dataViewBuilderService: DataViewBuilderService
    ) {
        //
    }

    private setType() {
        if (this._dataView.Type === 'Menu') {
            this.type = 'menu';
        } else if (this._dataView.Type === 'Grid') {
            this.type = 'list';
        } else if ((this._dataView.Type === 'Card') || 
                   (this._dataView.Type === 'Form') || 
                   (this._dataView.Type === 'Large') || 
                   (this._dataView.Type === 'Line')) {
            this.type = 'card';
        } else {
            this.type = 'not-supported';
        }
    }

    private setAvailableFieldPermission(field: string, disable: boolean) {
        // Find the item in the available fields
        const item = this.availableFields.find(as => as.data.key === field);
        
        // If exist disable or enable it.
        if (item) {
            item.disabled = disable;
        }
    }

    private refreshAvailableFields() {
        this.availableFields.forEach(af => af.disabled = false);
        
        if (this.dataView && this.dataView.Fields) {
            for (let index = 0; index < this.dataView.Fields.length; index++) {
                this.setAvailableFieldPermission(this.dataView.Fields[index].FieldID, true);
            }
        }
    }

    private notifyDataViewChange() {
        this.dataViewChange.emit(this.dataView);
        // console.log(this.dataView);
    }

    ngOnInit() {
        
    }

    onDragStart(event: CdkDragStart) {
        this.dataViewBuilderService.onDragStart(event);
    }

    onDragEnd(event: CdkDragEnd) {
        this.dataViewBuilderService.onDragEnd(event);
    }
    
    onFieldsChanged(fields: Array<DataViewField>) {
        this.dataView.Fields = fields;
        this.refreshAvailableFields();
        this.notifyDataViewChange();
    }
}
