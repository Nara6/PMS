import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards'
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },

    // Auth routes for guests
    {
        path: 'auth',
        component: LayoutComponent,
        canActivate: [NoAuthGuard],
        data: {
            layout: 'empty'
        },
        loadChildren: () => import('app/resources/auth/auth.module').then(m => m.AuthModule)
    },

    // Admin routes & authenticated users
    {
        path: 'dashboard',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager', 'Developer','Project Admin', 'Project Lead', 'DevOps Head' ]
        },
        loadChildren: () => import('app/resources/dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'projects',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager','Project Admin', 'Project Lead', 'DevOps Head']
        },
        loadChildren: () => import('app/resources/project/project.module').then(m => m.ProjectModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'my-works',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager', 'Developer','Project Admin', 'Project Lead', 'DevOps Head']
        },
        loadChildren: () => import('app/resources/my-work/my_work.module').then(m => m.myWorkModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'servers',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager', 'Developer','Project Admin', 'Project Lead', 'DevOps Head']
        },
        loadChildren: () => import('app/resources/server/server.module').then(m => m.ServerModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'settings',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager']
        },
        loadChildren: () => import('app/resources/settings/settings.module').then(m => m.SettingsModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'users',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager']
        },
        loadChildren: () => import('app/resources/user/user.module').then(m => m.UserModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'account',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager', 'Developer','Project Admin', 'Project Lead', 'DevOps Head']
        },
        loadChildren: () => import('app/resources/profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard]
    },
    {
        path: '404-not-found',
        pathMatch: 'full',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        canActivate: [AuthGuard],
        data: {
            expectedRole: ['Admin', 'Manager', 'Developer','Project Admin', 'Project Lead', 'DevOps Head']
        },
        loadChildren: () => import('app/resources/error/error-404.module').then(m => m.Error404Module),
        canLoad: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '404-not-found'
    }
];
