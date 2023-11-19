/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { ProjectsUser } from "./projects_user.entity";

@Entity('projects_user_role')
export class ProjectsUserRole {
    @PrimaryGeneratedColumn()
    id: number
    // Column name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    name: string
    // Column abbre
    @Column({
        type:'varchar',
        length : 10,
        nullable : true
    })
    abbre: string
    // // Inverse 1:M
    // @OneToMany( ()=> ProjectsUser, (projects_user)=> projects_user.ProjectsUserRole )
    // ProjectsUser: ProjectsUser
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
