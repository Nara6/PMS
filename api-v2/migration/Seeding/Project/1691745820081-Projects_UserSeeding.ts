/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsUserSeeding1691745820081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_UserToSeed = [
            {
                project_id: 1,
                user_id: 1,
                role_id: 8
            },
            {
                project_id: 4,
                user_id: 14,
                role_id: 6
            },
            {
                project_id: 5,
                user_id: 14,
                role_id: 6
            },
            {
                project_id: 7,
                user_id: 16,
                role_id: 8
            },
            {
                project_id: 9,
                user_id: 21,
                role_id: 8
            },
            {
                project_id: 10,
                user_id: 4,
                role_id: 6
            },
            {
                project_id: 11,
                user_id: 16,
                role_id: 8
            },
            {
                project_id: 12,
                user_id: 22,
                role_id: 8
            },
            {
                project_id: 13,
                user_id: 14,
                role_id: 6
            },
            {
                project_id: 2,
                user_id: 21,
                role_id: 8
            },
            {
                project_id: 3,
                user_id: 20,
                role_id: 8
            },
            {
                project_id: 8,
                user_id: 20,
                role_id: 8
            },
            
        ];
        for(const projects_user of Projects_UserToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_user"(
                    "project_id",
                    "user_id",
                    "role_id"
                ) VALUES (
                    ${projects_user.project_id},
                    ${projects_user.user_id},
                    ${projects_user.role_id}
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
