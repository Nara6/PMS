/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693886056423 implements MigrationInterface {
    name = 'Migration1693886056423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects_task_status" ("id" SERIAL NOT NULL, "name" character varying(100), "color" character varying(50), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7404691edcfef6b0645de574ff5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_task" ("id" SERIAL NOT NULL, "name" character varying(100), "description" character varying, "due_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "project_id" integer, "status_id" integer, CONSTRAINT "PK_aaffaae0e7bace0d739e50eaae3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "project_id" integer, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects_task" ADD CONSTRAINT "FK_aaf38d87f5047c7bc0c4cc36c24" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_task" ADD CONSTRAINT "FK_7404691edcfef6b0645de574ff5" FOREIGN KEY ("status_id") REFERENCES "projects_task_status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_658ca0774c6910eb91fb94ffb2b" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_658ca0774c6910eb91fb94ffb2b"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
        await queryRunner.query(`DROP TABLE "projects_task"`);
        await queryRunner.query(`DROP TABLE "projects_task_status"`);
    }

}
