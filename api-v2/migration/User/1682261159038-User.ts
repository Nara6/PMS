/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class User1682261159038 implements MigrationInterface {
    name = 'User1682261159038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_department" ("id" SERIAL NOT NULL, "kh_name" character varying(200), "en_name" character varying(200), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0921d1972cf861d568f5271cd85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_office" ("id" SERIAL NOT NULL, "kh_name" character varying(100), "en_name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "department_id" integer, CONSTRAINT "PK_6b31546fc92b0d7344f032d0447" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_position" ("id" SERIAL NOT NULL, "kh_name" character varying(100), "en_name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8e29a9d2f1fa57ebf1a4ce17353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_role" ("id" SERIAL NOT NULL, "kh_name" character varying(100), "en_name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a2cecd1a3531c0b041e29ba46e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_title" ("id" SERIAL NOT NULL, "kh_name" character varying(100), "en_name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4ce68a5a8f867dfff4114951c15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "vpn_account" character varying(100), "avatar" character varying(100), "kh_name" character varying(100), "en_name" character varying(100), "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(100), "tg_username" character varying(100), "password" character varying NOT NULL, "about" character varying, "last_activity" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "department_id" integer, "office_id" integer, "position_id" integer, "title_id" integer, "role_id" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_log" ("id" SERIAL NOT NULL, "ip" character varying(20) NOT NULL, "os" character varying(100) NOT NULL, "agent" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_97f34e82aaed57b121805dd6aa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_office" ADD CONSTRAINT "FK_232bb31e9895aadc4a044b9a559" FOREIGN KEY ("department_id") REFERENCES "users_department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "users_department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6b31546fc92b0d7344f032d0447" FOREIGN KEY ("office_id") REFERENCES "users_office"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8e29a9d2f1fa57ebf1a4ce17353" FOREIGN KEY ("position_id") REFERENCES "users_position"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4ce68a5a8f867dfff4114951c15" FOREIGN KEY ("title_id") REFERENCES "users_title"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "users_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_log" ADD CONSTRAINT "FK_2409f7ea0bd5874c358ab3e3087" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4ce68a5a8f867dfff4114951c15"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8e29a9d2f1fa57ebf1a4ce17353"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6b31546fc92b0d7344f032d0447"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85"`);
        await queryRunner.query(`ALTER TABLE "users_office" DROP CONSTRAINT "FK_232bb31e9895aadc4a044b9a559"`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_log" DROP CONSTRAINT "FK_2409f7ea0bd5874c358ab3e3087"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4ce68a5a8f867dfff4114951c15"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8e29a9d2f1fa57ebf1a4ce17353"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6b31546fc92b0d7344f032d0447"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85"`);
        await queryRunner.query(`ALTER TABLE "users_office" DROP CONSTRAINT "FK_232bb31e9895aadc4a044b9a559"`);

        await queryRunner.query(`DROP TABLE "users_log"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "users_title"`);
        await queryRunner.query(`DROP TABLE "users_position"`);
        await queryRunner.query(`DROP TABLE "users_role"`);
        await queryRunner.query(`DROP TABLE "users_office"`);
        await queryRunner.query(`DROP TABLE "users_department"`);
    }

}
