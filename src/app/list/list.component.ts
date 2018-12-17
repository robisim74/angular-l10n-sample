import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
    TranslationService,
    IntlAPI,
    Collator,
    Language,
    DefaultLocale,
    Currency
} from 'angular-l10n';

export class Data {

    name: string;
    position: string;
    salary: number;
    startDate: Date;

}

@Component({
    selector: 'app-list',
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;
    @Currency() currency: string;

    intlAPI: boolean;

    DATA: Observable<Data[]>;

    keyNames: any[];
    keyName: any;
    order: string;
    s: string;

    subscription: Subscription;

    // The injection of ChangeDetectorRef is necessary for OnPush change detection strategy.
    constructor(private translation: TranslationService, private collator: Collator, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.intlAPI = IntlAPI.hasCollator();

        // Reinitializes filters when language changes.
        this.subscription = this.translation.translationChanged().subscribe(
            () => { this.initializeFilters(); }
        );

        this.translation.translationError.subscribe((error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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
        ).forEach((data: Data[]) => { filteredDATA = data; })
            .then(() => {
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
        const DATA: Data[] = [];

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
