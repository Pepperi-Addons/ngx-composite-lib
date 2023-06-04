import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IPepButtonClickEvent } from '@pepperi-addons/ngx-lib/button';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { IPepDraggableItem } from '@pepperi-addons/ngx-lib/draggable-items';
import { DataViewField, MenuDataViewField } from '@pepperi-addons/papi-sdk';
import { DataViewBuilderService } from '../data-view-builder.service';

@Component({
    selector: 'menu-data-view',
    templateUrl: './menu-data-view.component.html',
    styleUrls: ['./menu-data-view.component.scss']
})
export class MenuDataViewComponent implements OnInit {
    @ViewChild('separatorTitleModalTemplate', { read: TemplateRef }) separatorTitleModalTemplate!: TemplateRef<any>;

    @Input() 
    fields: Array<DataViewField> = []; // The data view fields.

    @Input()
    availableFieldsTitles: Map<string, string> = new Map<string, string>(); // <FieldID, Original Title> from the available fields.

    @Input() 
    emptyDropAreaId = '';

    @Input() 
    mappedFieldsId = '';

    @Input()
    showAddSeparator = true;

    @Input()
    itemKeyLabel = '';

    @Input()
    itemTitleLabel = '';

    @Output()
    fieldsChange: EventEmitter<DataViewField[]> = new EventEmitter<DataViewField[]>();
    
    isGrabbing = false;
    private dialogRef: MatDialogRef<any> | null = null;
    
    constructor(
        private translate: TranslateService,
        private dialogService: PepDialogService,
        private dataViewBuilderService: DataViewBuilderService
    ) { 
        this.dataViewBuilderService.isGrabbingChange$.subscribe((value) => {
            this.isGrabbing = value;
        });
    }
    
    private addNewField(draggableItem: IPepDraggableItem, index: number) {
        // Add new menuField to the mappedFields.
        const menuField: MenuDataViewField = { FieldID: draggableItem.data.key, Title: draggableItem.title };
        this.spliceMappedFields(index, 0, menuField);
    }
    
    private spliceMappedFields(start: number, deleteCount: number, item?: MenuDataViewField) {
        if (item) {
            this.fields.splice(start, deleteCount, item);
        } else {
            this.fields.splice(start, deleteCount);
        }

        this.notifyFieldsChange();
    }

    private changeTitle(menuField: MenuDataViewField, title: string) {
        menuField.Title = title;
        this.notifyFieldsChange();
    }

    private notifyFieldsChange() {
        this.fieldsChange.emit(this.fields);
    }

    ngOnInit() {
        if(this.itemKeyLabel == ''){
            this.translate.get('DATA_VIEW_BUILDER.MENU_ITEM_KEY_TITLE').toPromise().then((res) => {
                this.itemKeyLabel = res;
            });
        }
        if(this.itemTitleLabel == ''){
            this.translate.get('DATA_VIEW_BUILDER.MENU_ITEM_VALUE_TITLE').toPromise().then((res) => {
                this.itemTitleLabel = res;
            });
        }
    }

    addSeparator(index: number) {
        const menuField: MenuDataViewField = { FieldID: '', Title: '' };
        this.spliceMappedFields(index, 0, menuField);
    }

    onDragStart(event: CdkDragStart) {
        this.dataViewBuilderService.onDragStart(event);
    }

    onDragEnd(event: CdkDragEnd) {
        this.dataViewBuilderService.onDragEnd(event);
    }
    
    onDropField(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.notifyFieldsChange();
        } else if (event.container.id === 'emptyDropArea') {
            this.addNewField(event.previousContainer.data[event.previousIndex], this.fields.length);
        } else {
            this.addNewField(event.previousContainer.data[event.previousIndex], event.currentIndex);
        }
    }

    onTitleChanged(event: string, menuField: MenuDataViewField) {
        this.changeTitle(menuField, event);
    }

    onDeleteMappedField(event: IPepButtonClickEvent, menuField: MenuDataViewField) {
        const index = this.fields.findIndex(ms => ms === menuField);
        if (index > -1) {
            this.spliceMappedFields(index, 1);
        }
    }

    onEditSeparatorField(event: IPepButtonClickEvent, menuField: MenuDataViewField) {
        this.dialogRef = this.dialogService.openDialog(this.separatorTitleModalTemplate, { value: menuField.Title });
        this.dialogRef.afterClosed().subscribe((titleValue) => {
            if (titleValue !== undefined) {
                this.changeTitle(menuField, titleValue);
            }
        });
    }

    setDialogValue(value: string) {
        this.closeDialog(value);
    }

    closeDialog(value: string | undefined = undefined) {
        this.dialogRef?.close(value);
    }
}