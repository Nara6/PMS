/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdatePasswordByAdminDTO, UpdatePasswordByOwnDTO, UpdateUserDTO } from './users.dto';
import * as bcrypt from 'bcrypt';
import { UsersDepartment } from 'src/entity/user/users_department.entity';
import { UsersOffice } from 'src/entity/user/users_office.entity';
import { UsersPosition } from 'src/entity/user/users_position.entity';
import { UsersTitle } from 'src/entity/user/users_title.entity';
import { UsersRole } from 'src/entity/user/users_role.entity';
import { FileService } from 'src/file.service';
import { ProjectsUser } from 'src/entity/project/projects_user.entity';
// import { find } from 'rxjs';
import { PageDto, PageMetaDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';
import { splitBase64DataUri } from 'src/utils/base64/Converter';
import { fileHandler } from 'src/utils/base64/Handler';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(UsersDepartment)
        private readonly usersDepartment: Repository<UsersDepartment>,
        @InjectRepository(UsersOffice)
        private readonly usersOfficeRepository: Repository<UsersOffice>,
        @InjectRepository(UsersPosition)
        private readonly usersPositionRepository: Repository<UsersPosition>,
        @InjectRepository(UsersTitle)
        private readonly usersTitleRepository: Repository<UsersTitle>,
        @InjectRepository(UsersRole)
        private readonly usersRoleRepository: Repository<UsersRole>,
        @InjectRepository(ProjectsUser)
        private readonly usersProjectRepository: Repository<ProjectsUser>,
        
    ) { }
    
    async findAllUsers(pageOptionDTO: PageOptionDTO): Promise<PageDto<Users>> {
        const entities = await this.usersRepository.find(
            {
                order: {
                    created_at: pageOptionDTO.order
                },
                relations:{
                    department : true,
                    office: true,
                    title: true,
                    position:true ,
                    role:true
                },
                select: {
                    department: {
                        id: true,
                        en_name: true,
                        kh_name: true
                    },
                    office: {
                        id: true,
                        en_name: true,
                        kh_name: true
                    },
                    title: {
                        id: true,
                        en_name: true,
                        kh_name: true
                    },
                    position: {
                        id: true,
                        en_name: true,
                        kh_name: true
                    },
                    role: {
                        id: true,
                        en_name: true,
                        kh_name: true
                    },
                },

                skip: pageOptionDTO.skip,
                take: pageOptionDTO.limit,

            }
        )
        if(!entities){
            throw new NotFoundException('Data Not Found!');
        }
        entities.forEach(users => {
            delete users.password;
        });
        // console.log(entities);
        
        const itemCount = await this.usersRepository.count();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionDTO });
        return new PageDto(entities, pageMetaDto);
    }
    
    async listById(id:number): Promise<any>{
        const isExist = await this.usersRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('User Account Not Found!');
        }
        try{
            const data:any = await this.usersRepository.find({
                where: {
                    id: id
                },
                relations: {
                    projects: {
                        ProjectsUser: {
                            ProjectsType: true,
                            ProjectsStatus: true,
                            ProjectsTask: {
                                ProjectsTaskStatus: true
                            },
                            ProjectsTimeLine: true,
                        },
                        ProjectsUserRole: true
                        
                    }
                },
                select: {
                    projects:{
                        id: true,
                        ProjectsUser: {
                            id: true,
                            en_name: true,
                            kh_name: true,
                            abbre: true,
                            icon: true,
                            start_date: true,
                            due_date: true,
                            ProjectsType: {
                                id: true,
                                name: true,
                            },
                            ProjectsStatus: {
                                id: true,
                                name: true,
                                color: true
                            },
                            ProjectsTask:{
                                id: true,
                                name: true,
                                description: true,
                                due_date: true,
                                created_at: true,
                                ProjectsTaskStatus:{
                                    id: true,
                                    name: true,
                                    color: true
                                }
                            },
                        },
                        ProjectsUserRole: {
                            id: true,
                            name: true,
                            abbre: true
                        }
                    }
                }
                
            })
            // console.log(data);
            
            return {
                projects: data[0].projects
            }
            
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // create new user
    async createUser(createUserDTO: CreateUserDTO, file? : Express.Multer.File): Promise<any> {
        // Check if email already existing?
        const isEmailExist = await this.usersRepository.findOneBy({ email: createUserDTO.email });
        if (isEmailExist) {
            throw new HttpException('This email is already exist', 400);
        }
        // Check if username already existing?
        const isUsernameExist = await this.usersRepository.findOneBy({ username: createUserDTO.username });
        if (isUsernameExist) {
            throw new HttpException('This username is already exist', 400);
        }

        // Check if Department user existing?
        const isDepartmentIdExist = await this.usersDepartment.findOne(
            { 
                where: {
                    id: createUserDTO.department_id
                },
                select:{
                    id: true
                }
            }
        );
        if (!isDepartmentIdExist) {
            throw new BadRequestException('User Department Id Not Found!');
        }
        // Check if Office user existing?
        const isOfficeIdExist = await this.usersOfficeRepository.findOne(
            { 
                where:{
                    id: createUserDTO.office_id
                },
                select:{
                    id :true
                }
            }
        );
        if (!isOfficeIdExist) {
            throw new BadRequestException('User Office Id Not Found!');
        }
        // Check if Position user existing?
        const isPositionIdExist = await this.usersPositionRepository.findOne(
            { 
                where:{
                    id: createUserDTO.position_id 
                },
                select:{
                    id: true
                }
            }
            
        );
        if (!isPositionIdExist) {
            throw new BadRequestException('User Position Id Not Found!');
        }
        // Check if Title user existing?
        const isTitleIdExist = await this.usersTitleRepository.findOne(
            { 
                where:{
                    id: createUserDTO.title_id
                }, 
                select:{
                    id: true
                }
            }
        );
        if (!isTitleIdExist) {
            throw new BadRequestException('User Title Id Not Found!');
        }
        // Check if Title user existing?
        const isRoleIdExist = await this.usersRoleRepository.findOne(
            { 
                where:{
                    id: createUserDTO.role_id
                },
                select:{
                    id: true,
                }
            }
        );
        if (!isRoleIdExist) {
            throw new BadRequestException('User Role Id Not Found!');
        }
        // console.log(createUserDTO.avatar);
        
        let fileUpload = null;

        if(createUserDTO.avatar){
            fileUpload = await fileHandler(createUserDTO.avatar);
        }
        // hash Password with bcrypt
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const hashPassword = await bcrypt.hash(createUserDTO.password, salt);
        
        const user = await this.usersRepository.save(
            {
                department: isDepartmentIdExist,
                office: isOfficeIdExist,
                position: isPositionIdExist,
                title: isTitleIdExist,
                role: isRoleIdExist,
                username: createUserDTO.username,
                kh_name: createUserDTO.kh_name,
                en_name: createUserDTO.en_name,
                phone: createUserDTO.phone,
                email: createUserDTO.email,
                vpn_account: createUserDTO.vpn_account,
                tg_username: createUserDTO.tg_username,
                password: hashPassword,
                about: createUserDTO.about,
                avatar: fileUpload? fileUpload.data.uri : null
            }
        );
        delete user.password;
        return {
            success: true,
            message: 'User Account Created Successfully!',
            data: user
        }


    }

    // update user by id
    async updateUser(id:number, body: UpdateUserDTO, file? : Express.Multer.File): Promise<any>{
        const user = await this.usersRepository.findOneBy({id: id});
        if(!user){
            throw new NotFoundException('Invalid User account!');
        }

        // Check if Department user existing?
        const isDepartmentIdExist = await this.usersDepartment.findOne(
            { 
                where: {
                    id: body.department_id
                },
                select:{
                    id: true
                }
            }
        );
        if (!isDepartmentIdExist) {
            throw new BadRequestException('User Department Id Not Found!');
        }
        // Check if Office user existing?
        const isOfficeIdExist = await this.usersOfficeRepository.findOne(
            { 
                where:{
                    id: body.office_id
                },
                select:{
                    id :true
                }
            }
        );
        if (!isOfficeIdExist) {
            throw new BadRequestException('User Office Id Not Found!');
        }
        // Check if Position user existing?
        const isPositionIdExist = await this.usersPositionRepository.findOne(
            { 
                where:{
                    id: body.position_id 
                },
                select:{
                    id: true
                }
            }
            
        );
        if (!isPositionIdExist) {
            throw new BadRequestException('User Position Id Not Found!');
        }
        // Check if Title user existing?
        const isTitleIdExist = await this.usersTitleRepository.findOne(
            { 
                where:{
                    id: body.title_id
                }, 
                select:{
                    id: true
                }
            }
        );
        if (!isTitleIdExist) {
            throw new BadRequestException('User Title Id Not Found!');
        }
        // Check if Title user existing?
        const isRoleIdExist = await this.usersRoleRepository.findOne(
            { 
                where:{
                    id: body.role_id
                },
                select:{
                    id: true,
                }
            }
        );
        if (!isRoleIdExist) {
            throw new BadRequestException('User Role Id Not Found!');
        }
        // console.log(body.avatar);
        let fileUpload = null;

        if(body.avatar !==user.avatar){
            fileUpload = await fileHandler(body.avatar);
        }
        try{
            await this.usersRepository.update(
                {
                    id: id
                },
                {
                    department: isDepartmentIdExist,
                    office: isOfficeIdExist,
                    position: isPositionIdExist,
                    title: isTitleIdExist,
                    role: isRoleIdExist,
                    username: body.username,
                    kh_name: body.kh_name,
                    en_name: body.en_name,
                    phone: body.phone,
                    email: body.email,
                    vpn_account: body.vpn_account,
                    tg_username: body.tg_username,
                    about: body.about,
                    avatar: fileUpload? fileUpload.data.uri : user.avatar
                }
            );
            const updatedUser = await this.usersRepository.findOne(
                {
                    where: {
                        id: id
                    },
                    relations:{
                        department : true,
                        office: true,
                        title: true,
                        position:true ,
                        role:true
                    },
                    select: {
                        department: {
                            id: true,
                            en_name: true,
                            kh_name: true
                        },
                        office: {
                            id: true,
                            en_name: true,
                            kh_name: true
                        },
                        title: {
                            id: true,
                            en_name: true,
                            kh_name: true
                        },
                        position: {
                            id: true,
                            en_name: true,
                            kh_name: true
                        },
                        role: {
                            id: true,
                            en_name: true,
                            kh_name: true
                        },
                    },
                }
            );
            delete updatedUser.password;
            return {
                success: true,
                message: 'User Account Updated Successfully!',
                data: 
                    {
                        id: updatedUser.id,
                        vpn_account: updatedUser.vpn_account,
                        kh_name: updatedUser.kh_name,
                        en_name: updatedUser.en_name,
                        email: updatedUser.email,
                        phone: updatedUser.phone,
                        avatar: updatedUser.avatar,
                        role: updatedUser.role.en_name,
                        role_id: updatedUser.role.id,
                        username: updatedUser.username,
                        tg_username: updatedUser.tg_username,
                        about: updatedUser.about,
                        title: {
                            id: updatedUser.title.id,
                            name: updatedUser.title.en_name,
                        }
                        ,
                        department: {
                            id: updatedUser.department.id,
                            name: updatedUser.department.en_name
                        },
                        position:{ 
                            id: updatedUser.position.id,
                            name: updatedUser.position.en_name
                        },
                        office:{ 
                            id: updatedUser.office.id,
                            name: updatedUser.office.en_name
                        }
        
                    },
                
            }
        }catch(err){
            throw new BadRequestException(err);
        }

    }

    // update password by admin
    async updatePasswordByAdmin(id: number, body: UpdatePasswordByAdminDTO): Promise<any>{
        const user = await this.usersRepository.findOneBy({id: id});
        if(!user){
            throw new NotFoundException('Invalid User!');
        }
        if(body.newPassword !== body.newConfirmPassword){
            throw new BadRequestException('Passwords do not match! ')
        }
        // hash Password with bcrypt
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const hashPassword = await bcrypt.hash(body.newPassword, salt);

        const userUpdate = await this.usersRepository.createQueryBuilder('users');

        userUpdate
        .update("users")
        .set(
            {
                password: hashPassword
            }
        )
        .where("id=:id", {id: id})
        .execute();
        
        return {
            success: true,
            message: 'Password updated!',
            data: {
                newPassword: hashPassword
            }
        }

    }
    // update password by own self
    async updatePasswordByOwn(id: number, body: UpdatePasswordByOwnDTO): Promise<any>{
        const user = await this.usersRepository.findOneBy({id: id});
        if(!user){
            throw new NotFoundException('Invalid User!');
        }
        if(body.newPassword !== body.newConfirmPassword){
            throw new BadRequestException('Passwords do not match!')
        }
        const isPwdMatch = await bcrypt.compare(body.oldPassword,user.password);
        if(!isPwdMatch){
            throw new BadRequestException('Passwords do not match!')
        }
        // hash Password with bcrypt
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const hashPassword = await bcrypt.hash(body.newPassword, salt);
        const userUpdate = await this.usersRepository.createQueryBuilder('users');
        userUpdate
        .update("users")
        .set(
            {
                password: hashPassword
            }
        )
        .where("id=:id", {id: id})
        .execute();
        
        return {
            success: true,
            message: 'Password updated Successfully!',
            data: {
                newPassword: hashPassword
            }
        }

    }

    // delete user by id
    async deleteUserById(id: number): Promise<any>{
        const user = await this.usersRepository.findOneBy({id: id});
        if(!user){
            throw new NotFoundException('User Not Found!');
        }
        await this.usersRepository.delete({id: id});
        return {
            success: true,
            message: 'User Account deleted successfully!'
        }
    }

    // list data setup to create user
    async listDataSetup(): Promise<any>{
        const department = await this.usersDepartment.find(
            {
                select: {
                    id: true,
                    en_name: true,
                    kh_name: true,
                }
            }
        );
        if(!department){
            throw new NotFoundException('Data Not Found!');
        }
        const role = await this.usersRoleRepository.find(
            {
                select: {
                    id: true,
                    en_name: true,
                    kh_name: true,
                }
            }
        );
        if(!role){
            throw new NotFoundException('Data Not Found!');
        }
        const title = await this.usersTitleRepository.find(
            {
                select: {
                    id: true,
                    en_name: true,
                    kh_name: true,
                }
            }
        );
        if(!title){
            throw new NotFoundException('Data Not Found!');
        }
        const office = await this.usersOfficeRepository.find(
            {
                select: {
                    id: true,
                    en_name: true,
                    kh_name: true,
                }
            }
        );
        if(!office){
            throw new NotFoundException('Data Not Found!');
        }
        const position = await this.usersPositionRepository.find(
            {
                select: {
                    id: true,
                    en_name: true,
                    kh_name: true,
                }
            }
        );
        if(!position){
            throw new NotFoundException('Data Not Found!');
        }
        return {
            success: true,
            setup: {
                departments: department,
                roles: role,
                titles: title,
                offices: office,
                positions: position
            }
        }
        
    }

    // toggle changing the user enable or disable active
    async toggleActive(id: number): Promise<any>{
        const isExist = await this.usersRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid User Account!');
        }
        isExist.is_active = !isExist.is_active;
        await this.usersRepository.save(isExist);
        const statusMessage = isExist.is_active
        ? `${isExist.en_name} account has been successfully activated.`
        : `${isExist.en_name} account has been deactivated.`;
        // console.log(isExist.is_active);
        return {
            success: true,
            message: statusMessage
        }
        
    }

    // Get every user with project
    async getUserProject():Promise<any>{
        try{
            const userProject = await this.usersRepository.find(
                {
                    relations: {
                        projects:{
                            ProjectsUser: {
                                ProjectsType: true,
                                ProjectsStatus: true,
                            },
                            ProjectsUserRole: true
                        },
                    },
                    select: {
                        id: true,
                        username: true,
                        tg_username: true,
                        phone: true,
                        email: true,
                        avatar: true,
                        projects: {
                            id: true,
                            created_at: true,
                            ProjectsUser:{
                                kh_name: true,
                                en_name: true,
                                abbre: true,
                                icon: true,
                                created_at: true,
                                ProjectsStatus: {
                                    name: true,
                                    color: true
                                },
                                ProjectsType: {
                                    name: true,
                                }
                            },
                            ProjectsUserRole: {
                                name: true,
                                abbre: true
                            }
                            
                        }
                    }
                }
            );
            return userProject;
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Get user with project by id
    async getUserProjectById(id: number):Promise<any>{
        // to check if the specific have a project or not
        const isUserExistProject = await this.usersProjectRepository
        .createQueryBuilder()
        .where('user_id = :id', {id})
        .getOne();
        // console.log(isUserExistProject);
        if(!isUserExistProject){
            throw new NotFoundException('This user does not have a project yet!');
        }
        try{
            const userProject = await this.usersRepository.find(
                {
                    where: {
                        id: id
                    },
                    relations: {
                        projects:{
                            ProjectsUser: {
                                ProjectsType: true,
                                ProjectsStatus: true,
                            },
                            ProjectsUserRole: true
                        },
                    },
                    select: {
                        id: true,
                        projects: {
                            id: true,
                            created_at: true,
                            ProjectsUser:{
                                kh_name: true,
                                en_name: true,
                                abbre: true,
                                icon: true,
                                created_at: true,
                                ProjectsStatus: {
                                    name: true,
                                    color: true
                                },
                                ProjectsType: {
                                    name: true,
                                }
                            },
                            ProjectsUserRole: {
                                name: true,
                                abbre: true
                            }
                            
                        }
                    }
                }
            );
            return userProject;
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
