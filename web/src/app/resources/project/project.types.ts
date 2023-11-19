export interface List {
    // id: number
    // name: string
    data: Project[]
}

export interface Project {
    id: number,
    kh_name: string,
    en_name: string,
    abbre: string,
    icon: string,
    created_at: string,
    ProjectsType: {},
    ProjectsStatus: {},
    start_date: string,
    due_date: string
    ProjectsTimeLine: [],
    ProjectsTask: [],
    ProjectsUser: ProjectsUser[]
}
export interface UpdateProject{
    id: number,
    kh_name: string,
    en_name: string,
    abbre: string,
    icon: string,
    start_date: string,
    due_date: string
    type_id: number,
    status_id: number
}
export interface ProjectSetup{
    ProjectType: ProjectType,
    ProjectStatus: ProjectStatus,
    User: Users[],
    Role: ProjectsUserRole[]
}
export interface ProjectType{
    id: number,
    name: string,
}
export interface ProjectStatus{
    id: number,
    name: string,
}
export interface ProjectsUser{
    id: number,
    Users : Users,
    ProjectsUserRole: ProjectsUserRole
}

export interface Users{
    id: number,
    en_name: string,
    kh_name: string,
    avatar: string,
}
export interface ProjectsUserRole{
    id: number,
    name: string,
    abbre: string
}