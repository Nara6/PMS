/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class TechnologyLibrariesSeeding1691741707089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Tech_LibrariesToSeed = [
            {
                name: 'Laravel Telescope',
                tech_id: 1,
                type_id: 1,
                icon: 'https://static-00.iconduck.com/assets.00/laravel-icon-497x512-uwybstke.png',
            },
            {
                name: 'Migration Generator',
                tech_id: 1,
                type_id: 1,
                icon: 'https://static-00.iconduck.com/assets.00/laravel-icon-497x512-uwybstke.png',

            }
        ];
        for(const tech of Tech_LibrariesToSeed){
            await queryRunner.query(
                `INSERT INTO "tech_libraries"(
                    "name",
                    "tech_id",
                    "type_id",
                    "icon"
                ) VALUES (
                    '${tech.name}',
                    '${tech.tech_id}',
                    '${tech.type_id}',
                    '${tech.icon}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
