import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDTO } from 'src/dtos/courses/create-course.dto';
import { CourseSchedule } from 'src/models/course-schedule.entity';
import { Course } from 'src/models/course.entity';
import { User } from 'src/models/user.entity';
import { Repository } from "typeorm";
import { UsersService } from './users.service';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course) private readonly coursesRepository: Repository<Course>,
        // @InjectRepository(CourseSchedule) private readonly courseScheduleRepository: Repository<CourseSchedule>,
        private readonly usersService: UsersService
    ) { }

    async getAllCourses(userId: number): Promise<Course[]> {
        const loggedUser: User = await this.usersService.getUserById(userId);
        return await (await this.coursesRepository.find({
            relations: ['participants']
        })).filter((course: Course) => course.participants.find((user: User) => user.id === loggedUser.id));
    }

    async getCourseById(courseId: number): Promise<Course> {
        return await this.coursesRepository.findOne(courseId);
    }

    // TEACHER creates a course
    async createCourse(course: CreateCourseDTO, teacherId: number): Promise<Course> {
        let courseEntityInstance: Course = this.coursesRepository.create();
        courseEntityInstance.name = course.name;
        courseEntityInstance.description = course.description;
        // courseEntityInstance.schedule = course.schedule;

        const courseCreated: Course = await this.coursesRepository.save(courseEntityInstance);

        const courseCreatedDbRecord: Course = await this.coursesRepository.findOne({
            where: { id: courseCreated.id },
            relations: ['participants']
        });

        const teacher: User = await this.usersService.getUserById(teacherId);
        courseCreatedDbRecord.participants.push(teacher);


        return this.coursesRepository.save(courseCreatedDbRecord);

    }
}
