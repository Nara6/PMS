import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List, Project } from '../project.types';
import { ProjectService } from '../project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { GlobalConstants } from 'app/shared/global-constants';
import { environment as env } from 'environments/environment';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { CreateComponent } from '../create/create.component';


@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy {
    fileUrl: string = env.fileUrl;
    key: string = '';
    displayedColumns: string[] = ['no', 'project', 'type', 'status', 'start-date', 'due-date'];
    dataSource: any;
    data: any;
    loading: boolean = false;
    public parseData: any;
    constructor(
        private _projectService: ProjectService,
        private _snackBar: SnackbarService,
        private _dialog: MatDialog,
    ) { }
    ngOnInit(): void {
        this.listing()
    }
    //===================================>> Listing
    listing(): void {

        this.loading = true;
        this._projectService.read().subscribe({
            next: (response: List) => {
                this.loading = false;
                this.data = response;
                this.dataSource = response;
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                this._snackBar.openSnackBar(err.error ? err.error.message : 'Something went wrong.', GlobalConstants.error);
            }
        });
    }
    // ====================> Delete
    viewDetail(drawer:any,data:any){
        // console.log(drawer);
        drawer.toggle();
        // console.log(data);
        this.parseData = data;
        // console.log(this.parseData);s
        
    }
    // ====================> Delete
    delete(project_id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "320px";
        const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this._projectService.delete(project_id).subscribe({
                    next: (response: { statusCode: number, message: string }) => {
                        this.data = this.data?.filter((v: Project) => v.id !== project_id);
                        
                        // this.total -= 1;
                        // this.limit -= 1;
                        this.dataSource = new MatTableDataSource(this.data);
                        this._snackBar.openSnackBar(response.message, GlobalConstants.success);
                    },
                    error: (err: HttpErrorResponse) => {
                        const error: { httpStatus: 400, message: string } = err.error;
                        this._snackBar.openSnackBar(error.message, GlobalConstants.error);
                    }
                });
            }
        });
    }
    create(){
        const dialogConfig = new MatDialogConfig();
            dialogConfig.width = "650px";
            dialogConfig.autoFocus = false;
        const dialogRef: MatDialogRef<CreateComponent>  = this._dialog.open(CreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((res)=>{
            // console.log(res);
            
            if(res){
                this.listing();

            }
        })

    }
    ngOnDestroy(): void {

    }
}
