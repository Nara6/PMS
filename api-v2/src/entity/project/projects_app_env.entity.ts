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
import { VMs } from "../vm/vms.entity";
import { VMsEnv } from "../vm/vms_env.entity";
import { ProjectsApp } from "./projects_app.entity";

@Entity('projects_app_env')
export class ProjectsAppEnv {
    @PrimaryGeneratedColumn()
    id: number
    // Column app_id M:1
    @ManyToOne( ()=> ProjectsApp,{
        onDelete :"CASCADE",
    })
    @JoinColumn(
        {
            name: 'app_id',
            referencedColumnName:"id"
        }
    )
    ProjectsApp: ProjectsApp
    // Column env_id M:1
    @ManyToOne( ()=> VMsEnv, {
        onDelete: 'CASCADE'
    } )
    @JoinColumn(
        {
            name: 'env_id',
            referencedColumnName:"id"
        }
    )
    VMsEnv: VMsEnv
    // Column vm_id M:1
    @ManyToOne( ()=> VMs, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'vm_id',
            referencedColumnName:"id"
        }
    )
    VMs: VMs
    // Column url
    @Column({
        type:'varchar',
        length : 100,
    })
    url: string
    // Column port
    @Column({
        type:'varchar',
        length : 10,
        nullable : true
    })
    port: string
    // Column note
    @Column({
        type:'varchar',
        length: 255,
        nullable: true
    })
    note: string
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
