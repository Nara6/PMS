import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { ResPutPassword, User } from '../user.types';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
    public updateForm: UntypedFormGroup;
    public saving: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public user: User,
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private formBuilder: UntypedFormBuilder,
        private userService: UserService,
        private snackbarService: SnackbarService,
    ) { }

    ngOnInit(): void {
        this.ngBuilderForm();
    }
    ngBuilderForm(): void {
        this.updateForm = this.formBuilder.group({
            newPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
            newConfirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
        });
    }
    submit() {
        this.saving = true;
        this.updateForm.disable();
        this.userService.updatePassword(this.user.id, this.updateForm.value).subscribe({
            next: (response: ResPutPassword) => {
                this.saving = false;
                this.dialogRef.close();
                this.snackbarService.openSnackBar(response.message, GlobalConstants.success);
            },
            error: (err: HttpErrorResponse) => {
                this.saving = false;
                this.updateForm.enable();
                const errors: { field: string, message: string }[] | undefined = err.error.errors;
                var message: string = err.error.message;
                if (errors && errors.length > 0) {
                    message = errors.map((obj) => obj.message).join(', ')
                }
                this.snackbarService.openSnackBar(message, GlobalConstants.error);
            }
        });
    }
}
