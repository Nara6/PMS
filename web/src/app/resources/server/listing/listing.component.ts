import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { GlobalConstants } from 'app/shared/global-constants';
import { ServerService } from '../server.service';
import { Data, List } from '../server.types';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    public displayedColumns: string[] = ['no', 'name', 'ip', 'env', 'n_of_service', 'n_of_server_access', 'create_at', 'action'];
    public dataSource: MatTableDataSource<Data>;
    public loading: boolean;
    public data: Data[];
    public total: number = 10;
    public limit: number = 10;
    public page: number = 1;
    public key: string = '';

    public entities: any[] = [];

    constructor(
        private serverService: ServerService,
        private _snackBar: SnackbarService,
        private _dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        // this.data = [
        //     {
        //         no: 1,
        //         id: 1,
        //         name: "N/A",
        //         ip: '::1',
        //         env: 'N/A',
        //         countService: 1,
        //         countVPNs: 2,
        //         countServerAccess: 3,
        //         created_at: new Date()
        //     },
        //     {
        //         no: 2,
        //         id: 4,
        //         name: "N/A",
        //         ip: '::1',
        //         env: 'N/A',
        //         countService: 4,
        //         countVPNs: 3,
        //         countServerAccess: 5,
        //         created_at: new Date()
        //     }
        // ]
        // this.dataSource = new MatTableDataSource(this.data);
        this.listing();
    }

    //===================================>> List
    listing(_limit: number = 10, _page: number = 1): any {

        const params: { limit: number, page: number, key?: string | number | null } = {
            limit: _limit,
            page: _page,
        };

        if (this.key != '') {
            params.key = this.key;
        }
        if (this.page != 0) {
            params.page = this.page;
        }

        this.loading = true;
        this.serverService.list(params).subscribe({
            next: (response: List) => {
                this.loading = false;
                console.log(response.data);
                
                this.data = response.data;
                this.dataSource = new MatTableDataSource(this.data);
                this.total = response.pagination.totalItems;
                this.page = response.pagination.currentPage;
                this.limit = response.pagination.perPage;
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                this._snackBar.openSnackBar(err.error ? err.error.message : 'Something went wrong.', GlobalConstants.error);
            }
        });
    }

    create(): void {

    }

    view(row: Data): void {

    }

    delete(id: number = 0): void {
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.width = "320px";
        // const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        // dialogRef.afterClosed().subscribe((result: boolean) => {
        //     if (result) {
        //         this.serverService.delete(project_id).subscribe({
        //             next: (response: { statusCode: number, message: string }) => {
        //                 this.data = this.data.filter((v: Data) => v.id != project_id);
        //                 this.total -= 1;
        //                 this.limit -= 1;
        //                 this.dataSource = new MatTableDataSource(this.data);
        //                 this._snackBar.openSnackBar(response.message, GlobalConstants.success);
        //             },
        //             error: (err: HttpErrorResponse) => {
        //                 const error: { httpStatus: 400, message: string } = err.error;
        //                 this._snackBar.openSnackBar(error.message, GlobalConstants.error);
        //             }
        //         });
        //     }
        // });
    }

    //=============================================>> On Page Changed
    onPageChanged(event: PageEvent): void {
        if (event && event.pageSize) {
            this.limit = event.pageSize;
            this.page = event.pageIndex + 1;
            this.listing(this.limit, this.page);
        }
    }
}