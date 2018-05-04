import { NgModule } from '@angular/core';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MATERIAL_SANITY_CHECKS
} from '@angular/material';

const materialModules: any[] = [
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules,
    providers: [
        {
            provide: MATERIAL_SANITY_CHECKS,
            useValue: false
        }
    ]
})

export class MaterialModule { }
