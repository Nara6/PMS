import { MigrationInterface, QueryRunner } from "typeorm";

export class Vm1691637492322 implements MigrationInterface {
    name = 'Vm1691637492322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vms_env" ("id" SERIAL NOT NULL, "name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_56fe9a9dd0938a1d2b770737df4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vms_os" ("id" SERIAL NOT NULL, "name" character varying(100), "icon" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_047a7770976be465a691eda2da4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vms_status" ("id" SERIAL NOT NULL, "name" character varying(100), "color" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_21fdbaf9cd01e1bea840c4f723f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vms_tag" ("id" SERIAL NOT NULL, "name" character varying(100), "color" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_207897c86c51394fa9182985ab7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vms" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "private_ip" character varying(100) NOT NULL, "public_ip" character varying(100), "ram" integer NOT NULL, "hdd" integer NOT NULL, "core" character varying(100) NOT NULL, "os_version" character varying(100) NOT NULL, "note" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "env_id" integer, "os_id" integer, "tag_id" integer, "status_id" integer, CONSTRAINT "PK_cc4544535b57023c558e999ceb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vms_access_type" ("id" SERIAL NOT NULL, "name" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7414e78b3d8abf439418371e4a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vms_access" ("id" SERIAL NOT NULL, "from_vpn_acc_id" character varying(100) NOT NULL, "is_two_way" boolean NOT NULL DEFAULT '0', "vpn_user_id" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type_id" integer, "from_vm_id" integer, "to_vm_id" integer, CONSTRAINT "PK_c077bef9421712e70bac8f09749" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vms" ADD CONSTRAINT "FK_56fe9a9dd0938a1d2b770737df4" FOREIGN KEY ("env_id") REFERENCES "vms_env"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vms" ADD CONSTRAINT "FK_047a7770976be465a691eda2da4" FOREIGN KEY ("os_id") REFERENCES "vms_os"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vms" ADD CONSTRAINT "FK_207897c86c51394fa9182985ab7" FOREIGN KEY ("tag_id") REFERENCES "vms_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vms" ADD CONSTRAINT "FK_21fdbaf9cd01e1bea840c4f723f" FOREIGN KEY ("status_id") REFERENCES "vms_status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vms_access" ADD CONSTRAINT "FK_7414e78b3d8abf439418371e4a7" FOREIGN KEY ("type_id") REFERENCES "vms_access_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vms_access" ADD CONSTRAINT "FK_bb9c181acdf2fea53a1ff827d4f" FOREIGN KEY ("from_vm_id") REFERENCES "vms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vms_access" ADD CONSTRAINT "FK_a770f4620738b9d50bb2e26423a" FOREIGN KEY ("to_vm_id") REFERENCES "vms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vms_access" DROP CONSTRAINT "FK_a770f4620738b9d50bb2e26423a"`);
        await queryRunner.query(`ALTER TABLE "vms_access" DROP CONSTRAINT "FK_bb9c181acdf2fea53a1ff827d4f"`);
        await queryRunner.query(`ALTER TABLE "vms_access" DROP CONSTRAINT "FK_7414e78b3d8abf439418371e4a7"`);
        await queryRunner.query(`ALTER TABLE "vms" DROP CONSTRAINT "FK_21fdbaf9cd01e1bea840c4f723f"`);
        await queryRunner.query(`ALTER TABLE "vms" DROP CONSTRAINT "FK_207897c86c51394fa9182985ab7"`);
        await queryRunner.query(`ALTER TABLE "vms" DROP CONSTRAINT "FK_047a7770976be465a691eda2da4"`);
        await queryRunner.query(`ALTER TABLE "vms" DROP CONSTRAINT "FK_56fe9a9dd0938a1d2b770737df4"`);
        await queryRunner.query(`DROP TABLE "vms_access"`);
        await queryRunner.query(`DROP TABLE "vms_access_type"`);
        await queryRunner.query(`DROP TABLE "vms"`);
        await queryRunner.query(`DROP TABLE "vms_tag"`);
        await queryRunner.query(`DROP TABLE "vms_status"`);
        await queryRunner.query(`DROP TABLE "vms_os"`);
        await queryRunner.query(`DROP TABLE "vms_env"`);
    }

}
