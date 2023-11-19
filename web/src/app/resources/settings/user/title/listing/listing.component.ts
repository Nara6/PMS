import { Component, OnInit } from '@angular/core';
import { UserTitle } from '../title.type';
import { MatTableDataSource } from '@angular/material/table';
import { TitleService } from '../tittle.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { GlobalConstants } from 'app/shared/global-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateComponent } from '../update/update.component';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    public loading: boolean = false;
    public data: UserTitle[];
    displayedColumns: string[] = ['no', 'kh_name', 'en_name', 'action'];
    dataSource: MatTableDataSource<UserTitle>;
    constructor(
        private readonly _titleService: TitleService,
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
                this._titleService.delete(id).subscribe({
                    next: (response: { statusCode: number, message: string }) => {
                        this.data = this.data?.filter((v: UserTitle) => v.id !== id);

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
        this._titleService.read().subscribe({
            next: (res: UserTitle[]) => {
                this.loading = false;
                this.data = res;
                this.dataSource = new MatTableDataSource<UserTitle>(this.data);
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