import { HomeComponent } from '../app/home.component';

import { HttpModule } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { LocalizationModule, LocaleService, TranslationService } from 'angular-l10n';

describe('Component: HomeComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MaterialModule.forRoot(),
                LocalizationModule.forRoot()
            ],
            declarations: [HomeComponent]
        });
        TestBed.compileComponents();
    });

    it('should render translated text', async(
        inject([LocaleService, TranslationService],
            (locale: LocaleService, translation: TranslationService) => {
                const f = TestBed.createComponent(HomeComponent);
                f.detectChanges();

                locale.AddConfiguration()
                    .DisableStorage()
                    .AddLanguages(['en', 'it', 'ar'])
                    .DefineDefaultLocale('en', 'US')
                    .DefineCurrency('USD');
                locale.init();

                // Karma serves files from 'base' relative path.
                translation.AddConfiguration()
                    .AddProvider('base/assets/locale-');

                translation.translationChanged.subscribe(
                    () => {
                        expect(f.debugElement.nativeElement).toContainText('The Metamorphosis');
                    }
                );

                translation.init();
            })
    ));

})
