/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsAccessSeeding1691737960420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMs_AccessToSeed = [
            {
                type_id: 1,
                from_vpn_acc_id: '1',
                from_vm_id: 1,
                to_vm_id: 2,
                vpn_user_id: '1'
            }
        ];
        for(const vms_access of VMs_AccessToSeed){
            await queryRunner.query(
                `INSERT INTO "vms_access"(
                    "type_id",
                    "from_vpn_acc_id",
                    "from_vm_id",
                    "to_vm_id",
                    "vpn_user_id"
                ) VALUES(
                    ${vms_access.type_id},
                    '${vms_access.from_vpn_acc_id}',
                    ${vms_access.from_vm_id},
                    ${vms_access.to_vm_id},
                    '${vms_access.vpn_user_id}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
