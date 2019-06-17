import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list.component';

import {
    L10nConfig,
    L10nLoader,
    LocalizationModule,
    LocalizationExtraModule,
    ProviderType
} from 'angular-l10n';

const l10nConfig: L10nConfig = {
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './assets/locale-' },
            { type: ProviderType.Static, prefix: './assets/locale-list-' },
            { type: ProviderType.Static, prefix: './assets/locale-position-' }
        ],
        caching: true,
        version: '8.0.0',
        rollbackOnError: true,
        composedKeySeparator: '.',
        missingValue: 'No key'
    }
};

@NgModule({
    imports: [
        ListRoutingModule,
        SharedModule,
        LocalizationModule.forChild(l10nConfig), // New instance of TranslationService.
        LocalizationExtraModule // New instance of Collator.
    ],
    declarations: [ListComponent]
})
export class ListModule {

    constructor(public l10nLoader: L10nLoader) {
        this.l10nLoader.load();
    }

}
