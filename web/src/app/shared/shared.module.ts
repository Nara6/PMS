import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PortraitComponent, PortraitDialogComponent } from './portrait/portrait.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        PortraitComponent,
        PortraitDialogComponent,
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ImageCropperModule,
        UiSwitchModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UiSwitchModule,
        PortraitComponent,
        PortraitDialogComponent,
    ],
})
export class SharedModule
{

    
}
