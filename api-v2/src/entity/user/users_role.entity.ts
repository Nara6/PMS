/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";

// import { Users } from "./users.entity";
@Entity('users_role')
export class UsersRole {
    @PrimaryGeneratedColumn()
    id: number
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
    en_name:string

    // Timestamp
    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at?: Date; //Create Date
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at?: Date; //Updated date
}
