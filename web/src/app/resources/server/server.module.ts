import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
    {
        path: '',
        component: ListingComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ListingComponent
    ],
})
export class ServerModule { }
