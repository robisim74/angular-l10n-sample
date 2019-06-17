import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';

import { LocaleService, TranslationService, SearchService, L10N_CONFIG, L10nConfigRef } from 'angular-l10n';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
/**
 * AppComponent class doesn't use decorators
 * because the view uses only directives and not the pipes to get the translation.
 */
export class AppComponent implements OnInit, OnDestroy {

    navItems: any[] = [
        { name: 'app.home', route: 'home' },
        { name: 'app.i18n', route: 'i18n' },
        { name: 'app.list', route: 'list' },
        { name: 'app.validation', route: 'validation' }
    ];

    countryMenuItems: any[];

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    get currentNumberingSystem(): string {
        return this.locale.getCurrentNumberingSystem();
    }

    dir: Direction;

    constructor(
        @Inject(L10N_CONFIG) private configuration: L10nConfigRef,
        private locale: LocaleService,
        private translation: TranslationService,
        private search: SearchService
    ) {
        this.countryMenuItems = this.configuration.localizedRouting.schema;
    }

    ngOnInit(): void {
        this.search.updateHead('app');

        this.translation.translationChanged().subscribe(
            () => {
                this.dir = this.locale.getLanguageDirection() as Direction;
            }
        );

        this.translation.translationError.subscribe((error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    ngOnDestroy(): void { }

    selectLocale(language: string, country: string, numberingSystem: string, currency: string, zoneName: string): void {
        this.locale.setDefaultLocale(language, country, '', numberingSystem);
        this.locale.setCurrentCurrency(currency);
        this.locale.setCurrentTimezone(zoneName);
    }

}
