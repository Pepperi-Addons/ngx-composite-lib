import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    
    shadowTypes: Array<PepButton> = [];

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('SHADOW_SETTINGS.TYPE_SOFT').toPromise().then((typeSoft) => {
            this.shadowTypes = [
                { key: 'Soft', value: typeSoft, callback: () => this.onTypeChange('Soft') },
                { key: 'Regular', value: this.translate.instant('SHADOW_SETTINGS.TYPE_REGULAR'), callback: () => this.onTypeChange('Regular') }
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

    onTypeChange(value: PepShadowIntensityType) {
        this.shadow.type = value;
        this.raiseShadowChange();
    }

    onIntensityChanged(value: number) {
        this.shadow.intensity = value;
        this.raiseShadowChange();
    }
}
