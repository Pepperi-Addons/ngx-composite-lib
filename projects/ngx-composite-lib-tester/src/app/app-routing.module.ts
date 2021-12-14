import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsExampleComponent } from './components-example/components-example.component';

const routes: Routes = [
    // {
    //     path: `other-example`,
    //     component: OtherExampleComponent,
    // },
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
