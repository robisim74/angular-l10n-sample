import { HomeComponent } from './home.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MdCardModule } from '@angular/material';

import { LocalizationModule, LocaleService, TranslationService } from 'angular-l10n';

import '../../styles/blue-amber.scss';

describe('Component: HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let comp: HomeComponent;

    let locale: LocaleService;
    let translation: TranslationService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MdCardModule,
                LocalizationModule.forRoot()
            ],
            declarations: [HomeComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;

        locale = TestBed.get(LocaleService);
        translation = TestBed.get(TranslationService);

        locale.addConfiguration()
            .disableStorage()
            .addLanguages(['en'])
            .defineDefaultLocale('en', 'US')
            .defineCurrency('USD');
        locale.init();

        // Karma serves files from 'base' relative path.
        translation.addConfiguration()
            .addProvider('base/src/assets/locale-');
        translation.init();
    });

    it('should render translated text', async(() => {
        fixture.detectChanges();

        translation.translationChanged.subscribe(
            () => {
                expect(fixture.debugElement.nativeElement).toContainText('The Metamorphosis');
            }
        );
    }));

});
