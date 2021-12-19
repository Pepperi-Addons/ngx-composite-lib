import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepSizeType } from '@pepperi-addons/ngx-lib';
import { IPepButtonClickEvent, PepButton } from '@pepperi-addons/ngx-lib/button';
import { PepShadowIntensityType, PepShadowSettings } from './shadow-settings.model';

@Component({
    selector: 'pep-shadow-settings',
    templateUrl: './shadow-settings.component.html',
    styleUrls: ['./shadow-settings.component.scss']
})
export class ShadowSettingsComponent implements OnInit {

    private _shadow: PepShadowSettings = new PepShadowSettings();
    @Input()
    set shadow(value: PepShadowSettings) {
        if (!value) {
            this._shadow = new PepShadowSettings();
        } else {
            this._shadow = value;
        }
    }
    get shadow(): PepShadowSettings {
        return this._shadow;
    }

    @Output()
    shadowChange: EventEmitter<PepShadowSettings> = new EventEmitter<PepShadowSettings>();
    
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
                { key: 'sm', value: this.translate.instant('GENERAL.SM'), callback: () => this.onSizeChange('sm') },
                { key: 'md', value: this.translate.instant('GENERAL.MD'), callback: () => this.onSizeChange('md') },
                { key: 'lg', value: this.translate.instant('GENERAL.LG'), callback: () => this.onSizeChange('lg') },
                { key: 'xl', value: this.translate.instant('GENERAL.XL'), callback: () => this.onSizeChange('xl') }
            ];

            this.shadowIntensities = [
                { key: 'soft', value: typeSoft, callback: () => this.onIntensityChange('soft') },
                { key: 'regular', value: this.translate.instant('SHADOW_SETTINGS.INTENSITY_REGULAR'), callback: () => this.onIntensityChange('regular') },
                { key: 'hard', value: this.translate.instant('SHADOW_SETTINGS.INTENSITY_HARD'), callback: () => this.onIntensityChange('hard') }
            ];
        });
    }


    private raiseShadowChange() {
        this.shadowChange.emit(this.shadow);
    }

    onUseChanged(value: boolean) {
        this.shadow.use = value;
        this.raiseShadowChange();
    }

    onSizeChange(value: PepSizeType) {
        this.shadow.size = value;
        this.raiseShadowChange();
    }

    onIntensityChange(value: PepShadowIntensityType) {
        this.shadow.intensity = value;
        this.raiseShadowChange();
    }
}
