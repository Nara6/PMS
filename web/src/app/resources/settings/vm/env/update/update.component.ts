import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { EnvService } from '../env.service';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
    public data: UntypedFormGroup;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public item: any,
        private readonly formBuilder: FormBuilder,
        private readonly snackBarService: SnackbarService,
        private readonly envService : EnvService,
        private dialogRef: MatDialogRef<UpdateComponent>,
    ){}
    ngOnInit(): void {
        // console.log(this.item);
        this.ngBuildForm();
    }
    ngBuildForm(): void {
        this.data = this.formBuilder.group({
            name: [this.item.name, [Validators.required]],
        });

    }
    submit(data: any):void{
        this.data.disable();
        // console.log(data);
        this.envService.update(data.id,this.data.value).subscribe({
          next: (res)=>{
            // console.log(res);
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
