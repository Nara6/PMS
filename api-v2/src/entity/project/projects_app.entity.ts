/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne,  
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
import { Tech } from "../technology/tech.entity";
import { Projects } from "./projects.entity";
// import { ProjectsAppEnv } from "./projects_app_env.entity";
import { ProjectsAppType } from "./projects_app_type.entity";

@Entity('projects_app')
export class ProjectsApp {
    @PrimaryGeneratedColumn()
    id: number
    // Column type_id M:1
    @ManyToOne( ()=> ProjectsAppType, {
        onDelete:"CASCADE",
    })
    @JoinColumn(
        {
            name: 'type_id',
            referencedColumnName: 'id'
        }
    )
    ProjectsAppType: ProjectsAppType
     // Column project_id M:1
    @ManyToOne( ()=> Projects, {
        onDelete:"CASCADE",
    })
    @JoinColumn(
        {
            name: 'project_id',
            referencedColumnName:"id"
        }
    )
    Projects: Projects
    // Column tech_id M:1
    @ManyToOne( ()=> Tech, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'tech_id',
            referencedColumnName:"id"
        }
    )
    tech: Tech
    // Column name
    @Column({
        type:'varchar',
        length : 100,
    })
    name: string
    // Column abbre
    @Column({
        type:'varchar',
        length : 10,
        nullable : true
    })
    abbre: string
    // Column tech_version
    @Column({
        type:'varchar',
        length: 100,
    })
    tech_version: string
    // Column description
    @Column({
        type:'varchar',
        length: 255,
        nullable: true
    })
    description: string
    // // Inverse 1:M
    // @OneToMany( ()=> ProjectsAppEnv, (projects_app_env)=> projects_app_env.ProjectsApp )
    // ProjectsApp: ProjectsAppEnv
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
