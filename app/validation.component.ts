import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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
export class ValidationComponent extends Localization {

    digits: string = "1.2-2";
    minValue: number = -Math.round(Math.random() * 10000) / 100;
    maxValue: number = Math.round(Math.random() * 10000) / 100;

    parsedValue: number = null;

    numberForm: FormGroup;
    decimal: AbstractControl;

    constructor(
        public locale: LocaleService,
        public translation: TranslationService,
        private localeValidation: LocaleValidation,
        private fb: FormBuilder
    ) {
        super(locale, translation);

        this.numberForm = fb.group({
            decimal: ['', validateLocaleNumber(this.locale, this.digits, this.minValue, this.maxValue)]
        });

        // 'decimal' control.
        this.decimal = this.numberForm.controls['decimal'];
    }

    onSubmit(value: any): void {
        this.parsedValue = this.localeValidation.parseNumber(value.decimal);
    }

}
