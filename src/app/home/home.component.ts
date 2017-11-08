import { Component, OnInit } from '@angular/core';

import { IntlAPI } from 'angular-l10n';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
/**
 * HomeComponent class doesn't use decorators
 * because the view uses only directives and not the pipes to get the translation.
 */
export class HomeComponent implements OnInit {

    intlAPI: boolean;

    today: number;
    pi: number;
    a: number;
    b: number;

    ngOnInit(): void {
        this.today = Date.now();
        this.pi = 3.14159;
        this.a = Math.round(Math.random() * 100) / 100;
        this.b = Math.round(Math.random() * 1000000) / 100;
        this.intlAPI = IntlAPI.hasDateTimeFormat()
            && IntlAPI.hasNumberFormat()
            && IntlAPI.hasCollator();
    }

}
