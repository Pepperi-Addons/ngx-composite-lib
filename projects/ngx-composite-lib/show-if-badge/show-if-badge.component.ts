import { Component, Input, OnInit } from '@angular/core';

import { PepLayoutService } from '@pepperi-addons/ngx-lib';
import { PepIconType, pepIconSystemView } from '@pepperi-addons/ngx-lib/icon';
import { PepColorSettings } from '@pepperi-addons/ngx-composite-lib/color-settings';


@Component({
    selector: 'pep-show-if-badge',
    templateUrl: './show-if-badge.component.html',
    styleUrls: ['./show-if-badge.component.scss']
})

export class ShowIfBadgeComponent {
    @Input() showIf = false;
   
     /**
     * If you want to show an icon in the button then select an icon form the provided icon list
     *
     * @type {PepIconType} See {@link PepIconType}
     * @memberof PepButtonComponent
     */
   @Input() iconName: PepIconType = pepIconSystemView.name;
   @Input() backgroundColor = 'hsl(0,0%,0%)';
   
    
    protected isRtl = false;
    
    constructor(protected layoutService: PepLayoutService) { 
        this.isRtl = this.layoutService.isRtl();
    }

    ngOnInit(){
        setTimeout(() => {
            const badge = document.getElementsByClassName("mat-badge-content")[0] as HTMLElement;
            badge.setAttribute('style', 'background-color:'+ this.backgroundColor + '!important');
          }, 0);
    }
}
