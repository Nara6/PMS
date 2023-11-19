import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const productTypeRoutes: Routes = [
    {
        path: '',
        component: ListingComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(productTypeRoutes),
        SharedModule
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        UpdateComponent
    ],
})
export class CatogoryModule {}
