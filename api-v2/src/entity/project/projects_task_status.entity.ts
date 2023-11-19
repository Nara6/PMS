/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
import { ProjectsTask } from "./projects_task.entity";
// import { Projects } from "./projects.entity";

@Entity('projects_task_status')
export class ProjectsTaskStatus {
    @PrimaryGeneratedColumn()
    id: number
    // Column name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    name: string
    // Column color
    @Column({
        type:'varchar',
        length : 50,
        nullable : true
    })
    color: string
    // Inverse 1:M
    @OneToMany( ()=> ProjectsTask, (projects_task)=> projects_task.ProjectsTaskStatus )
    Task: ProjectsTask
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
