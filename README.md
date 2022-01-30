# E-Learning System

##  Project Requirements

### Server

1. Go to Backend and Frontend root levels of folder then in terminal and run:

 ```sh
  $ npm install
  ```

2. Setup MySQL Database with new Schema named `e_learning_system`.

3. Setup database connection configs


 ``` typescript
@Module({
  imports: [
    ControllersModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root', // Place your db password here
      database: 'e_learning_system',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    })]
})
  ```

  ### Built With

 - [React JS](https://reactjs.org/) - library used for our client.
 - [NestJS](https://nestjs.com/) - framework for building our server.
 - [Emotion for React](https://emotion.sh/docs/@emotion/react) - to design our components in the client.
 - [TypeORM](http://typeorm.io/#/) - an **ORM** that can run in **Node.js**;
 - [JWT](https://jwt.io/) - for authentication.

---

### Authors and Contributors
- Bogomila Peneva (F107307)
- Mariela Tihova (F106664)
---



## Functionalities

### User
1. Register user
2. Login
3. Assign role to user

### Courses
1.  View all courses
2.  View details for course
3.  Create course
4.  Edit course
5.  Enrol in a course

### Tasks
1.  Add task to course
2. View all tasks for course
3. Answer a task (if you are logged as student)
4. View task answers (if you are a teacher)
5. Delete a task (if you are a teacher)

## Authorisation
The application supports 3 types of authorisation, according to which, access is being granted or denied.
- Student
- Teacher
- Admin


### TBD
Some of the functionalities like admin actions in the user controller are only implemented in the backend. Although they are not required, we decided that it's nice to have them. Also more major requirement that is still missing is the part for Course materials.








