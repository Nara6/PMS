/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsAppTypeSeeding1691743684443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_App_TypeToSeed = [
            {
                name: 'API',
                color: '#D7DBDD'
            },
            {
                name: 'WEB',
                color: '#F7DC6F'
            },
            {
                name: 'MOBILE',
                color: '#F5B041'
            },
        ];
        for (const project_app_type of Projects_App_TypeToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_app_type"(
                    "name",
                    "color"
                ) VALUES (
                    '${project_app_type.name}',
                    '${project_app_type.color}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
