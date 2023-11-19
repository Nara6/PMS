import { Component, Input, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'app/shared/global-constants';
// import { get } from 'lodash';
import { Select, initTE } from "tw-elements";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { environment as env } from 'environments/environment';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent implements OnInit {
  @Input() data: any;
  user: any;
  data_preview: UntypedFormGroup;
  fileUrl: string = env.fileUrl;
  public status: number;
  public color: string = '#F5B041';
  public loading: boolean = false;
  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBarService: SnackbarService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private _snackBar: SnackbarService,
    
  ) { }
  ngOnInit(): void {
    console.log(this.data);
    // this.user = JSON.parse(localStorage.getItem('user'));
    // this.getSetup();
    // this.ngBuilderForm();
  }
  // ngBuilderForm(): void {
  //   this.data_preview = this.formBuilder.group({
  //     en_name: [this.data.ProjectsUser.en_name, Validators.required],
  //     status_id: [this.data.ProjectsUser.ProjectsStatus.id, Validators.required],
  //     type_id: [this.data.ProjectsUser.ProjectsType.id, Validators.required],
  //     start_date: [new Date(this.data.ProjectsUser.start_date), Validators.required],
  //     due_date: [new Date(this.data.ProjectsUser.due_date), Validators.required],
  //     kh_name: [this.data.ProjectsUser.kh_name],
  //     abbre: [this.data.ProjectsUser.abbre],
  //     icon: [this.data.ProjectsUser.icon]
  //   });
  // }
  ngOnChanges() {
    // this.status = this.data?.ProjectsStatus.id;
    // console.log(this.data.ProjectsUser.ProjectsStatus);
    console.log(this.data);

    // this.ngBuilderForm();
    // console.log(this.status);

  }
  getSetup(): void {
    
  }
  // delete(project_id: number = 0): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = "320px";
  //   const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     if (result) {
  //       this.projectService.delete(project_id).subscribe({
  //         next: (response: { statusCode: number, message: string }) => {
  //           // this.data = this.data.filter((v: User) => v.id != project_id);
  //           // this.total -= 1;
  //           // this.limit -= 1;
  //           // this.dataSource = new MatTableDataSource(this.data);
  //           // this._snackBar.openSnackBar(response.message, GlobalConstants.success);
  //           // this.data = this.data?.filter((v: Project) => v.id !== project_id);

  //           // // this.total -= 1;
  //           // // this.limit -= 1;
  //           // this.dataSource = new MatTableDataSource(this.data);
  //           this._snackBar.openSnackBar(response.message, GlobalConstants.success);
  //           // Reload the current route
  //           this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  //           this._router.onSameUrlNavigation = 'reload';
  //           this._router.navigate([this._router.url]);
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           const error: { httpStatus: 400, message: string } = err.error;
  //           this._snackBar.openSnackBar(error.message, GlobalConstants.error);
  //         }
  //       });
  //     }
  //   });
  // }
  
  

}
