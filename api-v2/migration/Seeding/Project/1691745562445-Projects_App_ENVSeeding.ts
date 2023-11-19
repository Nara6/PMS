/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsAppENVSeeding1691745562445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_App_ENVToSeed = [
            {
                app_id: 1,
                env_id: 1,
                vm_id: 1,
                url: 'localhost',
                port: '3001',
                note: 'Nothing'
            }
        ];
        for(const projects_app_env of Projects_App_ENVToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_app_env"(
                    "app_id",
                    "env_id",
                    "vm_id",
                    "url",
                    "port",
                    "note"
                ) VALUES (
                    ${projects_app_env.app_id},
                    ${projects_app_env.env_id},
                    ${projects_app_env.vm_id},
                    '${projects_app_env.url}',
                    '${projects_app_env.port}',
                    '${projects_app_env.note}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
