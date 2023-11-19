/* eslint-disable prettier/prettier */
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Projects } from "../project/projects.entity";

@Entity('workspace')
export class Workspace{
    @PrimaryGeneratedColumn()
    id: number
    // Column project_id M:1
    @ManyToOne( ()=> Projects, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'project_id',
            referencedColumnName:'id'
        }
    )
    Projects: Projects
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