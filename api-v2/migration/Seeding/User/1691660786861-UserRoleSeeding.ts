/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class UserRoleSeeding1691660786861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
               
        const usersRoleToSeed= [
            {en_name: 'Manager', kh_name: 'អ្នកគ្រប់គ្រង'},
            {en_name: 'Admin', kh_name: 'អ្នកគ្រប់គ្រងជាន់ខ្ពស់'},
            {en_name: 'Project Admin', kh_name: 'អ្នកកាន់គម្រោង'},
            {en_name: 'Project Lead', kh_name: 'អ្នកដឹកនាំគម្រោង'},
            {en_name: 'DevOps Head', kh_name: 'អ្នកកាន់DevOps'},
            {en_name: 'Developer', kh_name: 'អ្នកអភិវឌ្ឍន៍កម្មវិធី'},
        ];
            // Insert roles
        for (const role of usersRoleToSeed) {
            await queryRunner.query(
            `INSERT INTO "users_role"("en_name", "kh_name") VALUES ('${role.en_name}', '${role.kh_name}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
