/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class UserPositionSeeding1691661079028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersPositionToSeed= [
            {en_name: 'General Director', kh_name: 'អគ្គនាយក'},
            {en_name: 'Deputy General Director', kh_name: 'អគ្គនាយករង'},
            {en_name: 'Director', kh_name: 'ប្រធាននាយកដ្ឋាន'},
            {en_name: 'Deputy Director', kh_name: 'អនុប្រធាននាយកដ្ឋាន'},
            {en_name: 'Cheif Office', kh_name: 'ប្រធានការិយាល័យ'},
            {en_name: 'Vice Check Office', kh_name: 'អនុប្រធានការិយាល័យ'},
            {en_name: 'Official', kh_name: 'មន្រ្តី'},
            {en_name: 'Staff', kh_name: 'បុគ្គលិកស្ម័គ្រចិត្ត'},
            {en_name: 'Intern', kh_name: 'បុគ្គលិកកម្មសិក្សា'},
        ];
        // Insert positions
        for (const position of usersPositionToSeed) {
            await queryRunner.query(
            `INSERT INTO "users_position"("en_name", "kh_name") VALUES ('${position.en_name}', '${position.kh_name}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
