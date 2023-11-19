/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsTypeSeeding1691743205642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_TypeToSeed = [
            {
                name: 'Core System'
            },
            {
                name: 'Automation'
            },
            {
                name: 'Internal'
            },
            {
                name: 'IoT'
            }
        ];
        for (const project_type of Projects_TypeToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_type"(
                    "name"
                ) VALUES (
                    '${project_type.name}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
