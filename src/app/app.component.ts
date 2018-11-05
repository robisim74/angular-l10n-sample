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

    countryMenuItems: any[] = [
        { text: 'United States', language: 'en', country: 'US', numberingSystem: 'latn' },
        { text: 'United Kingdom', language: 'en', country: 'GB', numberingSystem: 'latn' },
        { text: 'Italia', language: 'it', country: 'IT', numberingSystem: 'latn' },
        { text: 'المملكة العربية السعودية', language: 'ar', country: 'SA', numberingSystem: 'arab' },
        { text: 'المملكة العربية السعودية - Arabic', language: 'ar', country: 'SA', numberingSystem: 'latn' }
    ];

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    get currentNumberingSystem(): string {
        return this.locale.getCurrentNumberingSystem();
    }

    dir: Direction;

    constructor(public locale: LocaleService, public translation: TranslationService, public title: Title) { }

    ngOnInit(): void {
        this.translation.translationChanged().subscribe(
            () => {
                this.title.setTitle(this.translation.translate('App.Title'));
                this.dir = this.locale.getLanguageDirection() as Direction;
            }
        );

        // Changes currency when default locale changes and for localized routing.
        this.locale.defaultLocaleChanged.subscribe(() => {
            switch (this.locale.getCurrentLocale()) {
                case 'en-US':
                    this.locale.setCurrentCurrency('USD');
                    break;
                case 'en-GB':
                    this.locale.setCurrentCurrency('GBP');
                    break;
                case 'it-IT':
                    this.locale.setCurrentCurrency('EUR');
                    break;
                case 'ar-SA':
                    this.locale.setCurrentCurrency('SAR');
                    break;
            }
        });

        // Initialzes numbering system for localized routing.
        switch (this.locale.getCurrentLocale()) {
            case 'en-US':
                this.locale.setCurrentNumberingSystem('latn');
                break;
            case 'en-GB':
                this.locale.setCurrentNumberingSystem('latn');
                break;
            case 'it-IT':
                this.locale.setCurrentNumberingSystem('latn');
                break;
            case 'ar-SA':
                this.locale.setCurrentNumberingSystem('arab');
                break;
        }
    }

    selectLocale(language: string, country: string, numberingSystem: string): void {
        this.locale.setDefaultLocale(language, country, '', numberingSystem);
    }

}
