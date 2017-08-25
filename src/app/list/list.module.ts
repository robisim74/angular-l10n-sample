import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list.component';

import {
    L10nConfig,
    L10nLoader,
    LocalizationModule,
    ProviderType
} from 'angular-l10n';

const l10nConfig: L10nConfig = {
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './src/assets/locale-' },
            { type: ProviderType.Static, prefix: './src/assets/locale-list-' },
            { type: ProviderType.Static, prefix: './src/assets/locale-position-' }
        ],
        composedKeySeparator: '.',
        missingValue: 'No key'
    }
};

@NgModule({
    imports: [
        ListRoutingModule,
        SharedModule,
        LocalizationModule.forChild(l10nConfig) // New instance of TranslationService.
    ],
    declarations: [ListComponent]
})
export class ListModule {

    constructor(public l10nLoader: L10nLoader) {
        this.l10nLoader.load();
    }

}
