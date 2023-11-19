/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsTagSeeding1691737045599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMs_TagToSeed = [
            {
                name: 'DB',
                color: '#1ABC9C',
            },
            {
                name: 'App',
                color: '#8E44AD',
            },
            {
                name: 'CICD',
                color: '#7F8C8D',
            }
        ];
        for (const vms_tag of VMs_TagToSeed){
            await queryRunner.query(
                `INSERT INTO "vms_tag"("name", "color") VALUES ('${vms_tag.name}', '${vms_tag.color}')`
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
