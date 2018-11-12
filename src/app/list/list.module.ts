import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list.component';

import {
    L10nConfig,
    TranslationService,
    LocalizationModule,
    CollatorModule,
    ProviderType
} from 'angular-l10n';

const l10nConfig: L10nConfig = {
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './assets/locale-' },
            { type: ProviderType.Static, prefix: './assets/locale-list-' },
            { type: ProviderType.Static, prefix: './assets/locale-position-' }
        ],
        composedKeySeparator: '.',
        missingValue: 'No key'
    }
};

@NgModule({
    imports: [
        ListRoutingModule,
        SharedModule,
        LocalizationModule.forChild(l10nConfig), // New instance of TranslationService.
        CollatorModule // New instance of Collator.
    ],
    declarations: [ListComponent]
})
export class ListModule {

    constructor(public translation: TranslationService) {
        this.translation.init();
    }

}
