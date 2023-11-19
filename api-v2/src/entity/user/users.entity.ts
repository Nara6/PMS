/* eslint-disable prettier/prettier */
import { Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,  
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    BeforeInsert,
    OneToMany
    } 
from "typeorm";

import { UsersDepartment } from "./users_department.entity";
import { UsersOffice } from "./users_office.entity";
import { UsersPosition } from "./users_position.entity";
import { UsersRole } from "./users_role.entity";
import { UsersTitle } from "./users_title.entity";
import * as bcrypt from 'bcrypt';
import { ProjectsUser } from "../project/projects_user.entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number
    // Column department_id M:1
    @ManyToOne( ()=> UsersDepartment, {
        onDelete:"CASCADE"
    })
    @JoinColumn(
        {
            name: 'department_id',
            referencedColumnName: 'id'
        }
    )
    department: UsersDepartment
    // Column office_id M:1
    @ManyToOne( () => UsersOffice, {
        onDelete: 'CASCADE'
    } )
    @JoinColumn(
        {
            name: 'office_id',
            referencedColumnName: 'id'
        }
    )
    office: UsersOffice
    // Column position_id M:1
    @ManyToOne( () => UsersPosition, {
        onDelete: 'CASCADE'
    } )
    @JoinColumn(
        {
            name: 'position_id',
            referencedColumnName: 'id'
        }
    )
    position: UsersPosition
    // Column title_id M:1
    @ManyToOne( () => UsersTitle, {
        onDelete: "CASCADE",
    } )
    @JoinColumn(
        {
            name: 'title_id',
            referencedColumnName: 'id'
        }
    )
    title: UsersTitle    
    // Column role_id M:1
    @ManyToOne( () => UsersRole, {
        onDelete: "CASCADE",
    } )
    @JoinColumn(
        {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    )
    role: UsersRole    
    // Column vpn_account
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    vpn_account: string
    // Column avatar (Image_Url)
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    avatar: string
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
    // Column username (cannot duplicated -> unique)
    @Column({
        type:'varchar',
        length : 100,
        unique: true
    })
    username: string
    // Column email (cannot duplicated -> unique)
    @Column({
        type:'varchar',
        length : 100,
        unique: true
    })
    email: string
    // Column phone
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
        
    })
    phone: string
    // Column telegram account
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    tg_username: string
    // Column password
    @Exclude()
    @Column({
        type:'varchar',
        // select: false
    })
    password: string
    // Column about
    @Column({
        type:'varchar',
        nullable: true
    })
    about: string
    // Column is_active?

    @Column({
        type:'boolean',
        default: true
    })
    is_active: boolean;
    // Column
    @Column({
        type: 'varchar',
        nullable: true
    })
    last_activity: string;
    // Reverse from project
    @OneToMany(()=> ProjectsUser, (projectUser)=> projectUser.Users)
    projects: ProjectsUser

    // Timestamp
    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at?: Date; //Create Date
    @UpdateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at?: Date; //Updated date
    @DeleteDateColumn()
    deleted_at? : Date ;

}
