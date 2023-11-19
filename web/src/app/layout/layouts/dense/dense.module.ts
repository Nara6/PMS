import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FullscreenModule } from 'helpers/components/fullscreen';
import { LoadingBarModule } from 'helpers/components/loading-bar';
import { NavigationModule } from 'helpers/components/navigation';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { DenseLayoutComponent } from 'app/layout/layouts/dense/dense.component';
import { SearchModule } from 'app/layout/common/search/search.module';

@NgModule({
    declarations: [
        DenseLayoutComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        FullscreenModule,
        LoadingBarModule,
        NavigationModule,
        LanguagesModule,
        UserModule,
        SharedModule,
        SearchModule
    ],
    exports: [
        DenseLayoutComponent
    ]
})
export class DenseLayoutModule { }
