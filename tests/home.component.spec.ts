import { HomeComponent } from '../app/home.component';

import { HttpModule } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MdCardModule } from '@angular/material';

import { LocalizationModule, LocaleService, TranslationService } from 'angular-l10n';

import '../styles/blue-amber.scss';

describe('Component: HomeComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MdCardModule,
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

                locale.addConfiguration()
                    .disableStorage()
                    .addLanguages(['en', 'it', 'ar'])
                    .defineDefaultLocale('en', 'US')
                    .defineCurrency('USD');
                locale.init();

                // Karma serves files from 'base' relative path.
                translation.addConfiguration()
                    .addProvider('base/assets/locale-');

                translation.translationChanged.subscribe(
                    () => {
                        expect(f.debugElement.nativeElement).toContainText('The Metamorphosis');
                    }
                );

                translation.init();
            })
    ));

})
