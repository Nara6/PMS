/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsSeeding1691744474148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ProjectsToSeed = [
            {
                type_id: 3,
                status_id: 3,
                kh_name: 'Project Management System',
                en_name: 'Project Management System',
                abbre: 'PMS',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                icon: null
            },
            {
                type_id: 3,
                status_id: 3,
                kh_name: 'Document Management System',
                en_name: 'Document Management System',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'DMS',
                icon: null
            },
            {
                type_id: 3,
                status_id: 3,
                kh_name: 'Icon Management System',
                en_name: 'Icon Management System',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'IMS',
                icon: null
            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធទូទាត់ប្រាក់រួម',
                en_name: 'One Stop Service Payment',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'OSP',
                icon: null

            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធចែករំលែកទិន្នន័យរួម',
                en_name: 'One Stop Service Data Exchange',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'OSD',
                icon: null

            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធស្វ័យប្រវត្តិកម្មគ្រប់គ្រងការចុះបញ្ជីយានជំនិះ និងប្រឡងយកបណ្ណបើកបរ',
                en_name: 'Vehicle Registration and Driving License',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'VR&DL',
                icon: null

            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធស្វ័យប្រវត្តិកម្មត្រួតពិនិត្យលក្ខណៈបច្ចេទេសយានជំនិះ',
                en_name: 'Tech Inspection',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'TI',
                icon: null

            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'កម្មវិធីថែទាំផ្លូវ',
                en_name: 'Road Care',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'Road Care',
                icon: null

            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធផ្លាស់ប្តូរទិន្នន័យអេឡិចត្រូនិកកំពង់ផែ',
                en_name: 'Port EDI',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'Port EDI',
                icon: null

            },
            {
                type_id: 3,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធគ្រប់គ្រងមន្ត្រីរាជការ',
                en_name: 'Human Resource',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'HR',
                icon: null

            },
            {
                type_id: 3,
                status_id: 3,
                kh_name: 'កម្មវិធីតាមដានការផ្តល់សេវាសាធារណៈ',
                en_name: 'MPWT Public Service Tracking',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'ST',
                icon: null

            },
            {
                type_id: 3,
                status_id: 3,
                kh_name: 'កម្មវិធីសេវាសាធារណៈឌីជីថល',
                en_name: 'Digital Service',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'DS',
                icon: null

            },
            {
                type_id: 1,
                status_id: 3,
                kh_name: 'ប្រព័ន្ធផ្ទៀងផ្ទាត់គល់បញ្ជី',
                en_name: 'MPWT QR Code',
                start_date: '2023-08-01',
                due_date: '2023-10-01',
                abbre: 'QR',
                icon: null

            },
        ];
        for (const project of ProjectsToSeed) {
            await queryRunner.query(
                `INSERT INTO "projects"(
                    "type_id",
                    "status_id",
                    "kh_name",
                    "en_name",
                    "start_date",
                    "due_date",
                    "abbre",
                    "icon"
                ) VALUES (
                    ${project.type_id},
                    ${project.status_id},
                    '${project.kh_name}',
                    '${project.en_name}',
                    '${project.start_date}',
                    '${project.due_date}',
                    '${project.abbre}',
                    ${project.icon}
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
