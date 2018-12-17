import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgLocalization } from '@angular/common';

import { Language } from 'angular-l10n';

export class MessagesLocalization extends NgLocalization {
    getPluralCategory(value: any): string {
        if (value > 1) {
            return 'other';
        }
        return value;
    }
}

@Component({
    selector: 'app-i18n',
    templateUrl: './i18n.component.html',
    styleUrls: ['./i18n.component.scss'],
    providers: [{ provide: NgLocalization, useClass: MessagesLocalization }]
})
export class I18nComponent implements OnInit, OnDestroy {

    @Language() lang: string;

    message = "";
    gender = "";
    inviteMapping: any = {
        male: 'i18n.inviteHim',
        female: 'i18n.inviteHer'
    };
    messages: any = [];
    messageMapping: any = {
        '=0': 'i18n.noMessages',
        '=1': 'i18n.oneMessage',
        'other': '# i18n.messages'
    };

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    addMessage(): void {
        this.messages.push(this.message);
        this.message = "";
    }

}
