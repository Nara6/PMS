/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { VMs } from "./vms.entity";

@Entity('vms_os')
export class VMsOS {
    @PrimaryGeneratedColumn()
    id: number
    // Column name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    name: string
    // Column icon
    @Column({
        type: 'varchar',
        nullable : true
    })
    icon:string
    // // Inverse 1:M 
    // @OneToMany( () => VMs ,(vms)=> vms.os )
    // vm: VMs
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
