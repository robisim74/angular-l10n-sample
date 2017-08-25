import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Direction } from '@angular/material';
import { ISubscription } from 'rxjs/Subscription';

import { LocaleService, TranslationService } from 'angular-l10n';

@Component({
    selector: 'app-component',
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
        { text: 'United States', language: 'en', country: 'US', currency: 'USD' },
        { text: 'United Kingdom', language: 'en', country: 'GB', currency: 'GBP' },
        { text: 'Italia', language: 'it', country: 'IT', currency: 'EUR' },
        { text: 'المملكة العربية السعودية', language: 'ar', country: 'SA', currency: 'SAR' }
    ];

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    dir: Direction;

    subscription: ISubscription;

    constructor(public locale: LocaleService, public translation: TranslationService, public title: Title) { }

    ngOnInit(): void {
        // When the language changes, refreshes the document title with the new translation.
        this.subscription = this.translation.translationChanged().subscribe(
            () => { this.title.setTitle(this.translation.translate('App.Title')); }
        );

        // Initializes direction.
        this.dir = this.getLanguageDirection();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getLanguageDirection(language?: string): Direction {
        return this.locale.getLanguageDirection(language) as Direction;
    }

    selectLocale(language: string, country: string, currency: string): void {
        this.locale.setDefaultLocale(language, country);
        this.locale.setCurrentCurrency(currency);
    }

}
