import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnIsActiveToUser1692855493703 implements MigrationInterface {
    name = 'AddColumnIsActiveToUser1692855493703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_active"`);
    }

}
