
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    data: any;
    loading: boolean = false;
    constructor(
        private readonly dashboardService: DashboardService
    ) { }

    ngOnInit(): void {
        this.getDashboardInfo();
    }
    getDashboardInfo(): any{
        this.loading = true;
        this.dashboardService.getDashboardInfo().subscribe({
            next: (res)=>{
                this.loading = false;
                // console.log(res);
                
                this.data = res;
            }
        })
    }
}
