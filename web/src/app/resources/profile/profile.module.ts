import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsSecurityComponent } from './security/security.component';
import { SettingsTeamComponent } from './team/team.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ProfileComponent,
        SettingsAccountComponent,
        SettingsSecurityComponent,
        SettingsTeamComponent
    ],
})
export class ProfileModule { }
