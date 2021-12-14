import { Component, OnInit } from '@angular/core';
import {
    PepCustomizationService,
    PepLoaderService,
    PepLayoutService,
    PepStyleType,
} from '@pepperi-addons/ngx-lib';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    footerHeight: number = 0;
    showLoader = false;
    showHeader = true;
    showSidebar = false;
    addPadding = true;

    constructor(
        public customizationService: PepCustomizationService,
        public loaderService: PepLoaderService,
        public layoutService: PepLayoutService,
    ) {
        // this.loaderService.show();
        this.loaderService.onChanged$.subscribe((show) => {
            this.showLoader = show;
        });
    }

    ngOnInit() {
        this.customizationService.setThemeVariables();
        this.customizationService.hideSettings();

        this.customizationService.footerHeight.subscribe((footerHeight) => {
            this.footerHeight = footerHeight;
        });
    }

    getTopBarStyle() {
        return document.documentElement.style.getPropertyValue(
            PepCustomizationService.STYLE_TOP_HEADER_KEY
        ) as PepStyleType;
    }

    navigateHome() {
        alert('Home');
    }

}
