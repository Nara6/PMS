/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsTimelineStatusSeeding1691744171886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Project_Timeline_StatusToSeed = [
            {
                name: 'Not Started',
                color: '#17202A'
            },
            {
                name: 'Started',
                color: '#85C1E9'
            },
            {
                name: 'Percentage',
                color: '#1B4F72'
            },
            {
                name: 'Complete',
                color: '#117864'
            }
        ];
        for (const projects_timeline_status of Project_Timeline_StatusToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_timeline_status"(
                    "name",
                    "color"
                ) VALUES (
                    '${projects_timeline_status.name}',
                    '${projects_timeline_status.color}'
                )`
            );
        }
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
