import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { environment as env } from 'environments/environment';
import { UserService } from 'app/resources/user/user.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { Router } from '@angular/router';


@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    styleUrls: ['./account.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
    private _unsubscribeAll: Subject<User> = new Subject<User>();
    public user: any;
    public icon : string;
    loading: boolean = false;
    fileUrl: string = env.fileUrl;
    public src: string = '';
    accountForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private readonly _router: Router,
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
        // this.src = this.fileUrl+this.data.icon;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.src = this.fileUrl+this.user.avatar;
        this.icon = this.user.avatar;

        // Create the form
        this.accountForm = this._formBuilder.group({
            en_name    : [this.user.en_name, Validators.required],
            kh_name    : [this.user.kh_name, Validators.required],
            username    : [this.user.username, Validators.required],
            tg_username: [this.user.tg_username ,Validators.required],
            title_id   : [this.user.title.id],
            company : ['Ministry of public work and transportation'],
            about   : [this.user.about, Validators.required],
            role_id   : [this.user.role_id],
            position_id   : [this.user.position.id],
            office_id   : [this.user.office.id],
            department_id   : [this.user.department.id],
            email   : [this.user.email, [Validators.email,Validators.required]],
            phone   : [this.user.phone, Validators.required],
            avatar  : [this.icon],
            vpn_account: [this.user.vpn_account]
        });
    }
    submit(): void{
        this.accountForm.disable();
        this.loading = true;
        console.log(this.accountForm.value);
        this._userService.update(this.user.id, this.accountForm.value).subscribe({
            next: (response) => {
                this.loading = false;
                this.accountForm.enable();
                localStorage.setItem('user', JSON.stringify(response.data));
                // this.snackBarService.openSnackBar(response.message, GlobalConstants.success);
                window.location.reload();
                
            },
            error: (err) => {
                this.accountForm.enable();
                this.loading = false;
                console.log(err);
                
                const errors: { field: string, message: string }[] | undefined = err.error.errors;
                var message: string = err.error.message;
                if (errors && errors.length > 0) {
                    message = errors.map((obj) => obj.message).join(', ')
                }
                this.snackBarService.openSnackBar(message, GlobalConstants.error);
            }
        })
        
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    srcChange(event: string): void{
        this.accountForm.get('avatar').setValue(event);
        
        // console.log(this.accountForm.get('avatar').value);
    }
}
