import { UserId } from 'src/auth/user-id.decorator';
import { Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TransformService } from "./transform.service";
import { UserDTO } from "src/dtos/users/user.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import * as bcrypt from "bcrypt"
import { UserRole } from 'src/models/enums/user-role';
import { CoursesService } from './courses.service';
import { Course } from 'src/models/course.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        // private readonly coursesService: CoursesService
    ) { }

    async getAllUsers(role?: UserRole): Promise<UserDTO[]> {
        // By setting a role query parameter, we can get all users of a certain type
        // (without having to create a separate method)
        // Students -> role = 1
        // Admins -> role = 2
        // Teachers -> role = 3
        const whereClauseQueryParam: Partial<User> = {
            isDeleted: false,
            role: role,
        };
        const whereClauseNoQueryParam: Partial<User> = {
            isDeleted: false
        };

        const users: User[] = await this.usersRepository.find({
            where: role ? whereClauseQueryParam : whereClauseNoQueryParam,
            order: {
                //name: "ASC",
                id: "ASC"
            },
            relations: ['courses']
            // relations: ['booksBorrowed', 'bookVotes', 'bookRatings', 'bookRatings.madeBy',
            //     'bookVotes.reviewVotedFor', 'bookRatings.bookName', 'bookRatings.bookName.name',
            //     'bookReviews', 'bookReviews.madeBy', 'bookReviews.votes', 'bookReviews.votes.madeBy',
            //     'booksBorrowedHistory', 'bookReviews.bookName']
        });

        return users.filter(user => user.isDeleted === false);
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne(id, {
            where: { isDeleted: false },
            relations: ['courses']
            // relations: ['booksBorrowed', 'bookVotes', 'bookRatings', 'bookRatings.madeBy',
            //     'bookVotes.reviewVotedFor', 'bookRatings.bookName',
            //     'bookReviews', 'bookReviews.madeBy', 'bookReviews.votes', 'bookReviews.votes.madeBy',
            //     'booksBorrowedHistory', 'bookReviews.bookName']

        });
        if (!user) {
            throw new BadRequestException(`User with id ${id} does not exist!`);
        }
        return user;
    }

    async assignRoleToUser(userId: number, role: UserRole): Promise<UserDTO> {
        const user: User = await this.usersRepository.findOne({ id: userId });
        user.role = role;
        const updatedUser: User = await this.usersRepository.save(user);
        return updatedUser;
    }
    async registerUser(userDto: RegisterUserDTO): Promise<UserDTO> {
        const existingUsername = await this.usersRepository.findOne({ where: { username: userDto.username } });
        if (existingUsername !== undefined) {
            throw new BadRequestException(`Username ${userDto.username} is already taken!`);
        }
        // add validation for password

        const user = this.usersRepository.create(userDto);

        user.password = await bcrypt.hash(user.password, 10)

        const created = await this.usersRepository.save(user);

        return this.transformer.toUserDTO(created);
    }

    public async deleteUserById(
        userId: number): Promise<UserDTO> {
        const user = await this.getUserById(userId);
        user.isDeleted = true;
        this.usersRepository.save(user);
        return user;
    }

    public async banUser(userId: number, period: number) {
        const user = await this.getUserById(userId);
        user.banEndDate = new Date(Date.now() + period);
        return await this.usersRepository.save(user)
    }

    // add course to user
    public async addCourseToUser(userId: number, course: Course): Promise<User> {
        const user: User = await this.getUserById(userId);
        user.courses.push(course);
        return await this.usersRepository.save(user);
    }
}
