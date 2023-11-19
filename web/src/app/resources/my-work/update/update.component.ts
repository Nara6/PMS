import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'app/shared/global-constants';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { environment as env } from 'environments/environment';
import { Router } from '@angular/router';
import { UpdateProject } from '../project.types';
import { MyWorkService } from '../my_work.service';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
    fileUrl: string = env.fileUrl;
    public src: string = '';
    public icon: string = '';
    public toUpdate: UpdateProject;
    loading: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private _snackBar: SnackbarService,
        private projectService: MyWorkService,
        private readonly _router: Router,
        private dialogRef: MatDialogRef<UpdateComponent>

    ){}

    ngOnInit(): void {
        // console.log(this.data);
        this.toUpdate = this.data.ProjectsUser;
        console.log(this.toUpdate);
        
        this.src = this.fileUrl+this.data.ProjectsUser.icon;
        
    }
    srcChange(event: string): void{
        this.icon = event;
        // console.log(this.icon);
    }
    submit(): void{
        if(this.icon){
            this.loading = true;
            this.toUpdate.icon = this.icon;
            this.toUpdate.status_id = this.data.ProjectsUser.ProjectsStatus.id;
            this.toUpdate.type_id = this.data.ProjectsUser.ProjectsType.id;

            // console.log(this.toUpdate);
            this.projectService.update(this.toUpdate.id, this.toUpdate).subscribe({
                
                next: (res) => {
                //   this.loading = false;
                  // console.log(response)
                  this.loading= false;
                  this.dialogRef.close(true);
                  this._snackBar.openSnackBar(res.message, GlobalConstants.success);

                  // Reload the current route
                  this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                  this._router.onSameUrlNavigation = 'reload';
                  this._router.navigate([this._router.url]);
                  // setTimeout(()=>{
                  //   window.location.reload();
                  // },1000);
                },
                error: (err) => {
                  // this.create.enable();
                  this.loading = false;
                  const errors: { field: string, message: string }[] | undefined = err.error.errors;
                  var message: string = err.error.message;
                  if (errors && errors.length > 0) {
                    message = errors.map((obj) => obj.message).join(', ')
                  }
                  this._snackBar.openSnackBar(message, GlobalConstants.error);
                }
              })
        }else{
            this._snackBar.openSnackBar('Please upload the new icon', GlobalConstants.error);
        }
    }
}
