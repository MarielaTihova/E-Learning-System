import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserId } from 'src/auth/user-id.decorator';
import { CreateCourseDTO } from 'src/dtos/courses/create-course.dto';
import { Course } from 'src/models/course.entity';
import { UserRole } from 'src/models/enums/user-role';
import { CoursesService } from 'src/services/courses.service';

@Controller('courses')
@UseGuards(AuthGuard('jwt'))
export class CoursesController {

    constructor(
        private readonly coursesService: CoursesService
    ) { }

    @Get()
    async getAllCourses(@UserId() userId: number): Promise<Course[]> {
        return await this.coursesService.getAllCourses(userId);
    }

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Teacher))
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCourse(@Body() course: CreateCourseDTO, @UserId() teacherId: number) {
        return await this.coursesService.createCourse(course, teacherId);
    }

    @Get(':courseId')
    async getCourseById(@Param('courseId') courseId: string): Promise<Course> {
        return await this.coursesService.getCourseById(+courseId);
    }
}
