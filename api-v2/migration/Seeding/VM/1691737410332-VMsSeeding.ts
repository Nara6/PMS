/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class VMsSeeding1691737410332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const VMsToSeed = [
            {
                env_id: 1,
                os_id: 1,
                tag_id: 1,
                status_id: 1,
                name: 'DEV_UAT',
                private_ip: '127.0.0.1',
                public_ip: '127.0.0.1',
                ram: 32,
                hdd: 1000,
                core: '12 Core',
                os_version: '20.04',
                note: 'Nothing'
            },
            {
                env_id: 1,
                os_id: 1,
                tag_id: 1,
                status_id: 1,
                name: 'PROD',
                private_ip: '127.0.0.1',
                public_ip: '127.0.0.1',
                ram: 32,
                hdd: 1000,
                core: '12 Core',
                os_version: '20.04',
                note: 'Nothing'
            }
        ];
        for( const vms of VMsToSeed){
            await queryRunner.query(
                `INSERT INTO "vms"(
                    "env_id",
                    "os_id",
                    "tag_id",
                    "status_id",
                    "name",
                    "private_ip",
                    "public_ip",
                    "ram",
                    "hdd",
                    "core",
                    "os_version",
                    "note"
                ) VALUES (
                    ${vms.env_id},
                    ${vms.os_id},
                    ${vms.tag_id},
                    ${vms.status_id},
                    '${vms.name}',
                    '${vms.private_ip}',
                    '${vms.public_ip}',
                    ${vms.ram},
                    ${vms.hdd},
                    '${vms.core}',
                    '${vms.os_version}',
                    '${vms.note}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
