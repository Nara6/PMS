/* eslint-disable prettier/prettier */
import { 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne,  
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
import { Users } from "../user/users.entity";
import { Projects } from "./projects.entity";
// import { ProjectsApp } from "./projects_app.entity";
import { ProjectsUserRole } from "./projects_user_role.entity";

@Entity('projects_user')
export class ProjectsUser {
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
    ProjectsUser: Projects
    // Column user_id M:1
    @ManyToOne( ()=> Users, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'user_id',
            referencedColumnName:"id"
        }
    )
    Users: Users
    // Column user_id M:1
    @ManyToOne( ()=> ProjectsUserRole, {
        onDelete: 'CASCADE',
    })
    @JoinColumn(
        {
            name: 'role_id',
            referencedColumnName:"id",
        }
    )
    ProjectsUserRole: ProjectsUserRole
   
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
