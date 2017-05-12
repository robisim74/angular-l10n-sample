import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import {
    LocaleService,
    LocaleValidation,
    validateLocaleNumber,
    Language,
    DefaultLocale
} from 'angular-l10n';

@Component({
    templateUrl: 'validation.component.html'
})
export class ValidationComponent implements OnInit, OnDestroy {

    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;

    digits: string = "1.2-2";
    minValue: number = -Math.round(Math.random() * 10000) / 100;
    maxValue: number = Math.round(Math.random() * 10000) / 100;

    parsedValue: number = null;

    numberForm: FormGroup;
    decimal: AbstractControl;

    subscription: ISubscription;

    constructor(
        public locale: LocaleService,
        private localeValidation: LocaleValidation,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.subscription = this.locale.defaultLocaleChanged.subscribe(
            () => {
                this.numberForm.controls['decimal'].setValue(null);
                this.parsedValue = null;
            }
        );

        this.numberForm = this.fb.group({
            decimal: ['', validateLocaleNumber(this.digits, this.minValue, this.maxValue)]
        });

        // 'decimal' control.
        this.decimal = this.numberForm.controls['decimal'];
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(value: any): void {
        this.parsedValue = this.localeValidation.parseNumber(value.decimal);
    }

}
