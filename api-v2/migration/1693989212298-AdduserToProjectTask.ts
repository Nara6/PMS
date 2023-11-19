import { MigrationInterface, QueryRunner } from "typeorm";

export class AdduserToProjectTask1693989212298 implements MigrationInterface {
    name = 'AdduserToProjectTask1693989212298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_task" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "projects_task" ADD CONSTRAINT "FK_d8f619c37853ca44e4c823ca35a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_task" DROP CONSTRAINT "FK_d8f619c37853ca44e4c823ca35a"`);
        await queryRunner.query(`ALTER TABLE "projects_task" DROP COLUMN "user_id"`);
    }

}
