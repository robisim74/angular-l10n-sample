import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { routing } from './list.routes';
import { SharedModule } from './shared/shared.module';
import { ListComponent } from './list.component';

import { LocalizationModule } from 'angular-l10n';

@NgModule({
    imports: [
        routing,
        SharedModule,
        MaterialModule,
        LocalizationModule.forChild() // New instance of TranslationService.
    ],
    declarations: [ListComponent]
})
export class ListModule { }
