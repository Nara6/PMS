import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { RequestUser, ResponseSetup, Setup, User } from '../user.types';
import { UserService } from '../user.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'app/shared/global-constants';
import { environment as env } from 'environments/environment';
import { update } from 'lodash';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
    @ViewChild('loadingTemplate', { static: true }) private loadingTemplate: TemplateRef<any>;
    @ViewChild('tabGroup') tabGroup: MatTabGroup;
    create: UntypedFormGroup;
    data: User;
    fileUrl: string = env.fileUrl;
    disabledTab2: boolean;
    disabledTab3: boolean;
    loading: boolean = false;
    src: string = 'assets/images/avatars/image-icon.jpg';
    setup: Setup;
    public id: number;
    currentDate: Date = new Date();
    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly userService: UserService,
        private readonly snackBarService: SnackbarService,
        private readonly matDialog: MatDialog,
        private readonly _router: Router,
        private route: ActivatedRoute,
    ) { }
    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.setupData();
        // this.getUser();
        // console.log(history.state);
        if(history.state.navigationId !== 1){
            this.data = history.state;
            console.log(this.data);
            
        }else{
            // console.log(JSON.parse(localStorage.getItem('data')));
            this.data = JSON.parse(localStorage.getItem('data'));
        }
            
        // localStorage.setItem('data', JSON.stringify(this.data));
        this.ngBuilderForm();
        localStorage.setItem('data', JSON.stringify(this.data));
        
        
    }
    ngOnDestroy(){
        localStorage.removeItem('data');
    }
    srcChange(base64: string): void {
        console.log(base64)
        this.create.get('avatar').setValue(base64);
    }
    goToTab(tabIndex: number) {
        this.tabGroup.selectedIndex = tabIndex;
    }
    ngBuilderForm(): void {
        this.create = this.formBuilder.group({
            // User Info
            avatar: ['', Validators.required],
            kh_name: [this.data?.kh_name, Validators.required],
            en_name: [this.data?.en_name, Validators.required],
            username: [this.data?.username, [Validators.required, this.usernameValidator]],
            vpn_account: [(this.data?.vpn_account)||this.data.username, [Validators.required, this.usernameValidator]],
            department_id: [this.data?.department.id, Validators.required],
            title_id: [this.data?.title.id, Validators.required],
            office_id: [this.data?.office.id, Validators.required],
            position_id: [this.data?.position.id, Validators.required],
            role_id: [this.data?.role.id, Validators.required],
            about: [this.data.about, Validators.required],

            // Contact
            email: [this.data?.email, Validators.required],
            phone: [this.data?.phone, Validators.required],
            tg_username: [this.data?.tg_username, [Validators.required, this.usernameValidator]],

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
            // // Security Validation
            // if (isNotEmpty(value.password) && isNotEmpty(value.confirm_password)
            // ) {
            //     this.disabledTab3 = true;
            // } else {
            //     this.disabledTab3 = false;
            // }
        });
    }
    submit():void{
        this.create.disable();
        this.loading = true;
        // console.log(this.create.value);
        
        
        this.userService.update(this.id,this.create.value).subscribe({
            next: (response) => {
                this.loading = false;
                // console.log(response)
                this.snackBarService.openSnackBar(response.message, GlobalConstants.success);
                this._router.navigateByUrl('users');
            },
            error: (err) => {
                this.create.enable();
                this.loading = false;
                console.log(err);
                
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
    getUser():void{
        this.userService.view(this.id).subscribe({
            next: (res)=>{
                // console.log(res);
                this.data = res.data;
                
                console.log(this.data);
                
            }
        })
    }

}
const isNotEmpty = (value: string) => value.trim().length !== 0;

