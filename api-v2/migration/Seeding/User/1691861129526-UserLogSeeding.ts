/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class UserLogSeeding1691861129526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersLogToSeed= [
            {
                user_id :  1 ,
                ip: '127.0.0.1',
                os: 'OSX',
                agent: 'IDK',
            },
        ];
        // Insert user logs
        for (const userLog of usersLogToSeed) {
            await queryRunner.query(
            `INSERT INTO "users_log"("user_id", "ip", "os", "agent") VALUES (${userLog.user_id}, '${userLog.ip}', '${userLog.os}', '${userLog.agent}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
