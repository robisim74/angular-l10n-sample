import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import {
    Localization,
    LocaleService,
    TranslationService,
    IntlAPI,
    Collator
} from 'angular-l10n';

@Component({
    templateUrl: 'list.component.html',
    viewProviders: [Collator]
})
export class ListComponent extends Localization implements OnDestroy {

    intlAPI: boolean;

    DATA: Observable<Data[]>;

    keyNames: any[];
    keyName: any;
    order: string;
    s: string;

    subscriptions: ISubscription[] = [];

    constructor(public locale: LocaleService, public translation: TranslationService, private collator: Collator) {
        super(locale, translation);

        this.intlAPI = IntlAPI.HasCollator();

        this.translation.addConfiguration()
            .addProvider('./assets/locale-list-')
            .addProvider('./assets/locale-position-');
        this.translation.init();

        this.initializeFilters();

        // Reinitializes filters when language changes.
        this.subscriptions.push(this.translation.translationChanged.subscribe(
            () => { this.initializeFilters(); }
        ));
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

    initializeFilters(): void {
        this.keyNames = [];
        this.keyNames.push('position');

        this.keyName = "position";
        this.order = "asc";
        this.s = "";

        this.filterData(this.keyName, this.order);
    }

    filterData(keyName: string, order: string): void {
        this.keyName = keyName;
        this.order = order;

        let filteredDATA: Data[] = [];

        // Searching.
        this.collator.searchAsync(
            this.s,
            this.loadData(),
            this.keyNames,
            { usage: 'search', sensitivity: 'base' }
        ).forEach(
            (data: Data[]) => {
                filteredDATA = data;
            }
            ).then(() => {
                // Sorting.
                this.DATA = this.collator.sortAsync(
                    filteredDATA,
                    this.keyName,
                    this.order,
                    "",
                    { sensitivity: 'variant' }
                );
            });
    }

    loadData(): Data[] {
        // Mock data.
        let DATA: Data[] = [];

        let data: Data = new Data();

        data.name = "Tiger Nixon";
        data.position = "System Architect";
        data.salary = 320800;
        data.startDate = new Date("2011/04/25");
        DATA.push(data);

        data = new Data();
        data.name = "Garrett Winters";
        data.position = "Accountant";
        data.salary = 170750;
        data.startDate = new Date("2011/07/25");
        DATA.push(data);

        data = new Data();
        data.name = "Ashton Cox";
        data.position = "Junior Technical Author";
        data.salary = 86000;
        data.startDate = new Date("2009/01/12");
        DATA.push(data);

        data = new Data();
        data.name = "Cedric Kelly";
        data.position = "Senior Javascript Developer";
        data.salary = 433060;
        data.startDate = new Date("2012/03/29");
        DATA.push(data);

        data = new Data();
        data.name = "Airi Satou";
        data.position = "Accountant";
        data.salary = 162700;
        data.startDate = new Date("2008/11/28");
        DATA.push(data);

        return DATA;
    }

}

export class Data {

    name: string;
    position: string;
    salary: number;
    startDate: Date;

}
