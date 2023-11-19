import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { UserService } from '../user.service';
import { environment as env } from 'environments/environment';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { List, User } from '../user.types';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { GlobalConstants } from 'app/shared/global-constants';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

    fileUrl: string = env.fileUrl;
    displayedColumns: string[] = ['no', 'profile', 'contact', 'department', 'last_activity', 'action'];
    dataSource: MatTableDataSource<User>;
    loading: boolean;
    data: User[];
    total: number = 10;
    limit: number = 10;
    page: number = 1;
    key: string = '';
    parseData: any;

    constructor(
        private _userService: UserService,
        private _snackBar: SnackbarService,
        private _dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.listing(this.limit, this.page);
       
    }

    getRandomProfileUrl() {
        const profiles = [
            'https://cdn-icons-png.flaticon.com/128/201/201634.png',
            'https://cdn-icons-png.flaticon.com/128/236/236831.png',
            'https://cdn-icons-png.flaticon.com/128/6997/6997662.png',
            'https://cdn-icons-png.flaticon.com/128/1999/1999625.png',
            'https://cdn-icons-png.flaticon.com/128/428/428933.png',
            'https://cdn-icons-png.flaticon.com/128/3135/3135789.png',
            'https://cdn-icons-png.flaticon.com/128/219/219970.png',
            'https://cdn-icons-png.flaticon.com/128/9408/9408175.png',
            'https://cdn-icons-png.flaticon.com/128/3011/3011270.png'
        ];
    
        const randomIndex = Math.floor(Math.random() * profiles.length);
        
        return profiles[randomIndex];
    }
    getRandomCoverUrl() {
        const profiles = [
            'https://images.pexels.com/photos/358904/pexels-photo-358904.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1719627/pexels-photo-1719627.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];
    
        const randomIndex = Math.floor(Math.random() * profiles.length);
        
        return profiles[randomIndex];
    }
    viewDetail(drawer:any,data:any){
        // console.log(drawer);
        drawer.toggle();
        // console.log(data);
        this.parseData = data;
        // console.log(this.parseData);
        
    }
    //===================================>> List
    listing(_limit: number = 10, _page: number = 1): void {

        const params: { limit: number, page: number, key?: string | number | null, order: string } = {
            limit: _limit,
            page: _page,
            order: 'DESC'
        };

        if (this.key != '') {
            params.key = this.key;
        }
        if (this.page != 0) {
            params.page = this.page;
        }

        this.loading = true;
        this._userService.list(params).subscribe({
            next: (response: List) => {
                this.loading = false;
                this.data = response.data;
                this.dataSource = new MatTableDataSource(this.data);
                this.total = response.pagination.totalItems;
                this.page = response.pagination.currentPage;
                this.limit = response.pagination.perPage;

                // Loop through data and update avatar URLs if null
                this.data.forEach(item => {
                    if (!item.avatar) {
                        item.avatar = this.getRandomProfileUrl();
                    }else if(item.avatar){
                        item.avatar = this.fileUrl + item.avatar;
                    }
                });

                 // Loop through data and update cover URLs if null
                 this.data.forEach(item => {
                    item.cover = this.getRandomCoverUrl();
                });
                
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                this._snackBar.openSnackBar(err.error ? err.error.message : 'Something went wrong.', GlobalConstants.error);
            }
        });
    }

    create(): void {
        // this.data.unshift(response);
    }

    // update(row: User): void {
    //     this.data = this.data.map((obj: User) => {
    //         if (obj.id === response.id) return response;
    //         return obj;
    //     })
    // }

    changePassword(row: User): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = row;
        dialogConfig.width = "650px";
        dialogConfig.autoFocus = false;
        this._dialog.open(ChangePasswordComponent, dialogConfig);
    }

    delete(project_id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "320px";
        const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this._userService.delete(project_id).subscribe({
                    next: (response: { statusCode: number, message: string }) => {
                        this.data = this.data.filter((v: User) => v.id != project_id);
                        this.total -= 1;
                        this.limit -= 1;
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
    //=============================================>> Status
    onChange(status: boolean, id: number): void {
        const data = {
            status: status == true ? 1 : 0,
            id: id,
        };
        // console.log(data);
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
