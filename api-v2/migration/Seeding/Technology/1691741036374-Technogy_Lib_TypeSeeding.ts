/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class TechnogyLibTypeSeeding1691741036374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Tech_Lib_TypeToSeed = [
            {
                name: 'Core',
                language: 'PHP',
                icon: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/php_plain_logo_icon_146397.png'
            },
            {
                name: 'Third Party',
                language: 'PHP',
                icon: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/php_plain_logo_icon_146397.png'
            }
        ];
        for (const tech_lib_type of Tech_Lib_TypeToSeed){
            await queryRunner.query(
                `INSERT INTO "tech_libs_type"(
                    "name",
                    "language",
                    "icon"
                ) VALUES (
                    '${tech_lib_type.name}',
                    '${tech_lib_type.language}',
                    '${tech_lib_type.icon}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
