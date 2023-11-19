import { Routes } from "@angular/router";
import { ListingComponent } from "./listing/listing.component";
import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";

export const routes: Routes = [
    {
        path: '',
        component: ListingComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: ':id',
        component: UpdateComponent
    },
];