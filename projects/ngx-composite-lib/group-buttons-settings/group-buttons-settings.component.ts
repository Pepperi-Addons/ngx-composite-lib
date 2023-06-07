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
    @Input() dir: 'rtl' | 'ltr' = 'ltr';
    
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
    defaultCallback = (event: any) => this.onKeyChange(event);

    // pepB: PepSizeType | 'none' = "xs";

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('GENERAL.NONE').subscribe((res) => {
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
                // Set default callback if not exist.
                for (let index = 0; index < this.btnsArray.length; index++) {
                    const btn = this.btnsArray[index];
                    
                    if (!btn.callback) {
                        btn.callback = this.defaultCallback;
                    }
                }

                return this.btnsArray;
            }
            case 'sizes':{
                return [
                    { key: 'xs', value: this.translate.instant('GENERAL.XS'), callback: this.defaultCallback },
                    { key: 'sm', value: this.translate.instant('GENERAL.SM'), callback: this.defaultCallback },
                    { key: 'md', value: this.translate.instant('GENERAL.MD'), callback: this.defaultCallback },
                    { key: 'lg', value: this.translate.instant('GENERAL.LG'), callback: this.defaultCallback },
                    { key: 'xl', value: this.translate.instant('GENERAL.XL'), callback: this.defaultCallback }
                ];
            }
            case 'vertical-align':{
                return [
                    { key: 'start', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.TOP'), callback: (event: IPepButtonClickEvent) => this.onKeyChange(event) },
                    { key: 'middle', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.MIDDLE'), callback: (event: IPepButtonClickEvent) => this.onKeyChange(event) },
                    { key: 'end', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.BOTTOM'), callback: (event: IPepButtonClickEvent) => this.onKeyChange(event) }
                ];
            }
            case 'left-right-arrows':{
                return [
                    { key: 'left', iconName: 'arrow_left_alt', callback: this.defaultCallback },
                    { key: 'right', iconName: 'arrow_right_alt', callback: this.defaultCallback }
                ];
            }
            case 'horizontal-align': {
                return [
                    { key: 'left', iconName: 'text_align_right', callback: this.defaultCallback },
                    { key: 'center', iconName: 'text_align_center', callback: this.defaultCallback },
                    { key: 'right', iconName: 'text_align_left', callback: this.defaultCallback },
                ];
            }
            case 'font-weight':{
                return [
                    { key: 'regular', value: this.translate.instant('GENERAL.FONT_WEIGHT.REGULAR'), callback: this.defaultCallback },
                    { key: 'bold', value: this.translate.instant('GENERAL.FONT_WEIGHT.BOLD'), callback: this.defaultCallback },
                    { key: 'bolder', value: this.translate.instant('GENERAL.FONT_WEIGHT.BOLDER'), callback: this.defaultCallback }
                ]
            }
            case 'width-sizes':{
                return [
                    { key: 'narrow', value: this.translate.instant('GENERAL.WIDTH_SIZE.NARROW'), callback: this.defaultCallback },
                    { key: 'regular', value: this.translate.instant('GENERAL.WIDTH_SIZE.REGULAR'), callback: this.defaultCallback },
                    { key: 'wide', value: this.translate.instant('GENERAL.WIDTH_SIZE.WIDE'), callback: this.defaultCallback }
                ];
            }

            default: {
                return [];
            }
        }
    }
}
