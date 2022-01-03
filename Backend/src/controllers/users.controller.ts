
import { UserRole } from './../models/enums/user-role';
import { RolesGuard } from './../auth/roles.guard';

import {
    Controller, Get, HttpStatus, HttpCode, Param, Post, Body, ValidationPipe, UseGuards, Delete, ParseIntPipe, Put, Query,/*, Body, Post, Put, Param, UnauthorizedException, BadRequestException, Get*/
} from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { UserDTO } from "src/dtos/users/user.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import { AuthGuard } from '@nestjs/passport';
import { BlacklistGuard } from 'src/auth/blacklist.guard';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Get()
    async getAllUsers(@Query('role') role?: string): Promise<UserDTO[]> {
        return await this.usersService.getAllUsers(+role);
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

    @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    @Put(':id/roles/:role')
    async assignRoleToUser(@Param('id') userId: string, @Param('role') role: string) {
        return this.usersService.assignRoleToUser(+userId, +role);
    }
}
