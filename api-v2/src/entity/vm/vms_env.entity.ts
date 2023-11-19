/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { ProjectsAppEnv } from "../project/projects_app_env.entity";
// import { VMs } from "./vms.entity";

@Entity('vms_env')
export class VMsEnv {
    @PrimaryGeneratedColumn()
    id: number
    // Column name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    name: string
    // // Inverse 1:M 
    // @OneToMany( () => VMs ,(vms)=> vms.env )
    // vm: VMs
    //  // Inverse 1:M
    //  @OneToMany( ()=> ProjectsAppEnv, (projects_app_env)=> projects_app_env.VMsEnv )
    //  VMsEnv: ProjectsAppEnv
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
