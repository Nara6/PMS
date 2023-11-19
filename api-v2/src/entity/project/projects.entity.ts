/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { ProjectsApp } from "./projects_app.entity";
import { ProjectsStatus } from "./projects_status.entity";
// import { ProjectsTimeLine } from "./projects_timeline.entity";
import { ProjectsType } from "./projects_type.entity";
import { ProjectsTask } from "./projects_task.entity";
import { ProjectsTimeLine } from "./projects_timeline.entity";
import { ProjectsUser } from "./projects_user.entity";
// import { ProjectsUser } from "./projects_user.entity";

@Entity('projects')
export class Projects {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne( ()=> ProjectsType, {
        onDelete:"CASCADE",
    })
    @JoinColumn(
        {
            name: 'type_id',
            referencedColumnName: 'id'
        }
    )
    ProjectsType: ProjectsType
    @ManyToOne( ()=> ProjectsStatus, {
        onDelete:"CASCADE",
    })
    @JoinColumn(
        {
            name: 'status_id',
            referencedColumnName: 'id'
        }
    )
    ProjectsStatus: ProjectsStatus
    // Column kh_name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    kh_name: string
    // Column en_name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    en_name: string
    // Column abbre
    @Column({
        type:'varchar',
        length : 10,
        nullable : true
    })
    abbre: string
    // Column icon
    @Column({
        type:'varchar',
        nullable : true
    })
    icon: string
    @Column(
        {
            type: 'varchar',
            nullable: true,
        }
    )
    start_date: Date;
    @Column(
        {
            type: 'varchar',
            nullable: true,
        }
    )
    due_date: Date;
    // Inverse 1:M
    @OneToMany( ()=> ProjectsTask, (projects_task)=> projects_task.Projects )
    ProjectsTask: ProjectsTask
    // Inverse 1:M
    @OneToMany( ()=> ProjectsUser, (projects_user)=> projects_user.ProjectsUser )
    ProjectsUser: ProjectsUser
    // Inverse 1:M
    @OneToMany( ()=> ProjectsTimeLine, (projects_timeline)=> projects_timeline.Projects )
    ProjectsTimeLine: ProjectsTimeLine
    // Timestamp
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at?: Date; //Create Date
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at?: Date; //Updated date
}
