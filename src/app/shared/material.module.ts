import { NgModule } from '@angular/core';
import {
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdRadioModule,
    MdIconModule,
    MdMenuModule,
    MdDatepickerModule,
    MdNativeDateModule
} from '@angular/material';

const materialModules: any[] = [
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdRadioModule,
    MdIconModule,
    MdMenuModule,
    MdDatepickerModule,
    MdNativeDateModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})

export class MaterialModule { }
