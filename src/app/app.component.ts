import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LayoutDirection } from '@angular/material';
import { ISubscription } from 'rxjs/Subscription';

import { LocaleService, TranslationService } from 'angular-l10n';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html'
})
/**
 * AppComponent class doesn't use decorators
 * because the view uses only directives and not the pipes to get the translation.
 */
export class AppComponent implements OnInit, OnDestroy {

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    dir: LayoutDirection;

    subscription: ISubscription;

    constructor(public locale: LocaleService, public translation: TranslationService, public title: Title) { }

    ngOnInit(): void {
        // Initializes the document title with the current translation at the time of the component loading.
        this.title.setTitle(this.translation.translate('App.Title'));

        // When the language changes, refreshes the document title with the new translation.
        this.subscription = this.translation.translationChanged.subscribe(
            () => { this.title.setTitle(this.translation.translate('App.Title')); }
        );

        // Initializes direction.
        this.dir = this.getLanguageDirection();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getLanguageDirection(language?: string): LayoutDirection {
        return this.locale.getLanguageDirection(language) as LayoutDirection;
    }

    selectLocale(language: string, country: string, currency: string): void {
        this.locale.setDefaultLocale(language, country);
        this.locale.setCurrentCurrency(currency);
    }

}
