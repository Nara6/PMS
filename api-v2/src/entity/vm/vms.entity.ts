/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { ProjectsAppEnv } from "../project/projects_app_env.entity";
// import { VMsAccess } from "./vms_access.entity";
import { VMsEnv } from "./vms_env.entity";
import { VMsOS } from "./vms_os.entity";
import { VMsStatus } from "./vms_status.entity";
import { VMsTag } from "./vms_tag.entity";
import { ProjectsAppEnv } from "../project/projects_app_env.entity";
import { VMsAccess } from "./vms_access.entity";

@Entity('vms')
export class VMs {
    @PrimaryGeneratedColumn()
    id: number
    // Column envId M:1 => vms_env
    @ManyToOne( ()=> VMsEnv,{
        onDelete:"CASCADE"
    })
    @JoinColumn(
        {
            name: 'env_id',
            referencedColumnName : 'id'
        }
    )
    env: VMsEnv
    // Column osId M:1 => vms_os
    @ManyToOne( ()=> VMsOS,{
        onDelete:"CASCADE"
    })
    @JoinColumn(
        {
            name: 'os_id',
            referencedColumnName : 'id'
        }
    )
    os: VMsOS
    // Column tagId M:1 => vms_tag
    @ManyToOne( ()=> VMsTag, {
        onDelete:'CASCADE'
    })
    @JoinColumn(
        {
            name: 'tag_id',
            referencedColumnName : 'id'
        }
    )
    tag: VMsTag
    // Column statusId M:1 => vms_status
    @ManyToOne( ()=> VMsStatus, {
        onDelete:'CASCADE',
    })
    @JoinColumn(
        {
            name: 'status_id',
            referencedColumnName : 'id'
        }
    )
    status: VMsStatus
    // Column name
    @Column({
        type: "varchar",
        length: 100,
    })
    name: string
    // Column private_ip
    @Column({
        type: "varchar",
        length: 100,
    })
    private_ip: string
    // Column public_ip
    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    public_ip: string
    // Column ram
    @Column({
        type: 'int'
    })
    ram: number
    // Column hdd
    @Column({
        type: 'int'
    })
    hdd: number
    // Column core
    @Column ({
        type: 'varchar',
        length: 100,
    })
    core: string
    // Column os_version
    @Column ({
        type: 'varchar',
        length: 100,
    })
    os_version: string
     // Column note
    @Column ({
        type: 'varchar',
        nullable: true
    })
    note: string
    // Reverse from project_app_envs
    @OneToMany(()=> ProjectsAppEnv, (projectAppenv)=> projectAppenv.VMs)
    projectsAppEnvs: ProjectsAppEnv
    // Reverse from project_app_envs
    @OneToMany(()=> VMsAccess, (projectAppenv)=> projectAppenv.from_vm)
    VMAccess: VMsAccess
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
