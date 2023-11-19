import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { UserService } from '../user.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestUser, ResponseSetup, Setup } from '../user.types';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    @ViewChild('loadingTemplate', { static: true }) private loadingTemplate: TemplateRef<any>;
    @ViewChild('tabGroup') tabGroup: MatTabGroup;
    create: UntypedFormGroup;
    loading: boolean;
    disabledTab2: boolean;
    disabledTab3: boolean;
    src: string = 'assets/images/avatars/image-icon.jpg';
    setup: Setup;
    currentDate: Date = new Date();
    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly userService: UserService,
        private readonly snackBarService: SnackbarService,
        private readonly matDialog: MatDialog,
        private readonly _router: Router,
    ) { }

    ngOnInit(): void {
        this.ngBuilderForm();
        this.setupData();
    }

    srcChange(base64: string): void {
        // console.log(base64)
        this.create.get('avatar').setValue(base64);
        // console.log(this.create.get('avatar').value);
    }

    goToTab(tabIndex: number) {
        this.tabGroup.selectedIndex = tabIndex;
    }

    ngBuilderForm(): void {
        this.create = this.formBuilder.group({
            // User Info
            avatar: ['', Validators.required],
            kh_name: ['សម្រាប់តេស្ត', Validators.required],
            en_name: ['Testuser', Validators.required],
            username: ['testuser', [Validators.required, this.usernameValidator]],
            vpn_account: ['testuser', [Validators.required, this.usernameValidator]],
            department_id: ['', Validators.required],
            title_id: ['', Validators.required],
            office_id: ['', Validators.required],
            position_id: ['', Validators.required],
            role_id: ['', Validators.required],
            about: ['I am a test user only', Validators.required],
            // Security
            password: ['123456', Validators.required],
            confirm_password: ['123456', Validators.required],
            // Contact
            email: ['testuser@gmail.com', Validators.required],
            phone: ['012399323', Validators.required],
            tg_username: ['testuser', [Validators.required, this.usernameValidator]],

        });

        this.create.valueChanges.subscribe((value: RequestUser) => {
            // User Info Validation
            if (
                isNotEmpty(value.avatar) &&
                isNotEmpty(value.kh_name) &&
                isNotEmpty(value.en_name) &&
                isNotEmpty(value.username) &&
                this.create.get('username').valid &&
                isNotEmpty(value.vpn_account) &&
                this.create.get('vpn_account').valid &&
                isNotEmpty(value.department_id.toString()) &&
                isNotEmpty(value.title_id.toString()) &&
                isNotEmpty(value.office_id.toString()) &&
                isNotEmpty(value.position_id.toString()) &&
                isNotEmpty(value.role_id.toString()) &&
                isNotEmpty(value.about)
            ) {
                this.disabledTab2 = true;
            } else {
                this.disabledTab2 = false;
            }
            // Security Validation
            if (isNotEmpty(value.password) && isNotEmpty(value.confirm_password)
            ) {
                this.disabledTab3 = true;
            } else {
                this.disabledTab3 = false;
            }
        });
    }

    submit(): void {
        this.create.disable();
        this.loading = true;
        
        this.userService.create(this.create.value).subscribe({
            next: (response) => {
                this.loading = false;
                console.log(response)
                this.snackBarService.openSnackBar(response.message, GlobalConstants.success);
                this._router.navigateByUrl('users');
            },
            error: (err) => {
                this.create.enable();
                this.loading = false;
                const errors: { field: string, message: string }[] | undefined = err.error.errors;
                var message: string = err.error.message;
                if (errors && errors.length > 0) {
                    message = errors.map((obj) => obj.message).join(', ')
                }
                this.snackBarService.openSnackBar(message, GlobalConstants.error);
            }
        });
    }

    setupData(): void {
        const dialog = this.matDialog.open(this.loadingTemplate, { width: 'auto', height: 'auto', disableClose: true });
        this.userService.setup().subscribe({
            next: (response: ResponseSetup) => {
                this.setup = response.setup;
                dialog.close();
            },
            error: (err: HttpErrorResponse) => {
                const error: { httpStatus: 400, message: string } = err.error;
                this.snackBarService.openSnackBar(error.message ?? GlobalConstants.genericError, GlobalConstants.error);
                dialog.close();
            }
        })
    }

    private usernameValidator(control: AbstractControl): { [key: string]: any } | null {
        const forbidden = /[^\w]/.test(control.value);
        return forbidden ? { 'forbiddenUsername': { value: control.value } } : null;
    }

}

const isNotEmpty = (value: string) => value.trim().length !== 0;

