/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity,  
    PrimaryGeneratedColumn, 
    UpdateDateColumn
    } 
from "typeorm";
// import { TechLibraries } from "./tech_libraries.entity";

@Entity('tech_libs_type')
export class TechLibsType {
    @PrimaryGeneratedColumn()
    id: number
    // Column name
    @Column({
        type:'varchar',
        length : 100,
        nullable : true
    })
    name: string
    // Column language
    @Column({
        type: 'varchar',
        length: 100,
    })
    language: string
    // Column icon
    @Column({
        type: 'varchar',
        nullable: true
    })
    icon: string
    // // Inverse 1:M
    // @OneToMany( ()=> TechLibraries, (techlibraries)=> techlibraries.tech )
    // TechLibsType: TechLibraries

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
