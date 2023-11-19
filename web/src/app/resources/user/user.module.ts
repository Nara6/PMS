import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { routes } from './user.routing';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        PreviewDialogComponent,
        UpdateComponent,
        ChangePasswordComponent,
    ],
})
export class UserModule { }
