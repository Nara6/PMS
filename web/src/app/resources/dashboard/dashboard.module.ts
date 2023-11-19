import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { PiechartComponent } from './piechart/piechart.component';
import { PgbarchartComponent } from './pgBarChart/pgbarchart.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        PiechartComponent,
        PgbarchartComponent
    ],
    imports: [
        ScrollbarModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslocoModule,
    ]
})
export class DashboardModule { }
