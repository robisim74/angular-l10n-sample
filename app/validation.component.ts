import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import {
    Localization,
    LocaleService,
    TranslationService,
    LocaleValidation,
    validateLocaleNumber
} from 'angular-l10n';

@Component({
    templateUrl: 'validation.component.html'
})
export class ValidationComponent extends Localization implements OnDestroy {

    digits: string = "1.2-2";
    minValue: number = -Math.round(Math.random() * 10000) / 100;
    maxValue: number = Math.round(Math.random() * 10000) / 100;

    parsedValue: number = null;

    numberForm: FormGroup;
    decimal: AbstractControl;

    subscriptions: ISubscription[] = [];

    constructor(
        public locale: LocaleService,
        public translation: TranslationService,
        private localeValidation: LocaleValidation,
        private fb: FormBuilder
    ) {
        super(locale, translation);

        this.subscriptions.push(this.locale.defaultLocaleChanged.subscribe(
            () => {
                this.numberForm.controls['decimal'].setValue(null);
                this.parsedValue = null;
            }
        ));

        this.numberForm = fb.group({
            decimal: ['', validateLocaleNumber(this.locale, this.digits, this.minValue, this.maxValue)]
        });

        // 'decimal' control.
        this.decimal = this.numberForm.controls['decimal'];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: ISubscription) => {
            if (typeof subscription !== "undefined") {
                subscription.unsubscribe();
            }
        });

        // The ngOnDestroy method overrides the method inherited by Localization class,
        // so we call the method to cancel the subscriptions that update the pipes parameters.
        this.cancelPipesSubscriptions();
    }

    onSubmit(value: any): void {
        this.parsedValue = this.localeValidation.parseNumber(value.decimal);
    }

}
