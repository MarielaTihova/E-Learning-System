import { UserId } from 'src/auth/user-id.decorator';
import { Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TransformService } from "./transform.service";
import { UserDTO } from "src/dtos/users/user.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) { }

    async getAllUsers(): Promise<UserDTO[]> {
        const users = await this.usersRepository.find({
            where: { isDeleted: false },
            order: {
                //name: "ASC",
                id: "ASC"
            },
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
}
