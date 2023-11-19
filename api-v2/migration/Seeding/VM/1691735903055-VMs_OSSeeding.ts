/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsOSSeeding1691735903055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMs_OSToSeed = [
            {
                name:'Windows',
                icon: 'https://img.freepik.com/free-icon/windows-logo_318-1544.jpg'
            },
            {
                name: 'Ubuntu',
                icon: 'https://cdn-icons-png.flaticon.com/512/5969/5969282.png'
            }
        ];
            // Insert roles
            for (const vms_os of VMs_OSToSeed) {
                await queryRunner.query(
                `INSERT INTO "vms_os"("name", "icon") VALUES ('${vms_os.name}', '${vms_os.icon}')`
                );
            }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
