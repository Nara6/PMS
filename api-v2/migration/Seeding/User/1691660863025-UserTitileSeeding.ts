/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class UserTitileSeeding1691660863025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersTitleToSeed= [
            {en_name: 'H.E', kh_name: 'ឯកឧត្ដម'},
            {en_name: 'Mr.', kh_name: 'លោក'},
            {en_name: 'Mrs.', kh_name: 'អ្នកនាង'},
            {en_name: 'Miss', kh_name: 'កញ្ញា'},
        ];
        // Insert titles
        for (const title of usersTitleToSeed) {
            await queryRunner.query(
            `INSERT INTO "users_title"("en_name", "kh_name") VALUES ('${title.en_name}', '${title.kh_name}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
