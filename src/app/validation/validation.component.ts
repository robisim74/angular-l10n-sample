import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Subscription } from 'rxjs';

import {
    LocaleService,
    LocaleValidation,
    Language,
    DefaultLocale
} from 'angular-l10n';

@Component({
    selector: 'app-validation',
    templateUrl: 'validation.component.html',
    styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit, OnDestroy {

    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;

    model: any = {};

    minDate: Date = new Date();
    maxDate: Date = new Date();

    digits = "1.2-2";
    minValue: number = -Math.round(Math.random() * 10000) / 100;
    maxValue: number = Math.round(Math.random() * 10000000) / 100;

    parsedDate: Date | null = null;
    parsedValue: number | null = null;

    subscription: Subscription;

    constructor(
        public locale: LocaleService,
        private localeValidation: LocaleValidation,
        private dateAdapter: DateAdapter<NativeDateAdapter>
    ) { }

    ngOnInit(): void {
        this.minDate.setFullYear(this.minDate.getFullYear() - 1);
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);

        this.dateAdapter.setLocale(this.locale.getDefaultLocale());
        this.subscription = this.locale.defaultLocaleChanged.subscribe(
            (defaultLocale: string) => {
                this.model.date = null;
                this.model.decimal = null;
                this.parsedDate = null;
                this.parsedValue = null;

                this.dateAdapter.setLocale(defaultLocale);
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onDateSubmit(): void {
        this.parsedDate = this.model.date;
    }

    onNumberSubmit(): void {
        this.parsedValue = this.localeValidation.parseNumber(this.model.decimal);
    }

}
