import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserId } from 'src/auth/user-id.decorator';
import { CreateCourseDTO } from 'src/dtos/courses/create-course.dto';
import { Course } from 'src/models/course.entity';
import { UserRole } from 'src/models/enums/user-role';
import { User } from 'src/models/user.entity';
import { CoursesService } from 'src/services/courses.service';
import { UsersService } from 'src/services/users.service';

@Controller('courses')
@UseGuards(AuthGuard('jwt'))
export class CoursesController {

    constructor(
        private readonly coursesService: CoursesService,
        private readonly usersService: UsersService
    ) { }

    @Get()
    async getAllCourses(@UserId() userId: number): Promise<Course[]> {
        return await this.coursesService.getAllCourses(userId);
    }

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Teacher))
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCourse(@Body() course: CreateCourseDTO, @UserId() teacherId: number): Promise<Course> {
        return await this.coursesService.createCourse(course, teacherId);
    }

    @Get(':courseId')
    async getCourseById(@Param('courseId') courseId: string): Promise<Course> {
        return await this.coursesService.getCourseById(+courseId);
    }

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Student))
    @Put(':courseId')
    async enrollMyselfInCourse(@Param('courseId') courseId: string, @UserId() studentId: string) {
        return await this.coursesService.enrollStudentInCourse(+courseId, +studentId);
    }

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Teacher))
    @Put(':courseId/students/:studentId')
    async enrollStudentInCourse(@Param('courseId') courseId: string, @Param('studentId') studentId: string, @UserId() teacherId: string) {
        const teacher: User = await this.usersService.getUserById(+teacherId);
        if (!teacher.courses.find((course: Course) => course.id === +courseId)) {
            throw new BadRequestException('A teacher can NOT enroll students in courses created by other teachers!')
        } else {
            return await this.coursesService.enrollStudentInCourse(+courseId, +studentId);
        }
    }
}
