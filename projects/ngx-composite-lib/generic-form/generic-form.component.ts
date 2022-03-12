import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    PepDataConvertorService,
    PepLayoutService,
    UIControl,
    ObjectsDataRow,
    ObjectsDataRowCell,
    PepGuid
} from '@pepperi-addons/ngx-lib';
import { IPepFormFieldValueChangeEvent } from '@pepperi-addons/ngx-lib/form';
import {
    IPepGenericFormDataSource,
    IPepGenericFormDataView,
    IPepGenericFormValueChange
} from './generic-form.model';

import { DataViewConverter } from '@pepperi-addons/data-views';
import { FormDataView } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import { PepGenericFormService } from './generic-form.service';

const NUM_OF_FORM_COLUMNS = 2;

@Component({
    selector: 'pep-generic-form',
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnInit {
    @Input()
    set dataSource(val: IPepGenericFormDataSource) {
        this._genericFormService.setDataSource(val);
    }

    @Input()
    set dataView(val: FormDataView) {
        this._genericFormService.setUiControl(val);
    };

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
       // console.log('onValueChanged event', event);
        //console.log('onValueChanged output', field);
    }

    onfieldClicked(event: any) {
        const field: IPepGenericFormValueChange = {
            uid: event.id,
            apiName: event.key,
            value: event.value
        };
        this._genericFormService.updateFieldValue(field);
        this.fieldClick.emit(field);

        //console.log('onfieldClicked event', event);
        //console.log('onfieldClicked output', field);
    }


}
