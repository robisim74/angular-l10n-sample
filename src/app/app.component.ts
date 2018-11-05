import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';

import { LocaleService, TranslationService } from 'angular-l10n';

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
        { name: 'App.Home', route: 'home' },
        { name: 'App.I18n', route: 'i18n' },
        { name: 'App.List', route: 'list' },
        { name: 'App.Validation', route: 'validation' }
    ];

    countryMenuItems: any[] = [
        { text: 'United States', language: 'en', country: 'US', currency: 'USD', numberingSystem: 'latn' },
        { text: 'United Kingdom', language: 'en', country: 'GB', currency: 'GBP', numberingSystem: 'latn' },
        { text: 'Italia', language: 'it', country: 'IT', currency: 'EUR', numberingSystem: 'latn' },
        { text: 'المملكة العربية السعودية', language: 'ar', country: 'SA', currency: 'SAR', numberingSystem: 'arab' },
        { text: 'المملكة العربية السعودية - Arabic', language: 'ar', country: 'SA', currency: 'SAR', numberingSystem: 'latn' }
    ];

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    get currentNumberingSystem(): string {
        return this.locale.getCurrentNumberingSystem();
    }

    dir: Direction;

    subscription: Subscription;

    constructor(public locale: LocaleService, public translation: TranslationService, public title: Title) { }

    ngOnInit(): void {
        this.subscription = this.translation.translationChanged().subscribe(
            () => {
                this.title.setTitle(this.translation.translate('App.Title'));
                this.dir = this.locale.getLanguageDirection() as Direction;
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    selectLocale(language: string, country: string, currency: string, numberingSystem: string): void {
        this.locale.setDefaultLocale(language, country, '', numberingSystem);
        this.locale.setCurrentCurrency(currency);
    }

}
