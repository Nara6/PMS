/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectTaskSeeding1693886953792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ProjectTaskToSeed = [
            {
                project_id: 1,
                status_id: 1,
                name: 'Deploy',
            },
            {
                project_id: 1,
                status_id: 1,
                name: 'Testing',
            }
        ]

        for (const project_task of ProjectTaskToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_task"(
                    "project_id",
                    "status_id",
                    "name"
                ) VALUES (
                    ${project_task.project_id},
                    ${project_task.status_id},
                    '${project_task.name}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
