/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Project1691642297373 implements MigrationInterface {
    name = 'Project1691642297373'

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`CREATE TABLE "projects_status" ("id" SERIAL NOT NULL, "name" character varying(100), "color" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a8c4b6b8e9e5cd88ff341faab31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_type" ("id" SERIAL NOT NULL, "name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e90c0f9319119739c6692d75025" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "kh_name" character varying(100), "en_name" character varying(100), "abbre" character varying(10), "icon" character varying,"start_date" character varying,"due_date" character varying , "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type_id" integer, "status_id" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_app_type" ("id" SERIAL NOT NULL, "name" character varying(100), "color" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_979c5cb598bfebe97576bfba20b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_app" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "abbre" character varying(10), "tech_version" character varying(100) NOT NULL, "description" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type_id" integer, "project_id" integer, "tech_id" integer, CONSTRAINT "PK_29713861b10a1e5d5cf99ffbc75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_app_env" ("id" SERIAL NOT NULL, "url" character varying(100) NOT NULL, "port" character varying(10), "note" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "app_id" integer, "env_id" integer, "vm_id" integer, CONSTRAINT "PK_516a47cc4c3314f28ac715cada2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_timeline_status" ("id" SERIAL NOT NULL, "name" character varying(100), "color" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ddb3d4433c619a6bbf9a7c44079" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_timeline" ("id" SERIAL NOT NULL, "task" character varying NOT NULL, "from" date, "to" date, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "project_id" integer, "status_id" integer, CONSTRAINT "PK_03ce61e6ebcfe901e8bc96feda3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_user_role" ("id" SERIAL NOT NULL, "name" character varying(100), "abbre" character varying(10), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_53f24118a204eed64bddd1a8649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "project_id" integer, "user_id" integer, "role_id" integer, CONSTRAINT "PK_bd55b203eb9f92b0c8390380010" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_e90c0f9319119739c6692d75025" FOREIGN KEY ("type_id") REFERENCES "projects_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8c4b6b8e9e5cd88ff341faab31" FOREIGN KEY ("status_id") REFERENCES "projects_status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_app" ADD CONSTRAINT "FK_979c5cb598bfebe97576bfba20b" FOREIGN KEY ("type_id") REFERENCES "projects_app_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_app" ADD CONSTRAINT "FK_dad7513fc37a0eb684844af641d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_app" ADD CONSTRAINT "FK_784b1cf6ad1b663ad05afea679b" FOREIGN KEY ("tech_id") REFERENCES "tech"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_app_env" ADD CONSTRAINT "FK_974b49bb4590dcb0b13b176c1d6" FOREIGN KEY ("app_id") REFERENCES "projects_app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_app_env" ADD CONSTRAINT "FK_f5f922f1629d485a95e838f4828" FOREIGN KEY ("env_id") REFERENCES "vms_env"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_app_env" ADD CONSTRAINT "FK_bd71cdf8d43cb90a1863b597124" FOREIGN KEY ("vm_id") REFERENCES "vms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_timeline" ADD CONSTRAINT "FK_23baea33226f73784fedeea76cd" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_timeline" ADD CONSTRAINT "FK_ddb3d4433c619a6bbf9a7c44079" FOREIGN KEY ("status_id") REFERENCES "projects_timeline_status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
       
        await queryRunner.query(`ALTER TABLE "projects_user" ADD CONSTRAINT "FK_950a4179928f49af2c9613da70b" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_user" ADD CONSTRAINT "FK_bcefd1bf0690fabb58318dda7dc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_user" ADD CONSTRAINT "FK_53f24118a204eed64bddd1a8649" FOREIGN KEY ("role_id") REFERENCES "projects_user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        
        await queryRunner.query(`ALTER TABLE "projects_user" DROP CONSTRAINT "FK_53f24118a204eed64bddd1a8649"`);
        await queryRunner.query(`ALTER TABLE "projects_user" DROP CONSTRAINT "FK_bcefd1bf0690fabb58318dda7dc"`);
        await queryRunner.query(`ALTER TABLE "projects_user" DROP CONSTRAINT "FK_950a4179928f49af2c9613da70b"`);
       
        await queryRunner.query(`ALTER TABLE "projects_timeline" DROP CONSTRAINT "FK_ddb3d4433c619a6bbf9a7c44079"`);
        await queryRunner.query(`ALTER TABLE "projects_timeline" DROP CONSTRAINT "FK_23baea33226f73784fedeea76cd"`);
        await queryRunner.query(`ALTER TABLE "projects_app_env" DROP CONSTRAINT "FK_bd71cdf8d43cb90a1863b597124"`);
        await queryRunner.query(`ALTER TABLE "projects_app_env" DROP CONSTRAINT "FK_f5f922f1629d485a95e838f4828"`);
        await queryRunner.query(`ALTER TABLE "projects_app_env" DROP CONSTRAINT "FK_974b49bb4590dcb0b13b176c1d6"`);
        await queryRunner.query(`ALTER TABLE "projects_app" DROP CONSTRAINT "FK_784b1cf6ad1b663ad05afea679b"`);
        await queryRunner.query(`ALTER TABLE "projects_app" DROP CONSTRAINT "FK_dad7513fc37a0eb684844af641d"`);
        await queryRunner.query(`ALTER TABLE "projects_app" DROP CONSTRAINT "FK_979c5cb598bfebe97576bfba20b"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8c4b6b8e9e5cd88ff341faab31"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_e90c0f9319119739c6692d75025"`);
        await queryRunner.query(`DROP TABLE "projects_user"`);
       
        await queryRunner.query(`DROP TABLE "projects_user_role"`);
        await queryRunner.query(`DROP TABLE "projects_timeline"`);
        await queryRunner.query(`DROP TABLE "projects_timeline_status"`);
        await queryRunner.query(`DROP TABLE "projects_app_env"`);
        await queryRunner.query(`DROP TABLE "projects_app"`);
        await queryRunner.query(`DROP TABLE "projects_app_type"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "projects_type"`);
        await queryRunner.query(`DROP TABLE "projects_status"`);
 
    }

}
