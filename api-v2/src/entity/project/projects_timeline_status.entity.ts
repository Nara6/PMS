/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity,  
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { ProjectsTimeLine } from "./projects_timeline.entity";

@Entity('projects_timeline_status')
export class ProjectsTimeLineStat {
    @PrimaryGeneratedColumn()
    id: number
    // Column name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    name: string
    // Column color
    @Column({
        type:'varchar',
        length : 50,
        nullable : true
    })
    color: string
    // // Inverse 1:M
    // @OneToMany( ()=> ProjectsTimeLine, (projects_timeline)=> projects_timeline.ProjectsTimeLineStat )
    // ProjectsTimeLine: ProjectsTimeLine
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
