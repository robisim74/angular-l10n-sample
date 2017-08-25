import { HomeComponent } from './home.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@angular/material';

import {
    L10nConfig,
    L10nLoader,
    LocalizationModule,
    StorageStrategy,
    ProviderType
} from 'angular-l10n';

import '../../styles.scss';

describe('Component: HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let comp: HomeComponent;

    let l10nLoader: L10nLoader;

    const l10nConfig: L10nConfig = {
        locale: {
            languages: [
                { code: 'en', dir: 'ltr' }
            ],
            defaultLocale: { languageCode: 'en', countryCode: 'US' },
            currency: 'USD',
            storage: StorageStrategy.Disabled
        },
        translation: {
            providers: [
                // Karma serves files from 'base' relative path.
                { type: ProviderType.Static, prefix: 'base/src/assets/locale-' }
            ],
            composedKeySeparator: '.',
            missingValue: 'No key'
        }
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            declarations: [HomeComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
    });

    beforeEach((done: any) => {
        l10nLoader = TestBed.get(L10nLoader);
        l10nLoader.load().then(() => done());
    });

    it('should render translated text', (() => {
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement).toContainText('The Metamorphosis');
    }));

});
