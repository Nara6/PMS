import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user',
                children: [
                    {
                        path: 'organizations',
                        loadChildren: () => import('app/resources/settings/user/organization/organization.module').then(m => m.OrganizationsModule)
                    },
                    {
                        path: 'positions',
                        loadChildren: () => import('app/resources/settings/user/position/position.module').then(m => m.PositionsModule)
                    },
                    {
                        path: 'titles',
                        loadChildren: () => import('app/resources/settings/user/title/title.module').then(m => m.TitleModule)
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import('app/resources/settings/user/role/role.module').then(m => m.RoleModule)
                    },
                    {
                        path: 'offices',
                        loadChildren: () => import('app/resources/settings/user/office/office.module').then(m => m.OfficeModule)
                    },
                ]
            },
            {
                path: 'vm',
                children: [
                    {
                        path: 'envs',
                        loadChildren: () => import('app/resources/settings/vm/env/env.module').then(m => m.EnvModule)
                    },
                    {
                        path: 'oss',
                        loadChildren: () => import('app/resources/settings/vm/os/os.module').then(m => m.OsModule)
                    },
                    {
                        path: 'status',
                        loadChildren: () => import('app/resources/settings/vm/status/status.module').then(m => m.StatusModule)
                    },
                ]
            },
            {
                path: 'tech',
                children: [
                    {
                        path: 'frameworks',
                        loadChildren: () => import('app/resources/settings/tech/framework/framework.module').then(m => m.FrameworkModule)
                    },
                    {
                        path: 'types',
                        loadChildren: () => import('app/resources/settings/tech/type/type.module').then(m => m.TypeModule)
                    },
                ]
            },
            {
                path: 'project',
                children: [
                    {
                        path: 'categories',
                        loadChildren: () => import('app/resources/settings/project/category/category.module').then(m => m.CatogoryModule)
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import('app/resources/settings/project/role/role.module').then(m => m.RoleModule)
                    },
                    {
                        path: 'status',
                        loadChildren: () => import('app/resources/settings/project/status/status.module').then(m => m.StatusModule)
                    },
                    {
                        path: 'service_types',
                        loadChildren: () => import('app/resources/settings/project/service_type/type.module').then(m => m.TypeModule)
                    },
                ]
            },
            
        ]
    }
];