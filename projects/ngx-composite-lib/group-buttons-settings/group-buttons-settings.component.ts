import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepSizeType } from '@pepperi-addons/ngx-lib';
import { IPepButtonClickEvent, PepButton } from '@pepperi-addons/ngx-lib/button';
import { PepGroupbuttonsTypes } from './group-buttons-settings.model';

@Component({
    selector: 'pep-group-buttons-settings',
    templateUrl: './group-buttons-settings.component.html',
    styleUrls: ['./group-buttons-settings.component.scss']
})
export class GroupButtonsSettingsComponent implements OnInit {

    @Input() header = '';
    @Input() subHeader = '';

    @Input() groupType: PepGroupbuttonsTypes = 'sizes'; 
    @Input() btnsArray: Array<PepButton> = [];
    @Input() excludeKeys: Array<string> = []; // for example ['xs','xl']

    @Input() useNone = false;
    @Input() disabled = false;

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
    
    
    none: PepButton = {key: 'none'};
    
    sizes: Array<PepButton> = [];
    
    // pepB: PepSizeType | 'none' = "xs";

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('SHADOW_SETTINGS.INTENSITY_SOFT').toPromise().then((typeSoft) => {
            
            this.none = { key: 'none', value: this.translate.instant('GENERAL.NONE'), callback: () => this.onKeyChange(null) };
            
            this.arrayMerge();
        });
    }

    arrayMerge(){

        this.btnsArray = this.getButtonsArray();
        
        // check if need to remove items from the buttons array
        if(this.excludeKeys){
            this.btnsArray = this.btnsArray.filter(i => !this.excludeKeys.find(f => f === i.key));
        }
        // check if need to add the None button
        if(this.useNone){
            this.btnsArray = [this.none].concat(this.btnsArray);
        }
    }

    onKeyChange(event: IPepButtonClickEvent | null) {
        this.btnKey = event?.source?.key || 'none';
        this.btnkeyChange.emit(this.btnKey);
    }

    getButtonsArray() {
        switch(this.groupType){
            case 'custom':{
                return this.btnsArray;
            }
            case 'sizes':{
                return [
                    { key: 'xs', value: this.translate.instant('GENERAL.XS'), callback: (event: any) => this.onKeyChange(event) },
                    { key: 'sm', value: this.translate.instant('GENERAL.SM'), callback: (event: any) => this.onKeyChange(event) },
                    { key: 'md', value: this.translate.instant('GENERAL.MD'), callback: (event: any) => this.onKeyChange(event) },
                    { key: 'lg', value: this.translate.instant('GENERAL.LG'), callback: (event: any) => this.onKeyChange(event) },
                    { key: 'xl', value: this.translate.instant('GENERAL.XL'), callback: (event: any) => this.onKeyChange(event) }
                ];
            }
            case 'vertical-align':{
                return [
                    { key: 'start', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.TOP'), callback: (event: IPepButtonClickEvent) => this.onKeyChange(event) },
                    { key: 'center', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.MIDDLE'), callback: (event: IPepButtonClickEvent) => this.onKeyChange(event) },
                    { key: 'end', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.BOTTOM'), callback: (event: IPepButtonClickEvent) => this.onKeyChange(event) }
                ];
            }
            case 'horizontal-align': {
                return [
                    { key: 'left', iconName: 'text_align_right', callback: (event: any) => this.onKeyChange(event) },
                    { key: 'center', iconName: 'text_align_center', callback: (event: any) => this.onKeyChange(event) },
                    { key: 'right', iconName: 'text_align_left', callback: (event: any) => this.onKeyChange(event) },
                ];
            }
            case 'font-weight':{
                return [
                    { key: 'normal', value: this.translate.instant('GENERAL.FONT_WEIGHT.NORMAL'), callback: (event: any) => this.onKeyChange(event) },
                    { key: 'bold', value: this.translate.instant('GENERAL.FONT_WEIGHT.BOLD'), callback: (event: any) => this.onKeyChange(event) },
                    { key: 'bolder', value: this.translate.instant('GENERAL.FONT_WEIGHT.BOLDER'), callback: (event: any) => this.onKeyChange(event) }
                ]
            }
            case 'width-sizes':{
                return [
                        { key: 'narrow', value: this.translate.instant('GENERAL.WIDTH_SIZE.NARROW'), callback: (event: any) => this.onKeyChange(event) },
                        { key: 'regular', value: this.translate.instant('GENERAL.WIDTH_SIZE.REGULAR'), callback: (event: any) => this.onKeyChange(event) },
                        { key: 'wide', value: this.translate.instant('GENERAL.WIDTH_SIZE.WIDE'), callback: (event: any) => this.onKeyChange(event) }
                ];
            }

            default: {
                return [];
            }
        }
    }
}
