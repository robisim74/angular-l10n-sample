import { Component, OnInit } from '@angular/core';
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
export class I18nComponent implements OnInit {

    @Language() lang: string;

    message = "";
    gender = "";
    inviteMapping: any = {
        male: 'I18n.Invite him',
        female: 'I18n.Invite her'
    };
    messages: any = [];
    messageMapping: any = {
        '=0': 'I18n.No messages',
        '=1': 'I18n.One message',
        'other': '# I18n.messages'
    };

    ngOnInit(): void {
        //
    }

    addMessage(): void {
        this.messages.push(this.message);
        this.message = "";
    }

}
