import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserProjectTask1693990041184 implements MigrationInterface {
    name = 'AddUserProjectTask1693990041184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_task" DROP CONSTRAINT "FK_d8f619c37853ca44e4c823ca35a"`);
        await queryRunner.query(`CREATE TABLE "projects_task_users" ("task_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_ce4abb4f39bb374bf060246296a" PRIMARY KEY ("task_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d02a3527497e39b89b12b9a09b" ON "projects_task_users" ("task_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a1da6f52f7e8d736364a172e4" ON "projects_task_users" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "projects_task" DROP COLUMN "user_id"`);

        await queryRunner.query(`ALTER TABLE "projects_task_users" ADD CONSTRAINT "FK_d02a3527497e39b89b12b9a09bf" FOREIGN KEY ("task_id") REFERENCES "projects_task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects_task_users" ADD CONSTRAINT "FK_7a1da6f52f7e8d736364a172e4d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_task_users" DROP CONSTRAINT "FK_7a1da6f52f7e8d736364a172e4d"`);
        await queryRunner.query(`ALTER TABLE "projects_task_users" DROP CONSTRAINT "FK_d02a3527497e39b89b12b9a09bf"`);
        await queryRunner.query(`ALTER TABLE "projects_task" ADD "user_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a1da6f52f7e8d736364a172e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d02a3527497e39b89b12b9a09b"`);
        await queryRunner.query(`DROP TABLE "projects_task_users"`);
        await queryRunner.query(`ALTER TABLE "projects_task" ADD CONSTRAINT "FK_d8f619c37853ca44e4c823ca35a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
