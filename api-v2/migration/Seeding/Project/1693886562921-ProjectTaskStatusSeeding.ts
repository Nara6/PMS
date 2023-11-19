/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectTaskStatusSeeding1693886562921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_Task_StatusToSeed = [
            {
                name: 'TO-DO',
                color: '#E52417'
            },
            {
                name: 'IN PROGRESS',
                color: '#1750E5'
            },
            {
                name: 'COMPLETE',
                color: '#1EE517'
            },
        ];
        for (const project_task_status of Projects_Task_StatusToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_task_status"(
                    "name",
                    "color"
                ) VALUES (
                    '${project_task_status.name}',
                    '${project_task_status.color}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
