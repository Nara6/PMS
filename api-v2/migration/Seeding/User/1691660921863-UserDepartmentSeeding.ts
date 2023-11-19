/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class UserDepartmentSeeding1691660921863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersDepartmentToSeed= [
            {en_name: 'Department of Administration and Public Relation', kh_name: 'នាយកដ្ឋានរដ្ឋបាល និងទំនាក់ទំនងសាធារណៈ'},
            {en_name: 'Department of Technology', kh_name: 'នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យា'},
            {en_name: 'Department of Infrastructure and Cyber Security', kh_name: 'នាយកដ្ឋានហេដ្ឋារចនាសម្ព័ន្ធ និងសន្តិសុខអ៊ីនធឺណិត'},
        ];
        // Insert departments
        for (const department of usersDepartmentToSeed) {
            await queryRunner.query(
            `INSERT INTO "users_department"("en_name", "kh_name") VALUES ('${department.en_name}', '${department.kh_name}')`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
