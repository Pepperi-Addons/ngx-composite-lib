import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsExampleComponent } from './components-example/components-example.component';
import { GenericListExampleComponent } from './generic-list-example/generic-list-example.component';

const routes: Routes = [
    {
        path: `generic-list-example`,
        component: GenericListExampleComponent,
    },
    {
        path: '**',
        component: ComponentsExampleComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
