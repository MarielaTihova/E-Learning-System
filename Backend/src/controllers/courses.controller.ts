import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserId } from 'src/auth/user-id.decorator';
import { CreateCourseDTO } from 'src/dtos/courses/create-course.dto';
import { CreateTaskDTO } from 'src/dtos/courses/tasks/create-task.dto';
import { TaskAnswerDTO } from 'src/dtos/courses/tasks/task-answer.dto';
import { Course } from 'src/models/course.entity';
import { CourseUserFilter } from 'src/models/enums/course-user-filter';
import { UserRole } from 'src/models/enums/user-role';
import { TaskAnswer } from 'src/models/task-answer.entity';
import { Task } from 'src/models/task.entity';
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
    async getAllCourses(@UserId() userId: number, @Query('userFilter') filter: string): Promise<Course[]> {
        if (filter && +filter === CourseUserFilter.LoggedUser) {
            return await this.coursesService.getMyCourses(userId);
        } else {
            // no filter, filter = 'all', filter= <any other (wrong) value>, 
            // just skip it and return all courses
            return await this.coursesService.getAllCourses();
        }
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

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Teacher))
    @Put(':courseId')
    async editCourse(@Param('courseId') courseId: string, @Body() newData: CreateCourseDTO, @UserId() userId: string) {
        return await this.coursesService.editCourse(+courseId, newData, +userId);
    }

    @Post(':courseId/tasks')
    async createTaskForCourse(@Param('courseId') courseId: string, @Body() taskInfo: CreateTaskDTO): Promise<Task> {
        return await this.coursesService.createTaskForCourse(+courseId, taskInfo);
    }

    @Post(':courseId/tasks/:taskId')
    async answerTask(@Param('courseId') courseId: string, @Param('taskId') taskId: string, @UserId() userId: string, @Body() answer: TaskAnswerDTO): Promise<TaskAnswer> {
        return await this.coursesService.answerTask(+courseId, +taskId, +userId, answer);
    }

    @Delete(':courseId/tasks/:taskId')
    async deleteTask(@Param('courseId') courseId: string, @Param('taskId') taskId: string): Promise<any> {
        return await this.coursesService.deleteCourseTask(+courseId, +taskId);
    }


    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Student))
    @Put('enroll/:courseId')
    async enrollMyselfInCourse(@Param('courseId') courseId: string, @UserId() studentId: string) {
        return await this.coursesService.enrollStudentInCourse(+courseId, +studentId);
    }

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Teacher))
    @Put('enroll/:courseId/students/:studentId')
    async enrollStudentInCourse(@Param('courseId') courseId: string, @Param('studentId') studentId: string, @UserId() teacherId: string) {
        const teacher: User = await this.usersService.getUserById(+teacherId);
        if (!teacher.courses.find((course: Course) => course.id === +courseId)) {
            throw new BadRequestException('A teacher can NOT enroll students in courses created by other teachers!')
        } else {
            return await this.coursesService.enrollStudentInCourse(+courseId, +studentId);
        }
    }
}
