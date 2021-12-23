import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepSizeType } from '@pepperi-addons/ngx-lib';
import { IPepButtonClickEvent, PepButton } from '@pepperi-addons/ngx-lib/button';

@Component({
    selector: 'pep-group-buttons-settings',
    templateUrl: './group-buttons-settings.component.html',
    styleUrls: ['./group-buttons-settings.component.scss']
})
export class GroupButtonsSettingsComponent implements OnInit {

    @Input() btnTitle: string = '';
    @Input() btnSubHeader: string = '';
    
    private _btnKey: any;
    @Input()
    set btnKey(value: any) {
        if (!value) {
            this._btnKey = '';
        } else {
            this._btnKey = value;
        }
    }
    get btnKey(): any {
        return this._btnKey;
    }

    @Output()
    btnkeyChange: EventEmitter<IPepButtonClickEvent> = new EventEmitter<IPepButtonClickEvent>();
    
    shadowSizes: Array<PepButton> = [];
    shadowIntensities: Array<PepButton> = [];

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('SHADOW_SETTINGS.INTENSITY_SOFT').toPromise().then((typeSoft) => {
            this.shadowSizes = [
                { key: 'sm', value: this.translate.instant('GENERAL.SM'), callback: () => this.onKeyChange('sm') },
                { key: 'md', value: this.translate.instant('GENERAL.MD'), callback: () => this.onKeyChange('md') },
                { key: 'lg', value: this.translate.instant('GENERAL.LG'), callback: () => this.onKeyChange('lg') },
                { key: 'xl', value: this.translate.instant('GENERAL.XL'), callback: () => this.onKeyChange('xl') }
            ];
        });
    }


    onKeyChange(value: PepSizeType) {
        this.btnKey = value;
        this.btnkeyChange.emit(this.btnKey);
    }
}
