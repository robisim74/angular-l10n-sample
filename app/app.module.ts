import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { routing } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { I18nComponent } from './i18n.component';
import { ValidationComponent } from './validation.component';

import { LocalizationModule, LocaleValidationModule, LocaleService, TranslationService } from 'angular-l10n';

// Advanced initialization.
@Injectable()
export class LocalizationConfig {

    constructor(public locale: LocaleService, public translation: TranslationService) { }

    load(): Promise<any> {
        this.locale.AddConfiguration()
            .AddLanguage('en', 'ltr')
            .AddLanguage('it', 'ltr')
            .AddLanguage('ar', 'rtl')
            .SetCookieExpiration(30)
            .DefineDefaultLocale('en', 'US')
            .DefineCurrency('USD');
        this.locale.init();

        this.translation.AddConfiguration()
            .AddProvider('./assets/locale-');

        let promise: Promise<any> = new Promise((resolve: any) => {
            this.translation.translationChanged.subscribe(() => {
                resolve(true);
            });
        });

        this.translation.init();

        return promise;
    }

}

// AoT compilation requires a reference to an exported function.
export function initLocalization(localizationConfig: LocalizationConfig): Function {
    return () => localizationConfig.load();
}

// APP_INITIALIZER will execute the function when the app is initialized and delay what it provides.
@NgModule({
    imports: [
        BrowserModule,
        routing,
        SharedModule,
        MaterialModule,
        LocalizationModule.forRoot(), // New instance of LocaleService & TranslationService.
        LocaleValidationModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        I18nComponent,
        ValidationComponent
    ],
    providers: [
        Title,
        LocalizationConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initLocalization,
            deps: [LocalizationConfig],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
