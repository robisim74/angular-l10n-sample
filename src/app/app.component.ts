import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';

import { LocaleService, TranslationService } from 'angular-l10n';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
/**
 * AppComponent class doesn't use decorators
 * because the view uses only directives and not the pipes to get the translation.
 */
export class AppComponent implements OnInit {

    navItems: any[] = [
        { name: 'App.Home', route: 'home' },
        { name: 'App.I18n', route: 'i18n' },
        { name: 'App.List', route: 'list' },
        { name: 'App.Validation', route: 'validation' }
    ];

    countryMenuItems: any[];

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    get currentNumberingSystem(): string {
        return this.locale.getCurrentNumberingSystem();
    }

    dir: Direction;

    constructor(public locale: LocaleService, public translation: TranslationService, public title: Title) {
        this.countryMenuItems = this.locale.getConfiguration().localizedRoutingOptions.schema;
    }

    ngOnInit(): void {
        this.translation.translationChanged().subscribe(
            () => {
                this.title.setTitle(this.translation.translate('App.Title'));
                this.dir = this.locale.getLanguageDirection() as Direction;
            }
        );
    }

    selectLocale(language: string, country: string, numberingSystem: string, currency: string): void {
        this.locale.setDefaultLocale(language, country, '', numberingSystem);
        this.locale.setCurrentCurrency(currency);
    }

}
