import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ISubscription } from 'rxjs/Subscription';

import { LocaleService, TranslationService } from 'angular-l10n';

import { LayoutDirection } from '@angular/material';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html'
})
/**
 * AppComponent class doesn't extend Localization superclass
 * because the view uses only directives and not the pipes to get the translation.
 */
export class AppComponent implements OnDestroy {

    get currentCountry(): string {
        return this.locale.getCurrentCountry();
    }

    dir: LayoutDirection;

    subscriptions: ISubscription[] = [];

    constructor(public locale: LocaleService, public translation: TranslationService, public title: Title) {
        // Initializes the document title with the current translation at the time of the component loading.
        this.title.setTitle(this.translation.translate('App.Title'));

        // When the language changes, refreshes the document title with the new translation.
        this.subscriptions.push(this.translation.translationChanged.subscribe(
            () => { this.title.setTitle(this.translation.translate('App.Title')); }
        ));

        // Initializes direction.
        this.dir = this.getLanguageDirection();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: ISubscription) => {
            if (typeof subscription !== "undefined") {
                subscription.unsubscribe();
            }
        });
    }

    getLanguageDirection(language?: string): LayoutDirection {
        return <LayoutDirection>this.locale.getLanguageDirection(language);
    }

    selectLocale(language: string, country: string, currency: string): void {
        this.locale.setDefaultLocale(language, country);
        this.locale.setCurrentCurrency(currency);
    }

}
