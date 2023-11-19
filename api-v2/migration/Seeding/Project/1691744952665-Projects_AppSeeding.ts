/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsAppSeeding1691744952665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_AppToSeed = [
            {
                type_id: 2,
                project_id: 1,
                tech_id: 1,
                name: 'PMS',
                tech_version: 'V1',
                description:'Project Management System'
            }
        ];
        for(const projects_app of Projects_AppToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_app"(
                    "type_id",
                    "project_id",
                    "tech_id",
                    "name",
                    "tech_version",
                    "description"
                ) VALUES (
                    ${projects_app.type_id},
                    ${projects_app.project_id},
                    ${projects_app.tech_id},
                    '${projects_app.name}',
                    '${projects_app.tech_version}',
                    '${projects_app.description}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
