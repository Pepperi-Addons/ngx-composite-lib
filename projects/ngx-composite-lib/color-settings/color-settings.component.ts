import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PepColorService } from '@pepperi-addons/ngx-lib';
import { PepColorSettings } from './color-settings.model';

@Component({
    selector: 'pep-color-settings',
    templateUrl: './color-settings.component.html',
    styleUrls: ['./color-settings.component.scss']
})
export class ColorSettingsComponent implements OnInit {

    @Input() title: string = '';

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

    ngOnInit(): void {
    }

    private getRGBAcolor(colorObj: PepColorSettings, opac: number | null = null) {
        let rgba = 'rgba(255,255,255,0)';

        if (colorObj) {
            let color = colorObj.value;
            let opacity = opac != null ? opac : colorObj.opacity;

            opacity = opacity > 0 ? opacity / 100 : 0;

            let hsl = this.pepColorService.hslString2hsl(color);
            let rgb = this.pepColorService.hsl2rgb(hsl);
            rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
        }

        return rgba;
    }

    private raiseColorChange() {
        this.colorChange.emit(this.color);
    }

    getSliderBackground() {
        let alignTo = 'right';
    
        let colorObj = new PepColorSettings();
    
        colorObj.value = this.color.value;
        colorObj.opacity = 100;
    
        let gradStr = this.getRGBAcolor(colorObj, 0) + ' , ' + this.getRGBAcolor(colorObj);
    
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

    onSliderValueChanged(value: number) {
        this.color.opacity = value;
        this.raiseColorChange();
    }
}
