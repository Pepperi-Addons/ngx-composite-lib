import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PepColorService } from '@pepperi-addons/ngx-lib';
import { PepBorderSettings } from './border-settings.model';

@Component({
    selector: 'pep-border-settings',
    templateUrl: './border-settings.component.html',
    styleUrls: ['./border-settings.component.scss']
})
export class BorderSettingsComponent implements OnInit {

    private _border: PepBorderSettings = new PepBorderSettings();
    @Input()
    set border(value: PepBorderSettings) {
        if (!value) {
            this._border = new PepBorderSettings();
        } else {
            this._border = value;
        }
    }
    get border(): PepBorderSettings {
        return this._border;
    }

    @Output()
    borderChange: EventEmitter<PepBorderSettings> = new EventEmitter<PepBorderSettings>();
    
    constructor(
        private pepColorService: PepColorService
        ) { }

    ngOnInit(): void {
    }

    private getRGBAcolor(colObj: PepBorderSettings, opac: number | null = null) {
        let rgba = 'rgba(255,255,255,0';

        if (colObj) {
            let color = colObj.color;
            let opacity = opac != null ? opac : colObj.opacity;

            opacity = opacity > 0 ? opacity / 100 : 0;

            let hsl = this.pepColorService.hslString2hsl(color);
            let rgb = this.pepColorService.hsl2rgb(hsl);
            rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
        }

        return rgba;
    }

    private raiseBorderChange() {
        this.borderChange.emit(this.border);
    }

    getSliderBackground() {
        let alignTo = 'right';
    
        let border = new PepBorderSettings();
    
        border.color = this.border.color;
        border.opacity = 100;
    
        let gradStr = this.getRGBAcolor(border, 0) + ' , ' + this.getRGBAcolor(border);
    
        return 'linear-gradient(to ' + alignTo + ', ' + gradStr + ')';
    }

    onUseBorderChanged(value: boolean) {
        this.border.useBorder = value;
        this.raiseBorderChange();
    }

    onColorChanged(value: string) {
        this.border.color = value;
        this.raiseBorderChange();
    }

    onSliderValueChanged(value: number) {
        this.border.opacity = value;
        this.raiseBorderChange();
    }
}
