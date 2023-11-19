/* eslint-disable prettier/prettier */
import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn ,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
    } 
from "typeorm";
import { Users } from "./users.entity";

@Entity('users_log')
export class UsersLog {
    @PrimaryGeneratedColumn()
    id: number
    // Column User_id with M:1 => userId
    @ManyToOne( ()=> Users, {
        onDelete:'CASCADE',
    })
    @JoinColumn(
        {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    )
    user: Users
    @Column({
        type: 'varchar',
        length: 20,
    })
    ip: string
    @Column({
        type: 'varchar',
        length: 100,
    })
    os: string
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    agent: string
     // Timestamp
     @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at?: Date; //Create Date


}
