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
import { Projects } from "./projects.entity";
import { ProjectsTimeLineStat } from "./projects_timeline_status.entity";

@Entity('projects_timeline')
export class ProjectsTimeLine {
    @PrimaryGeneratedColumn()
    id: number
    // Column project_id M:1
    @ManyToOne( ()=> Projects, {
        onDelete:'CASCADE'
    })
    @JoinColumn(
        {
            name: 'project_id',
            referencedColumnName : 'id'
        }
    )
    Projects: Projects
    // Column user_id M:1
    @ManyToOne( ()=> ProjectsTimeLineStat, {
        onDelete:'CASCADE'
    })
    @JoinColumn(
        {
            name: 'status_id',
            referencedColumnName : 'id'
        }
    )
    ProjectsTimeLineStat: ProjectsTimeLineStat
    // Column task
    @Column({
        type: 'varchar',
    })
    task: string
    // Column from
    @Column({
        type: 'date',
        nullable: true
    })
    from: Date
    // Column to
    @Column({
        type: 'date',
        nullable: true
    })
    to: Date
   
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
