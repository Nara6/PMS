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
import { Tech } from "./tech.entity";
import { TechLibsType } from "./tech_libs_type.entity";

@Entity('tech_libraries')
export class TechLibraries {
    @PrimaryGeneratedColumn()
    id: number
    // Column tech_id M:1
    @ManyToOne( ()=> Tech ,{
        onDelete:"CASCADE"
    })
    @JoinColumn(
        {
            name: 'tech_id',
            referencedColumnName: 'id'
        }
    )
    tech: Tech
    // Column type_id M:1
    @ManyToOne( ()=> TechLibsType, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'type_id',
            referencedColumnName: 'id'
        }
    )
    type: TechLibsType
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
        nullable: true
    })
    icon: string

    
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
