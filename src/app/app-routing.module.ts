import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { I18nComponent } from './i18n/i18n.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'i18n', component: I18nComponent },
    {
        path: 'list', loadChildren: './list/list.module#ListModule'
    },
    { path: 'validation', component: ValidationComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
