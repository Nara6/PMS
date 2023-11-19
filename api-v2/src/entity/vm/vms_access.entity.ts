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
import { VMs } from "./vms.entity";
import { VMsAccessType } from "./vms_access_type.entity";

@Entity('vms_access')
export class VMsAccess {
    @PrimaryGeneratedColumn()
    id: number
    // Column type_id M:1
    @ManyToOne( ()=> VMsAccessType, {
        onDelete: 'CASCADE'
    } )
    @JoinColumn(
        {
            name: 'type_id',
            referencedColumnName:'id'
        }
    )
    type: VMsAccessType
    // Column from_vpn_acc_id
    @Column({
        type: 'varchar',
        length: 100,
        nullable : true
    })
    from_vpn_acc_id: string
    // Column from_vm_id M:1
    @ManyToOne( ()=> VMs,{
        onDelete: 'CASCADE'
    } )
    @JoinColumn(
        {
            name: 'from_vm_id',
            referencedColumnName: 'id'
        }
    )
    from_vm: VMs
    // Column to_vm_id M:1
    @ManyToOne( ()=> VMs,{
        onDelete: 'CASCADE'
    } )
    @JoinColumn(
        {
            name: 'to_vm_id',
            referencedColumnName: 'id'
        }
    )
    to_vm: VMs
    // Column is_two_way
    @Column({
        type: 'boolean',
        nullable: false,
        default: 0
    })
    is_two_way: boolean
    // Column vpn_user_id
    @Column({
        type: 'varchar',
        length: 100,
        nullable : true
    })
    vpn_user_id: string
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
