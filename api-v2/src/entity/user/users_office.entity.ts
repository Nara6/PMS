/* eslint-disable prettier/prettier */
import { 
    Column,
    Entity, 
    PrimaryGeneratedColumn,
    JoinColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne, 
    } 
from "typeorm";

// import { Users } from "./users.entity";
import { UsersDepartment } from "./users_department.entity";

@Entity('users_office')
export class UsersOffice {
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
    // Column department_id M:1
    @ManyToOne(()=> UsersDepartment,{
        onDelete:"CASCADE",
        nullable: true
    } )
    @JoinColumn(
        {
            name :"department_id",
        }
    )
    department_id: UsersDepartment
    // // Column Inverse 1:M
    // @OneToMany( ()=> Users, (users)=> users.office )
    // user: Users
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
