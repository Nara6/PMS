/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class ProjectsTimeLineSeeding1691746064456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        function formatDateToCustomFormat(date) {
            const months = [
              "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
              "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];
          
            const day = String(date.getDate()).padStart(2, '0');
            const month = months[date.getMonth()];
            const year = String(date.getFullYear()).slice(2);
          
            return `${day}-${month}-${year}`;
          }
          
          const currentDate = new Date();
          const formattedDate = formatDateToCustomFormat(currentDate);
        const Projects_TimeLineToSeed = [
            {
                project_id: 1,
                status_id: 2,
                task: 'Migration',
                from: formattedDate,
                to: formattedDate
            }
        ];
        for(const project_timeline of Projects_TimeLineToSeed){
            await queryRunner.query(
                `INSERT INTO "projects_timeline"(
                    "project_id",
                    "status_id",
                    "task",
                    "from",
                    "to"
                ) VALUES (
                    ${project_timeline.project_id},
                    ${project_timeline.status_id},
                    '${project_timeline.task}',
                    '${project_timeline.from}',
                    '${project_timeline.to}'
                )`
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
