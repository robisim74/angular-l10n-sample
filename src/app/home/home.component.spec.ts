import { HomeComponent } from './home.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { LocalizationModule, LocaleService, TranslationService } from 'angular-l10n';

import '../../styles.scss';

describe('Component: HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let comp: HomeComponent;

    let locale: LocaleService;
    let translation: TranslationService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpModule,
                LocalizationModule.forRoot()
            ],
            declarations: [HomeComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
    });

    beforeEach((done: any) => {
        locale = TestBed.get(LocaleService);
        translation = TestBed.get(TranslationService);

        locale.addConfiguration()
            .disableStorage()
            .addLanguages(['en'])
            .defineDefaultLocale('en', 'US')
            .defineCurrency('USD');

        // Karma serves files from 'base' relative path.
        translation.addConfiguration()
            .addProvider('base/src/assets/locale-');

        translation.init().then(() => done());
    });

    it('should render translated text', (() => {
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement).toContainText('The Metamorphosis');
    }));

});
