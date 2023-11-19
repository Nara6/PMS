import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './settings.routing';

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class SettingsModule{}
