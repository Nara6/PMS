/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsUserRoleSeeding1691743834540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_User_RoleToSeed = [
            {
                name: 'Business Analyst',
                abbre: 'BA'
            },
            {
                name: 'Database Designer',
                abbre: 'DD'
            },
            {
                name: 'UI/UX Designer',
                abbre: 'UI/UX'
            },
            {
                name: 'DevOp Engineer',
                abbre: 'DevOps'
            },
            {
                name: 'Quality Assurance',
                abbre: 'QA'
            },
            {
                name: 'Technical Lead',
                abbre: 'Tech. L'
            },
            {
                name: 'Team Lead',
                abbre: 'TL'
            },
            {
                name: 'Developer',
                abbre: 'Dev'
            },
            {
                name: 'Admin',
                abbre: 'Admin'
            }
        ];
        for (const project_user_role of Projects_User_RoleToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_user_role"(
                    "name",
                    "abbre"
                ) VALUES (
                    '${project_user_role.name}',
                    '${project_user_role.abbre}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
