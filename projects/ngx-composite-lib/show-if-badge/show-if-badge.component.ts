import { Component, Input, OnInit } from '@angular/core';
import { PepLayoutService } from '@pepperi-addons/ngx-lib';

@Component({
    selector: 'pep-show-if-badge',
    templateUrl: './show-if-badge.component.html',
    styleUrls: ['./show-if-badge.component.scss']
})

export class ShowIfBadgeComponent implements OnInit {
    @Input() showIf: boolean = false;
    
    protected isRtl = false;
    
    constructor(
        protected layoutService: PepLayoutService,
    ) { 
        this.isRtl = this.layoutService.isRtl();
    }

    ngOnInit(): void {
      
    }
}
