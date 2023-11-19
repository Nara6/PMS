/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsENVSeeding1691736195424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMs_ENVToSeed= [
            {
                name: 'Dev'
            },
            {
                name: 'UAT'
            },
            {
                name: 'Pilot'
            },
            {
                name: 'Prod'
            }
        ];
        for( const vms_env of VMs_ENVToSeed){
            await queryRunner.query(
                `INSERT INTO "vms_env"("name") VALUES ('${vms_env.name}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
