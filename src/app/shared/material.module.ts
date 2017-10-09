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
    MatDialogModule
} from '@angular/Material';

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
    exports: materialModules
})

export class MaterialModule { }
