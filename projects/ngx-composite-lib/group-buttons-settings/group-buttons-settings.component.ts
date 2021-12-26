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

    @Input() header: string = '';
    @Input() subHeader: string = '';

    @Input() groupType: PepGroupbuttonsTypes = 'sizes'; 
    @Input() btnsArray: Array<PepButton> = [];
    @Input() excludeKeys: Array<string> = []; // for example ['xs','xl']

    @Input() useNone: boolean = false;
    @Input() disabled: boolean = false;

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
    
    pepB: PepSizeType | 'none' = "xs";

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void { 
        // Get the first translation for load all translations.
        this.translate.get('SHADOW_SETTINGS.INTENSITY_SOFT').toPromise().then((typeSoft) => {
            
            this.none = { key: 'none', value: this.translate.instant('GENERAL.NONE'), callback: () => this.onKeyChange('none') };
            
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

    onKeyChange(value: any ) {
        this.btnKey = value;
        this.btnkeyChange.emit(this.btnKey);
    }

    getButtonsArray() {
        switch(this.groupType){
            case 'custom':{
                return this.btnsArray;
            }
            case 'sizes':{
                return [
                    { key: 'xs', value: this.translate.instant('GENERAL.XS'), callback: () => this.onKeyChange('xs') },
                    { key: 'sm', value: this.translate.instant('GENERAL.SM'), callback: () => this.onKeyChange('sm') },
                    { key: 'md', value: this.translate.instant('GENERAL.MD'), callback: () => this.onKeyChange('md') },
                    { key: 'lg', value: this.translate.instant('GENERAL.LG'), callback: () => this.onKeyChange('lg') },
                    { key: 'xl', value: this.translate.instant('GENERAL.XL'), callback: () => this.onKeyChange('xl') }
                ];
            }
            case 'vertical-align':{
                return [
                    { key: 'top', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.TOP') },
                    { key: 'middle', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.MIDDLE') },
                    { key: 'bottom', value: this.translate.instant('GENERAL.VERTICAL_ALIGN.BOTTOM') }
                ];
            }
            case 'horizontal-align': {
                return [
                    { key: 'left', iconName: 'text_align_right' },
                    { key: 'center', iconName: 'text_align_center' },
                    { key: 'right', iconName: 'text_align_left' },
                ];
            }
            case 'font-weight':{
                return [
                    { key: 'normal', value: this.translate.instant('SLIDE_EDITOR.FONT_WEIGHT.NORMAL') },
                    { key: 'bold', value: this.translate.instant('SLIDE_EDITOR.FONT_WEIGHT.BOLD') },
                    { key: 'bolder', value: this.translate.instant('SLIDE_EDITOR.FONT_WEIGHT.BOLDER') }
                ]
            }
            case 'width-sizes':{
                return [
                        { key: 'narrow', value: this.translate.instant('SLIDE_EDITOR.WIDTH_SIZE.NARROW') },
                        { key: 'regular', value: this.translate.instant('SLIDE_EDITOR.WIDTH_SIZE.REGULAR') },
                        { key: 'wide', value: this.translate.instant('SLIDE_EDITOR.WIDTH_SIZE.WIDE') }
                ];
            }

            default: {
                return [];
            }
        }
    }
}
