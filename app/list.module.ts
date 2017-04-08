import { NgModule } from '@angular/core';

import { routing } from './list.routes';
import { SharedModule } from './shared/shared.module';
import { ListComponent } from './list.component';

import { LocalizationModule } from 'angular-l10n';

@NgModule({
    imports: [
        routing,
        SharedModule,
        LocalizationModule.forChild() // New instance of TranslationService.
    ],
    declarations: [ListComponent]
})
export class ListModule { }
