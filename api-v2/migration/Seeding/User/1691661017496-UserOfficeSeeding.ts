/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class UserOfficeSeeding1691661017496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersOfficeToSeed= [
            {department_id: 2,en_name: 'Office 1', kh_name: 'ការិយាល័យទី១'},
            {department_id: 2,en_name: 'Office 2', kh_name: 'ការិយាល័យទី២'},
            {department_id: 2,en_name: 'Office 3', kh_name: 'ការិយាល័យទី៣'},
            {department_id: 2,en_name: 'Office 4', kh_name: 'ការិយាល័យទី៤'},

        ];
            // Insert offices
        for (const office of usersOfficeToSeed) {
            await queryRunner.query(
            `INSERT INTO "users_office"("department_id", "en_name", "kh_name") VALUES (${office.department_id}, '${office.en_name}', '${office.kh_name}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
