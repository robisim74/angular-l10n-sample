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
    RtlModule
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
    RtlModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})

export class MaterialModule { }
