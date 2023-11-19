import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'app/shared/global-constants';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { ProjectService } from '../project.service';
import { ProjectSetup } from '../project.types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public data: UntypedFormGroup;
  public isLoading: boolean = false;
  public project_setup: ProjectSetup;
  public src: any = 'assets/images/avatars/img-select.png'
  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: UntypedFormBuilder,
    private readonly snackBarService: SnackbarService,
    private readonly projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getSetup();
    this.ngBuildForm();
  }

  ngBuildForm(): void {
    this.data = this.formBuilder.group({
      kh_name: ['គម្រោងសម្រាប់ដេម៉ូ', [Validators.required]],
      en_name: ['Demo Project', [Validators.required]],
      abbre: ['DP', [Validators.required]],
      type_id: [null, [Validators.required]],
      status_id: [null, [Validators.required]],
      start_date: [null, [Validators.required]],
      due_date: [null, [Validators.required]],
      icon: [null, [Validators.required]],
      user_id: [null, [Validators.required]],
      role_id: [null, [Validators.required]],
    });
  }
  getSetup(): void {
    this.projectService.GetSetup().subscribe(
      {
        next: (res) => {

          console.log(res);

          this.project_setup = res.setup;
          // console.log(this.project_setup);

        },
        error: (err: HttpErrorResponse) => {
          const error: { statusCode: number, message: string, error: string } = err.error;
          // // Display Error Message
          this.snackBarService.openSnackBar(error.message, GlobalConstants.error);
        },
      }
    )
  }
  submit(): void {
    this.data.disable();
    // console.log(this.data);
    this.projectService.create(this.data.value).subscribe({
      next: (res) => {
        if (res.success) {
          // console.log();

          const project_id = res.data.id;
          const user_id = this.data.get('user_id').getRawValue();
          console.log(user_id);

          const role_id = this.data.get('role_id').getRawValue();
          const body: any = {
            "user_id": user_id,
            "project_id": project_id,
            "role_id": role_id
          }
          this.projectService.createProjectUser(body).subscribe({
            next: (res) => {
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
          });
        }

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
  srcChange(event: string): void {
    this.data.get('icon').setValue(event);

  }
}
