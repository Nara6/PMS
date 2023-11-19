/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
import { Projects } from "./projects.entity";
import { ProjectsTaskStatus } from "./projects_task_status.entity";
import { Users } from "../user/users.entity";
// import { Projects } from "./projects.entity";

@Entity('projects_task')
export class ProjectsTask {
    @PrimaryGeneratedColumn()
    id: number
    // Column project_id M:1
    @ManyToOne( ()=> Projects, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'project_id',
            referencedColumnName:'id'
        }
    )
    Projects: Projects
    // Column status_id M:1
    @ManyToOne( ()=> ProjectsTaskStatus, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'status_id',
            referencedColumnName:'id'
        }
    )
    ProjectsTaskStatus: ProjectsTaskStatus
    // Column name
    @Column({
        type:'varchar',
    })
    name: string
    // Column description
    @Column({
        type:'varchar',
        nullable : true
    })
    description: string
    // Column due_date
    @Column({
        type: 'date',
        nullable: true
    })
    due_date: Date
    // Create a many-to-many relationship with Users
    @ManyToMany(() => Users)
    @JoinTable({
        name: 'projects_task_users', // Create a junction table
        joinColumn: {
            name: 'task_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    Users: Users[];
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
