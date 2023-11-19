import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { MatDialogRef } from '@angular/material/dialog';
import { StatusService } from '../status.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    public data: UntypedFormGroup;
    colorCode: string = '#229954'
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly snackBarService: SnackbarService,
        private readonly _statusService : StatusService,
        private dialogRef: MatDialogRef<CreateComponent>,

    ) { }
    ngOnInit(): void {
        this.ngBuildForm();
    }
    ngBuildForm(): void {
        this.data = this.formBuilder.group({
            name: [null, [Validators.required]],
            color: [this.colorCode, [Validators.required]]
        });

    }
    submit(): void{
        this.data.disable();
        console.log(this.data);
        this._statusService.create(this.data.value).subscribe({
          next: (res)=>{
            console.log(res);
            this.dialogRef.close(true);
            this.snackBarService.openSnackBar(res.message, GlobalConstants.success);
          },
          error: (err) => {
            this.data.enable();
            // this.loading = false;
            const errors: { sfield: string, message: string }[] | undefined = err.error.errors;
            var message: string = err.error.message;
            if (errors && errors.length > 0) {
                message = errors.map((obj) => obj.message).join(', ')
            }
            this.snackBarService.openSnackBar(message, GlobalConstants.error);
        }
        })
        
    }
}
