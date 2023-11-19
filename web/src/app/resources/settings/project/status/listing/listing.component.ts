import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'app/shared/global-constants';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'app/core/user/user.types';
import { environment as env } from 'environments/environment';
import { CreateComponent } from '../create/create.component';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { UpdateComponent } from '../update/update.component';
import { ProjectStatus } from '../status.type';
import { StatusService } from '../status.service';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    fileUrl: string = env.fileUrl;
    public loading: boolean = false;
    public data: ProjectStatus[];
    displayedColumns: string[] = ['no', 'name', 'color', 'action'];
    dataSource: MatTableDataSource<ProjectStatus>;
    constructor(
        private readonly _statusService: StatusService,
        private _snackBar: SnackbarService,
        private _dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.listing();
        // console.log(this.data);

    }
    //===================================>> Create
    create(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "650px";
        dialogConfig.autoFocus = false;
        const dialogRef: MatDialogRef<CreateComponent> = this._dialog.open(CreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((res) => {
            // console.log(res);

            if (res) {
                this.listing();

            }
        })
    }
    //===================================>> Delete()
    delete(id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "320px";
        const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this._statusService.delete(id).subscribe({
                    next: (response: { statusCode: number, message: string }) => {
                        this.data = this.data?.filter((v: ProjectStatus) => v.id !== id);

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

    //===================================>> Listing
    listing(): void {

        this.loading = true;
        this._statusService.read().subscribe({
            next: (res: ProjectStatus[]) => {
                this.loading = false;
                this.data = res;
                this.dataSource = new MatTableDataSource<ProjectStatus>(this.data);
                // this.dataSource = response;
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                this._snackBar.openSnackBar(err.error ? err.error.message : 'Something went wrong.', GlobalConstants.error);
            }
        });
    }
    //===================================>> Update
    update(data: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "650px";
        dialogConfig.data = data;
        // dialogConfig.autoFocus = false;
        const dialogRef: MatDialogRef<UpdateComponent> = this._dialog.open(UpdateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((res) => {
            // console.log(res);

            if (res) {
                this.listing();

            }
        })
    }
}
