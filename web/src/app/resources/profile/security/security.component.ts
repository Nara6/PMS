import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/resources/user/user.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { SnackbarService } from 'app/shared/services/snackbar.service';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSecurityComponent implements OnInit
{
    securityForm: UntypedFormGroup;
    loading: boolean = false;
    user:any;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private readonly snackBarService: SnackbarService,


    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.user = JSON.parse(localStorage.getItem('user'));
        // Create the form
        this.securityForm = this._formBuilder.group({
            oldPassword         : ['', Validators.required],
            newPassword         : ['', Validators.required],
            newConfirmPassword  : ['', Validators.required],
        });
    }
    submit(): void{
        // console.log(this.securityForm);
        this.securityForm.enable();

        this.loading = true;
        this._userService.updatePasswordPf(this.user.id, this.securityForm.value).subscribe({
            next: (response) => {
                this.loading = false;
                this.securityForm.reset();
                this.securityForm.enable();
                
                // localStorage.setItem('user', JSON.stringify(response.data));
                this.snackBarService.openSnackBar(response.message, GlobalConstants.success);
                // window.location.reload();
                
            },
            error: (err) => {
                this.securityForm.enable();
                this.loading = false;

                
                const errors: { field: string, message: string }[] | undefined = err.error.errors;
                var message: string = err.error.message;
                if (errors && errors.length > 0) {
                    message = errors.map((obj) => obj.message).join(', ')
                }
                this.snackBarService.openSnackBar(message, GlobalConstants.error);
            }
        })
        
    }
}
