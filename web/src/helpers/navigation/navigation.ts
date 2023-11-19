import { NavigationItem } from 'helpers/components/navigation';
let isAdmin = true;

export const defaultNavigation: NavigationItem[] = [
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') !== 'Developer'){
                isAdmin = false; 
            }
            return isAdmin;
        },
        id: 'dashboad',
        title: 'Dashboad',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/dashboard',
    },
    {
        id: 'my-works',
        title: 'My work',
        type: 'basic',
        icon: 'heroicons_outline:briefcase',
        link: '/my-works',
    },
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') !== 'Developer'){
                isAdmin = false; 
            }
            return isAdmin;
        },
        id: 'project',
        title: 'Project',
        type: 'basic',
        icon: 'heroicons_outline:sparkles',
        link: '/projects',
    }, 
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') !== 'Developer'){
                isAdmin = false; 
            }
            return isAdmin;
        },
        id: 'server',
        title: 'Server',
        type: 'basic',
        icon: 'heroicons_outline:server',
        link: '/servers',
    },
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') == 'Admin'){
                isAdmin = false; 
            }
            return isAdmin;
        },
        id: 'user',
        title: 'User',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/users',
    },
    {
        hidden() {
            isAdmin = true;
            if(localStorage.getItem('role') == 'Admin'){
                isAdmin = false; 
            }
            return isAdmin;
        },
        id: 'setting',
        title: 'Setting',
        type: 'collapsable',
        icon: 'feather:settings',
        children: [
            {
                id: 'setting.user',
                title: 'User',
                type: 'collapsable',
                children: [
                    {
                        id: 'setting.organization',
                        title: 'Organization',
                        type: 'basic',
                        link: '/settings/user/organizations',
                    },
                    {
                        id: 'setting.title',
                        title: 'Title',
                        type: 'basic',
                        link: '/settings/user/titles',
                    },
                    {
                        id: 'setting.office',
                        title: 'Office',
                        type: 'basic',
                        link: '/settings/user/offices',
                    },
                    {
                        id: 'setting.postion',
                        title: 'Position',
                        type: 'basic',
                        link: '/settings/user/positions',
                    },
                    {
                        id: 'setting.role',
                        title: 'Role',
                        type: 'basic',
                        link: '/settings/user/roles',
                    },
                ]
            },
            {
                id: 'setting.vm',
                title: 'VM',
                type: 'collapsable',
                children: [
                    {
                        id: 'setting.env',
                        title: 'Env',
                        type: 'basic',
                        link: '/settings/vm/envs',
                    },
                    {
                        id: 'setting.os',
                        title: 'OS',
                        type: 'basic',
                        link: '/settings/vm/oss',
                    },
                    {
                        id: 'setting.office',
                        title: 'Status',
                        type: 'basic',
                        link: '/settings/vm/status',
                    },
                ]
            },
            {
                id: 'setting.tech',
                title: 'Tech',
                type: 'collapsable',
                children: [
                    {
                        id: 'setting.framework',
                        title: 'Framework',
                        type: 'basic',
                        link: '/settings/tech/frameworks',
                    },
                    {
                        id: 'setting.tech.type',
                        title: 'Type',
                        type: 'basic',
                        link: '/settings/tech/types',
                    },

                ]
            },
            {
                id: 'setting.project',
                title: 'Project',
                type: 'collapsable',
                children: [
                    {
                        id: 'setting.project.category',
                        title: 'Category',
                        type: 'basic',
                        link: '/settings/project/categories',
                    },
                    {
                        id: 'setting.project.status',
                        title: 'Status',
                        type: 'basic',
                        link: '/settings/project/status',
                    },
                    {
                        id: 'setting.project.role',
                        title: 'Role',
                        type: 'basic',
                        link: '/settings/project/roles',
                    },
                    {
                        id: 'setting.project.service_type',
                        title: 'Service Type',
                        type: 'basic',
                        link: '/settings/project/service_types',
                    },

                ]
            },
            
            
        ],
    },
    {
        id: 'account',
        title: 'Account',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/account',
    },

];
