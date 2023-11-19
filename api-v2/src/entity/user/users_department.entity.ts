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

@Entity('users_department')
export class UsersDepartment {
    @PrimaryGeneratedColumn()
    id: number
    // Column kh_name 
    @Column({
        type:'varchar',
        length : 200,
        nullable : true
    })
    kh_name: string
    // Column en_name 
    @Column({
        type:'varchar',
        length : 200,
        nullable : true
    })
    en_name:string
    // // Column Inverse 1:M
    // @OneToMany( ()=> Users, (users)=> users.department )
    // user: Users
    // Timestamp
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
