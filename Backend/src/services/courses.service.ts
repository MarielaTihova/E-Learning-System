import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDTO } from 'src/dtos/courses/create-course.dto';
import { CreateTaskDTO } from 'src/dtos/courses/tasks/create-task.dto';
import { TaskAnswerDTO } from 'src/dtos/courses/tasks/task-answer.dto';
// import { CourseSchedule } from 'src/models/course-schedule.entity';
import { Course } from 'src/models/course.entity';
import { UserRole } from 'src/models/enums/user-role';
import { TaskAnswer } from 'src/models/task-answer.entity';
import { Task } from 'src/models/task.entity';
import { User } from 'src/models/user.entity';
import { Repository } from "typeorm";
import { UsersService } from './users.service';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course) private readonly coursesRepository: Repository<Course>,
        @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
        @InjectRepository(TaskAnswer) private readonly answersRepository: Repository<TaskAnswer>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        // @InjectRepository(CourseSchedule) private readonly courseScheduleRepository: Repository<CourseSchedule>,
        private readonly usersService: UsersService
    ) { }

    async getAllCourses() {
        return await this.coursesRepository.find({
            relations: ['participants', 'tasks']
        });
    }

    async getMyCourses(userId: number): Promise<Course[]> {
        const loggedUser: User = await this.usersService.getUserById(userId);
        const allCourses: Course[] = await (await this.coursesRepository.find({
            relations: ['participants', 'tasks']
        }));
        return allCourses.filter((course: Course) => course.participants.find((user: User) => user.id === loggedUser.id));
    }

    async getCourseById(courseId: number): Promise<Course> {
        return await this.coursesRepository.findOne({
            where: { id: courseId },
            relations: ['participants', 'tasks']
        });
    }

    // TEACHER creates a course
    async createCourse(course: CreateCourseDTO, teacherId: number): Promise<Course> {
        const courseEntityInstance: Course = this.coursesRepository.create();
        courseEntityInstance.name = course.name;
        courseEntityInstance.description = course.description;
        courseEntityInstance.startTime = course.startTime;
        courseEntityInstance.endTime = course.endTime;
        courseEntityInstance.dayOfWeek = course.dayOfWeek;
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

    // TEACHER updates course
    async editCourse(courseId: number, newData: CreateCourseDTO, userId: number) {
        const loggedUser: User = await this.usersService.getUserById(userId);
        const course: Course = await this.getCourseById(courseId);
        const canEdit: boolean = loggedUser.role === UserRole.Admin ||
            (loggedUser.role === UserRole.Teacher && !!course.participants.find((p: User) => p.id === userId));
        if (canEdit) {
            course.name = newData.name;
            course.description = newData.description;
            course.startTime = newData.startTime;
            course.endTime = newData.endTime;
            course.dayOfWeek = newData.dayOfWeek;

            return this.coursesRepository.save(course);
        } else {
            throw new BadRequestException('To edit a course, you have to be its teacher or have admin rights!');
        }
    }

    // add user to course
    async enrollStudentInCourse(courseId: number, studentId: number): Promise<Course> {
        const course: Course = await this.coursesRepository.findOne({
            where: { id: courseId },
            relations: ['participants']
        });
        const student: User = await this.usersService.getUserById(studentId);

        course.participants.push(student);
        await this.usersService.addCourseToUser(studentId, course);

        return await this.coursesRepository.save(course);
    }

    // Tasks
    async createTaskForCourse(courseId: number, taskInfo: CreateTaskDTO): Promise<Task> {
        const course: Course = await this.getCourseById(courseId);
        const taskToCreate: Task = this.tasksRepository.create({
            description: taskInfo.description,
            availableFrom: taskInfo.availableFrom,
            availableTo: taskInfo.availableTo,
            course
        });

        return await this.tasksRepository.save(taskToCreate);
    }

    async deleteCourseTask(courseId: number, taskId: number): Promise<any> {
        const course: Course = await this.getCourseById(courseId);
        const task: Task = course.tasks.find((t: Task) => t.id === taskId);
        if (!task) {
            throw new Error('Task does not exist!');
        }
        task.isDeleted = true;
        this.tasksRepository.save(task);
        return {
            deleteMessage: 'Successfully deleted!'
        };
    }

    async answerTask(courseId: number, taskId: number, userId: number, answer: TaskAnswerDTO): Promise<TaskAnswer> {
        const course: Course = await this.getCourseById(courseId);
        console.log('course', course);
        const user: User = await this.usersService.getUserById(userId);
        // const task: number = course.tasks.findIndex((t: Task) => t.id == taskId);
        // console.log('task', task);
        // if (!task) {
        //     throw new Error('Task does not exist!');
        // }
        const task: Task = await this.tasksRepository.findOne({
            where: { id: taskId, isDeleted: false }
        });
        if (!task) {
            throw new Error('Task does not exist!');
        }
        const newAnswer: TaskAnswer = await this.answersRepository.create({
            answerText: answer.answerText,
            task,
            answeredBy: user,
            course
        });

        return await this.answersRepository.save(newAnswer);
    }
}
