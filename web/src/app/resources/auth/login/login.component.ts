// ==========================================================>> Core Library
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

// ==============================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';

// ==========================================================>> Custom Library
import { AuthService } from 'app/core/auth/auth.service';
import { Animations } from 'helpers/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'app/shared/global-constants';
import { ResponseLogin } from 'app/core/auth/auth.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

interface UserPlayload extends User {
    role: string;
    title: string;
    department: string;
    office: string;
    position: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: Animations
})

export class LoginComponent implements OnInit {

    // ===>> Public Variables used in the component and template.
    public logInForm: UntypedFormGroup;
    public isShowAlert: boolean = false;
    public isLoading: boolean = false;

    constructor(
        //===> Private Variables used in this component only
        private readonly _authService: AuthService,
        private readonly _userService: UserService,
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _router: Router,
        private readonly _snackBar: SnackbarService // for Displaying Message
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        // Build LogInForm the form
        this.logInForm = this._formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, Validators.required]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    login(): void {
        // Start displaying Spinner in Button
        this.isLoading = true;
        // Call API for Login
        this._authService.login(this.logInForm.value).subscribe({
            next: (value: ResponseLogin) => {
                let token = value.token;
                var user: UserPlayload;
                user = jwt_decode(token);
                this._userService.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('role', user.role);
                console.log(user);
                
                // Navigate to the dashboard
                if(user.role==='Developer'){
                    this._router.navigateByUrl('/my-works');
                }else{
                    this._router.navigateByUrl('/dashboard');
                }
            },
            error: (err: HttpErrorResponse) => {
                const error: { statusCode: number, message: string, error: string } = err.error;
                // Hide Spinner in Button
                this.isLoading = false;
                console.log(err);
                // Display Error Message
                this._snackBar.openSnackBar(error.message ? error.message : GlobalConstants.genericError, GlobalConstants.error);
            },
        });
    }
}
