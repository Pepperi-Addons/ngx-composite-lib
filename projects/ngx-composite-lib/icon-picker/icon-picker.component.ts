import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';


@Component({
    selector: 'pep-icon-picker',
    templateUrl: './icon-picker.component.html',
    styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

    @Input() disabled = false;
    @Input() header = '';
    @Input() preview_header = '';
    @Input() select_btn_header = '';
    @Input() dir: 'rtl' | 'ltr' = 'ltr';
    @Input() iconURL = '';

    @Output()
    iconChange: EventEmitter<any> = new EventEmitter<any>();
    
    constructor(
        private viewContainerRef: ViewContainerRef,
        private addonBlockLoaderService: PepAddonBlockLoaderService) { }

    ngOnInit() {
        // Do nothing.
    }

    openIconPickerDialog() {
        const dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
            container: this.viewContainerRef,
            name: 'AssetPicker',
            hostObject: {
                selectionType: 'single',
                allowedAssetsTypes: 'images',
                inDialog: true
            },
            size: 'large',
            hostEventsCallback: async (event) => {
                if (event.action === 'on-done') {
                    this.iconChange.emit(event);
                    dialogRef?.close();
                } else if (event.action === 'on-cancel') {
                    dialogRef?.close();
                }
            }
        });
    }
}
