import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { ListingComponent } from './listing/listing.component';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const posRoutes: Routes = [
    {
        path: '',
        component: ListingComponent
    },
    {
        path: 'create',
        component: CreateComponent
    }
];

@NgModule({
    declarations: [
        ListingComponent,
        PreviewDialogComponent,
        CreateComponent,
        UpdateComponent,
    ],
    imports: [
        SharedModule,
        ScrollbarModule,
        RouterModule.forChild(posRoutes),
    ]
})
export class myWorkModule { }
