import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Error404Component } from 'app/resources/error/error-404.component';
import { error404Routes } from 'app/resources/error/error-404.routing';

@NgModule({
    declarations: [
        Error404Component
    ],
    imports: [
        RouterModule.forChild(error404Routes)
    ]
})
export class Error404Module { }
