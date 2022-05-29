import { CdkDragStart, CdkDragEnd, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PepLoaderService } from '@pepperi-addons/ngx-lib';
import { IPepButtonClickEvent } from '@pepperi-addons/ngx-lib/button';
import { PepDialogService, PepDialogData } from '@pepperi-addons/ngx-lib/dialog';
import { IPepDraggableItem } from '@pepperi-addons/ngx-lib/draggable-items';
import { BaseDataView, MenuDataView, MenuDataViewField } from '@pepperi-addons/papi-sdk';
import { PepDataViewBuilderType, IMappedFieldBase, IMappedMenuField } from './data-view-builder.model';

@Component({
    selector: 'pep-data-view-builder',
    templateUrl: './data-view-builder.component.html',
    styleUrls: ['./data-view-builder.component.scss']
})
export class DataViewBuilderComponent implements OnInit {
    @Input() title: string = '';
    @Input() builderTitle: string = '';
    @Input() builderTitleHint: string = '';
    
    @Input() type: PepDataViewBuilderType = 'menu';
    @Input() availableFields: Array<IPepDraggableItem> = [];
    
    @Input() dataView: MenuDataView | undefined;

    @Output()
    save: EventEmitter<BaseDataView> = new EventEmitter<BaseDataView>();
    
    mappedFields: Array<IMappedMenuField> = [];
    isGrabbing = false;
    
    constructor(
        private loaderService: PepLoaderService,
        // public addonService: AddonService,
        public translate: TranslateService,
        public dialogService: PepDialogService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) {
        
    }

    private setAvailableFieldPermission(field: string, disable: boolean) {
        // Find the item in the available fields
        const item = this.availableFields.find(as => as.data === field);
        
        // If exist disable or enable it.
        if (item) {
            item.disabled = disable;
        }
    }

    private addNewField(draggableItem: IPepDraggableItem, index: number) {
        this.setAvailableFieldPermission(draggableItem.data, true);

        // Add new mappedField to the mappedFields.
        const mappedField = { fieldKey: draggableItem.data, title: draggableItem.title };
        this.mappedFields.splice(index, 0, mappedField);
    }

    private changeCursorOnDragStart() {
        document.body.classList.add('inheritCursors');
        document.body.style.cursor = 'grabbing';
        this.isGrabbing = true;
    }

    private changeCursorOnDragEnd() {
        document.body.classList.remove('inheritCursors');
        document.body.style.cursor = 'unset';
        this.isGrabbing = false;
    }
    
    private async loadData() {
        this.mappedFields = [];
        this.availableFields.forEach(af => af.disabled = false);
        
        if (this.dataView && this.dataView.Fields) {
            for (let index = 0; index < this.dataView.Fields.length; index++) {
                const field = this.dataView.Fields[index];
                this.mappedFields.push({
                    fieldKey: field.FieldID,
                    title: field.Title
                });

                this.setAvailableFieldPermission(field.FieldID, true);
            }
        }
    }

    private saveFieldsDataView(fields: MenuDataViewField[]) {
        if (this.dataView) {
            this.dataView.Fields = fields;
            this.save.emit(this.dataView);
            console.log(this.dataView);
        }
    }

    ngOnInit() {
        this.loadData();
    }

    // goBack() {
    //     this.router.navigate(['..'], {
    //         relativeTo: this.activatedRoute,
    //         queryParams: { tabIndex: 1 },
    //         queryParamsHandling: 'merge'
    //     });
    // }

    // backClicked() {
    //     this.goBack();
    // }

    saveClicked() {
        // Save the current dataview.
        const fields: MenuDataViewField[] = [];
        let showMsgNotChoosePage = false;

        // for (let index = 0; index < this.mappedFields.length; index++) {
        //     const mappedField = this.mappedFields[index];
            
        //     // Add the mapped field only if the title is selected.            
        //     if (mappedField.title) {
        //         fields.push({
        //             FieldID: mappedField.fieldKey,
        //             Title: mappedField.title
        //         });
        //     } else {
        //         showMsgNotChoosePage = true;
        //     }
        // }

        // // Show message to the user there are fields with no pages if u continue and save we delete those fields from the list.        
        // if (showMsgNotChoosePage) {
        //     this.dialogService.openDefaultDialog(new PepDialogData({
        //         title: this.translate.instant('MESSAGES.DIALOG_INFO_TITLE'),
        //         content: this.translate.instant('MESSAGES.MAPPED_FIELDS_UNMAPPED_ENTRIES_CONTENT'),
        //         actionsType: 'cancel-ok'
        //     })).afterClosed().subscribe((okPressed) => {
        //         if (okPressed) {
        //             this.saveFieldsDataView(fields);
        //             this.loadData();
        //         }
        //     });
        // } else {
            this.saveFieldsDataView(fields);
        // }
    }

    addSeparator(index: number) {
        this.mappedFields.splice(index, 0, { fieldKey: '', title: '' });
        // this.loadData();
    }

    onDragStart(event: CdkDragStart) {
        this.changeCursorOnDragStart();
    }

    onDragEnd(event: CdkDragEnd) {
        this.changeCursorOnDragEnd();
    }
    
    onDropField(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else if (event.container.id === 'emptyDropArea') {
            this.addNewField(event.previousContainer.data[event.previousIndex], this.mappedFields.length);
        } else {
            this.addNewField(event.previousContainer.data[event.previousIndex], event.currentIndex);
        }
    }

    onTitleChanged(event: string, mappedField: IMappedMenuField) {
        const index = this.mappedFields.findIndex( ms => ms.fieldKey === mappedField.fieldKey);
        this.mappedFields[index].title = event;
    }

    onDeleteMappedField(event: IPepButtonClickEvent, mappedField: IMappedMenuField) {
        const index = this.mappedFields.findIndex( ms => ms.fieldKey === mappedField.fieldKey);
        if (index > -1) {
            this.mappedFields.splice(index, 1);

            this.setAvailableFieldPermission(mappedField.fieldKey, false);
        }
    }

}
