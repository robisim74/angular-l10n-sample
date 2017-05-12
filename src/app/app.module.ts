import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { I18nComponent } from './i18n/i18n.component';
import { ValidationComponent } from './validation/validation.component';

import { LocalizationModule, LocaleValidationModule, LocaleService, TranslationService } from 'angular-l10n';

// Advanced initialization.
@Injectable()
export class LocalizationConfig {

    constructor(public locale: LocaleService, public translation: TranslationService) { }

    load(): Promise<any> {
        this.locale.addConfiguration()
            .addLanguage('en', 'ltr')
            .addLanguage('it', 'ltr')
            .addLanguage('ar', 'rtl')
            .setCookieExpiration(30)
            .defineDefaultLocale('en', 'US')
            .defineCurrency('USD');
        this.locale.init();

        this.translation.addConfiguration()
            .addProvider('./src/assets/locale-');

        const promise: Promise<any> = new Promise((resolve: any) => {
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
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
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
