/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsStatusSeeding1691743378267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const Projects_StatusToSeed = [
            {
                name: 'Study',
                color: '#D7DBDD'
            },
            {
                name: 'Proposal',
                color: '#F7DC6F'
            },
            {
                name: 'Developing',
                color: '#F5B041'
            },
            {
                name: 'Pilot',
                color: '#808B96'
            },
            {
                name: 'Production',
                color: '#196F3D'
            }
        ];
        for (const project_status of Projects_StatusToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_status"(
                    "name",
                    "color"
                ) VALUES (
                    '${project_status.name}',
                    '${project_status.color}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
