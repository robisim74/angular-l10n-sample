import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { ISubscription } from 'rxjs/Subscription';

import {
    LocaleService,
    LocaleValidation,
    Language,
    DefaultLocale
} from 'angular-l10n';

@Component({
    templateUrl: 'validation.component.html'
})
export class ValidationComponent implements OnInit, OnDestroy {

    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;

    model: any = {};

    digits: string = "1.2-2";
    minValue: number = -Math.round(Math.random() * 10000) / 100;
    maxValue: number = Math.round(Math.random() * 10000) / 100;

    minDate: Date = new Date();
    maxDate: Date = new Date();

    parsedValue: number | null = null;
    parsedDate: Date | null = null;

    subscription: ISubscription;

    constructor(
        public locale: LocaleService,
        private localeValidation: LocaleValidation,
        private dateAdapter: DateAdapter<Date>
    ) { }

    ngOnInit(): void {
        this.minDate.setFullYear(this.minDate.getFullYear() - 1);
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);

        this.dateAdapter.setLocale(this.locale.getDefaultLocale());
        this.subscription = this.locale.defaultLocaleChanged.subscribe(
            (defaultLocale: string) => {
                this.model.decimal = null;
                this.model.date = null;
                this.parsedValue = null;
                this.parsedDate = null;

                this.dateAdapter.setLocale(defaultLocale);
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onNumberSubmit(): void {
        this.parsedValue = this.localeValidation.parseNumber(this.model.decimal);
    }

    onDateSubmit(): void {
        this.parsedDate = this.model.date;
    }

}
