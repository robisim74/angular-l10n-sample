import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedModules: any[] = [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
];

@NgModule({
    imports: sharedModules,
    exports: sharedModules
})

export class SharedModule { }
