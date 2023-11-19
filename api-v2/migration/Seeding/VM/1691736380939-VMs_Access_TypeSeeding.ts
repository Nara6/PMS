/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsAccessTypeSeeding1691736380939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMs_Access_TypeToSeed = [
            {
                name: '1 Way'
            },
            {
                name: '2 Way'
            }
        ];
        for( const vms_access_type of VMs_Access_TypeToSeed){
            await queryRunner.query(
                `INSERT INTO "vms_access_type"("name") VALUES ('${vms_access_type.name}')`
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
