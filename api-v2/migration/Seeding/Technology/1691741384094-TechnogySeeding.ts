/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class TechnogySeeding1691741384094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const TechToSeed = [
            {
                name: 'Laravel',
                language: 'PHP',
                icon: 'https://static-00.iconduck.com/assets.00/laravel-icon-497x512-uwybstke.png',
                description: 'This is Laravel Framework for Backend development'
            },
            {
                name: 'Angular',
                language: 'Typescript',
                icon: 'https://angular.io/assets/images/logos/angular/angular.png',
                description: 'This is Angular Framework for Frontend development'
            }
        ];
        for(const tech of TechToSeed){
            await queryRunner.query(
                `INSERT INTO "tech"(
                    "name",
                    "language",
                    "icon",
                    "description"
                ) VALUES (
                    '${tech.name}',
                    '${tech.language}',
                    '${tech.icon}',
                    '${tech.description}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
