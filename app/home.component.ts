import { Component } from '@angular/core';

import { IntlAPI } from 'angular-l10n';

@Component({
    templateUrl: 'home.component.html'
})
/**
 * HomeComponent class doesn't extend Localization superclass
 * because the view uses only directives and not the pipes to get the translation.
 */
export class HomeComponent {

    intlAPI: boolean;

    today: number;
    pi: number;
    a: number;
    b: number;

    constructor() {
        this.today = Date.now();
        this.pi = 3.14159;
        this.a = Math.round(Math.random() * 100) / 100;
        this.b = Math.round(Math.random() * 1000000) / 100;
        this.intlAPI = IntlAPI.HasDateTimeFormat()
            && IntlAPI.HasNumberFormat()
            && IntlAPI.HasCollator();
    }

}
