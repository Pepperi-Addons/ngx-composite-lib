import { NgModule } from '@angular/core';
// import { TranslateModule } from '@ngx-translate/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { PepResetConfigurationFieldDirective } from './core/common/directives/reset-configuration-field.directive';


const utilitiesList = [
    PepResetConfigurationFieldDirective
];

@NgModule({
    declarations: [
        utilitiesList
    ],
    imports: [
        // CommonModule, HttpClientModule, ReactiveFormsModule
    ],
    exports: [
        utilitiesList
        // TranslateModule
    ]
})
export class PepNgxCompositeLibModule { }
