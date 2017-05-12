import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list.component';

import { LocalizationModule, TranslationService } from 'angular-l10n';

@NgModule({
    imports: [
        ListRoutingModule,
        SharedModule,
        LocalizationModule.forChild() // New instance of TranslationService.
    ],
    declarations: [ListComponent]
})
export class ListModule {

    constructor(public translation: TranslationService) {
        this.translation.addConfiguration()
            .addProvider('./src/assets/locale-list-')
            .addProvider('./src/assets/locale-position-');
        this.translation.init();
    }

}
