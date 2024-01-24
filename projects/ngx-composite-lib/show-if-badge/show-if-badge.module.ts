import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PepNgxLibModule, PepAddonService } from '@pepperi-addons/ngx-lib';
import { PepIconModule, PepIconRegistry, pepIconSystemView} from '@pepperi-addons/ngx-lib/icon';

import { TranslateModule } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { ShowIfBadgeComponent } from './show-if-badge.component';

const pepIcons = [
    pepIconSystemView
];

@NgModule({
    declarations: [
        ShowIfBadgeComponent
    ],
    imports: [
        CommonModule,
        PepNgxLibModule,
        PepIconModule,
        MatIconModule,
        MatBadgeModule,
        TranslateModule.forChild(),
    ],
    exports: [ShowIfBadgeComponent]
})
export class PepShowIfBadgeModule { 

constructor(
    private pepIconRegistry: PepIconRegistry
    ) {
        this.pepIconRegistry.registerIcons(pepIcons);
    }
}
