import { MigrationInterface, QueryRunner } from "typeorm";

export class Technology1691640461919 implements MigrationInterface {
    name = 'Technology1691640461919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tech" ("id" SERIAL NOT NULL, "name" character varying(100), "language" character varying(100) NOT NULL, "icon" character varying, "description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d7eeeeef666045db381daafa4d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tech_libs_type" ("id" SERIAL NOT NULL, "name" character varying(100), "language" character varying(100) NOT NULL, "icon" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b50b4ca2ec44a9d5fb954178fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tech_libraries" ("id" SERIAL NOT NULL, "name" character varying(100), "icon" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tech_id" integer, "type_id" integer, CONSTRAINT "PK_084520142a2fe0b45cd65d17fca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tech_libraries" ADD CONSTRAINT "FK_e7b4ad70fc9d491e05061a26598" FOREIGN KEY ("tech_id") REFERENCES "tech"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tech_libraries" ADD CONSTRAINT "FK_02dd32a260327af17200492ac45" FOREIGN KEY ("type_id") REFERENCES "tech_libs_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tech_libraries" DROP CONSTRAINT "FK_02dd32a260327af17200492ac45"`);
        await queryRunner.query(`ALTER TABLE "tech_libraries" DROP CONSTRAINT "FK_e7b4ad70fc9d491e05061a26598"`);
        await queryRunner.query(`DROP TABLE "tech_libraries"`);
        await queryRunner.query(`DROP TABLE "tech_libs_type"`);
        await queryRunner.query(`DROP TABLE "tech"`);
    }

}
