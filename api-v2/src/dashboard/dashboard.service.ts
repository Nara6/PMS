/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { Projects } from 'src/entity/project/projects.entity';
import { ProjectsStatus } from 'src/entity/project/projects_status.entity';
import { Users } from 'src/entity/user/users.entity';
import { VMs } from 'src/entity/vm/vms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>,
        @InjectRepository(VMs)
        private vmRepository: Repository<VMs>,
    ) { }

    async listing(): Promise<any> {
        try {
            const countUsers = await this.userRepository.count();
            const statusCounts = await this.projectRepository
            .createQueryBuilder('projects')
            .leftJoin(ProjectsStatus,'status','status.id=projects.status_id')
            .select('status.name, count(status.name) AS count')
            .groupBy('status.name')
            .getRawMany();

            const countProjects = await this.projectRepository.count();
            const countVMs = await this.vmRepository.count();
            return {
                totalUsers: countUsers,
                totalProjects: countProjects,
                totalVMs: countVMs,
                projectStatus: {
                    statusCounts
                }
            }
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }
}
