import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollbarModule } from 'helpers/directives/scrollbar/public-api';
import { NavigationBasicItemComponent } from 'helpers/components/navigation/components/basic/basic.component';
import { NavigationCollapsableItemComponent } from 'helpers/components/navigation/components/collapsable/collapsable.component';
import { NavigationGroupItemComponent } from 'helpers/components/navigation/components/group/group.component';
import { NavigationComponent } from 'helpers/components/navigation/navigation.component';
import { MaterialModule } from 'app/shared/material-module';

@NgModule({
    declarations: [
        NavigationBasicItemComponent,
        NavigationCollapsableItemComponent,
        NavigationGroupItemComponent,
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ScrollbarModule,
    ],
    exports: [NavigationComponent],
})
export class NavigationModule { }
