import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PepColorService, PepSizeType } from '@pepperi-addons/ngx-lib';
import { PepColorSettings } from './color-settings.model';

@Component({
    selector: 'pep-color-settings',
    templateUrl: './color-settings.component.html',
    styleUrls: ['./color-settings.component.scss']
})
export class ColorSettingsComponent implements OnInit {
    @Input() title = '';
    @Input() checkAAComplient = true;
    @Input() showAAComplient = true;
    @Input() titleSize: PepSizeType = 'xl';

    private _color: PepColorSettings = new PepColorSettings();
    @Input()
    set color(value: PepColorSettings) {
        if (!value) {
            this._color = new PepColorSettings();
        } else {
            this._color = value;
        }
    }
    get color(): PepColorSettings {
        return this._color;
    }

    @Output()
    colorChange: EventEmitter<PepColorSettings> = new EventEmitter<PepColorSettings>();
    
    constructor(private pepColorService: PepColorService) { }

    ngOnInit() {
        //
    }

    private getRGBAcolor(colorObj: PepColorSettings, opac: number | null = null) {
        let rgba = 'rgba(255,255,255,0)';

        if (colorObj) {
            const color = colorObj.value;
            let opacity = opac != null ? opac : colorObj.opacity;

            opacity = opacity > 0 ? opacity / 100 : 0;

            const hsl = this.pepColorService.hslString2hsl(color);
            const rgb = this.pepColorService.hsl2rgb(hsl);
            rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
        }

        return rgba;
    }

    private raiseColorChange() {
        this.colorChange.emit(this.color);
    }

    getSliderBackground() {
        const alignTo = 'right';
    
        const colorObj = new PepColorSettings();
    
        colorObj.value = this.color.value;
        colorObj.opacity = 100;
    
        const gradStr = this.getRGBAcolor(colorObj, 0) + ' , ' + this.getRGBAcolor(colorObj);
    
        return 'linear-gradient(to ' + alignTo + ', ' + gradStr + ')';
    }

    onUseChanged(value: boolean) {
        this.color.use = value;
        this.raiseColorChange();
    }

    onColorChanged(value: string) {
        this.color.value = value;
        this.raiseColorChange();
    }
    
    onSliderInputChanged(value: number) {
        this.color.opacity = value;
    }

    onSliderValueChanged(value: number) {
        this.color.opacity = value;
        this.raiseColorChange();
    }
}
