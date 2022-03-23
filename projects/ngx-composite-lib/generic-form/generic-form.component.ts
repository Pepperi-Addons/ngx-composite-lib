import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { PepLayoutService } from '@pepperi-addons/ngx-lib';
import {
    IPepGenericFormDataView,
    IPepGenericFormValueChange
} from './generic-form.model';
import { PepGenericFormService } from './generic-form.service';


@Component({
    selector: 'pep-generic-form',
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnInit {
    @Input()
    set dataSource(val: any) {
        this._genericFormService.setDataSource(val);
    }

    @Input()
    set dataView(val: IPepGenericFormDataView) {
        this._genericFormService.setUiControl(val);
    }

    @Input()
    set isLocked(val: boolean) {
        this._genericFormService.isLocked = val;
    }

    get isLocked() {
        return this._genericFormService.isLocked;
    }

    @Input()
    inline = false;

    @Input()
    showTopBar = false;

    @Input()
    addPadding = false;

    @Output()
    valueChange: EventEmitter<IPepGenericFormValueChange> = new EventEmitter<IPepGenericFormValueChange>();

    @Output()
    fieldClick: EventEmitter<IPepGenericFormValueChange> = new EventEmitter<IPepGenericFormValueChange>();

    @Output()
    formValidationChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    get uiControl() {
        return this._genericFormService.uiControl;
    }

    get data() {
        return this._genericFormService.data;
    }


    constructor(
        private layoutService: PepLayoutService,
        public _genericFormService: PepGenericFormService
    ) {
        this.layoutService.onResize$.pipe().subscribe((size) => {
            //            
        });
    }

    ngOnInit() {
        //
    }

    onValueChanged(event: any) {
        const field: IPepGenericFormValueChange = {
            uid: event.id,
            apiName: event.key,
            value: event.value
        };
        this._genericFormService.updateFieldValue(field);
        this.valueChange.emit(field);
    }

    onfieldClicked(event: any) {
        const field: IPepGenericFormValueChange = {
            uid: event.id,
            apiName: event.key,
            value: event.value
        };
        this._genericFormService.updateFieldValue(field);
        this.fieldClick.emit(field);
    }

    onFormValidationChanged(event: any) {
        this.formValidationChange.emit(event);
    }


}
