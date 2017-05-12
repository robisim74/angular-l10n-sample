import { Component } from '@angular/core';
import { NgLocalization } from '@angular/common';

import { Localization } from 'angular-l10n';

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
/**
 * I18nComponent class extends Localization:
 * it doesn't need a constructor with 'super' call
 * and it doesn't need to implement the OnInit.
 */
export class I18nComponent extends Localization {

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

    addMessage(value: any): void {
        this.messages.push(value.message);
        this.message = "";
    }

}
