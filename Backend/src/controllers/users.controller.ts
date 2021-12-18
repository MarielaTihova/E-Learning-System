
import { UserRole } from './../models/enums/user-role';
import { RolesGuard } from './../auth/roles.guard';

import {
    Controller, Get, HttpStatus, HttpCode, Param, Post, Body, ValidationPipe, UseGuards, Delete, ParseIntPipe,/*, Body, Post, Put, Param, UnauthorizedException, BadRequestException, Get*/
} from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { ReviewDTO } from "src/dtos/reviews/review.dto";
import { UserDTO } from "src/dtos/users/user.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/auth/user-id.decorator';
import { BlacklistGuard } from 'src/auth/blacklist.guard';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Get()
    async getAllUsers(): Promise<UserDTO[]> {
        return await this.usersService.getAllUsers();
    }

    // PUBLIC
    @Post()
    async registerUser(@Body(new ValidationPipe({ whitelist: true })) userDto: RegisterUserDTO): Promise<UserDTO> {
        return await this.usersService.registerUser(userDto);
    }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserDTO> {
        return this.usersService.getUserById(+id);
    }

    // // ADMIN
    // // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get(':id/reviews')
    // @HttpCode(HttpStatus.FOUND)
    // async readUserReviews(@Param('id') id: string): Promise<ReviewDTO[]> {
    //     return await this.usersService.readUserReviews(+id)
    // }


    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get(':id/reviews/:reviewsId')  // I think that should be :id/userreviews/rreviewsID
    // @HttpCode(HttpStatus.FOUND)
    // async getBookReviewById(@Param('id') bookId: string,
    //     @Param('reviewId') reviewId: string): Promise<ReviewDTO> {
    //     return await this.usersService.getUserReviewById(+bookId, +reviewId);
    // }


    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Delete(':id')
    public async deleteUser(@Param('id') userId: string) {
        return await this.usersService.deleteUserById(+userId);
    }

    @Post(':id/ban')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    async banUser(@Param('id', ParseIntPipe) userId: number, @Body(new ValidationPipe({ whitelist: true })) banDTO: any) {
        return await this.usersService.banUser(userId, banDTO.period)
    }

}
