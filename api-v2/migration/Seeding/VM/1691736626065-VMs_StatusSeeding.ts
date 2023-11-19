/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsStatusSeeding1691736626065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMs_StatusToSeed = [
            {
                name: 'Running',
                color: '#248CD1'
            },
            {
                name: 'Pushed',
                color: '#D1C724'
            },
            {
                name: 'Removed',
                color: '#D13924'
            }
        ];
        for (const vms_status of VMs_StatusToSeed){
            await queryRunner.query(
                `INSERT INTO "vms_status"("name", "color") VALUES ('${vms_status.name}', '${vms_status.color}')`
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
