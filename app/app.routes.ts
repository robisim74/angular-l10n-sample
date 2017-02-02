import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home.component';
import { I18nComponent } from './i18n.component';
import { ValidationComponent } from './validation.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'i18n', component: I18nComponent },
    {
        path: 'list', loadChildren: './list.module#ListModule'
    },
    { path: 'validation', component: ValidationComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules
});
