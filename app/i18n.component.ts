import { Component } from '@angular/core';
import { NgLocalization } from '@angular/common';

import { Translation, TranslationService } from 'angular-l10n';

export class MessagesLocalization extends NgLocalization {
    getPluralCategory(value: any): string {
        if (value > 1) {
            return 'other';
        }
    }
}

@Component({
    templateUrl: 'i18n.component.html',
    providers: [{ provide: NgLocalization, useClass: MessagesLocalization }]
})
export class I18nComponent extends Translation {

    message: string = "";

    gender: string = "";
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

    constructor(public translation: TranslationService) {
        super(translation);
    }

    addMessage(value: any): void {
        this.messages.push(value.message);
        this.message = "";
    }

}
