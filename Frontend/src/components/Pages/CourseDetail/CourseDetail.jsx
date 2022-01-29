import _ from 'lodash'

import React, { useEffect, useState, useContext, useCallback } from "react";
import {useFormik} from "formik"
import {useLocation} from "react-router"

import queryString from 'query-string';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Container from "../../Base/Container/Container";
import AppError from "../../Pages/AppError/AppError";
import UserContext from "../../../providers/UserContext";
import './CourseDetail.scss';

import { datetime } from '../../../utils/datetime';

import { BASE_URL } from "../../../common/constants";

import AddTaskDialog from "../../AddTaskDialog";

const testTasks = [
  {
    id: "courseTaskIdasjf'sadf'nf",
    description: "What Would You Rather Throw Away: Love Or Money?",
    availableFrom: "2022-01-19T14:44:35.912Z",
    availableTo: "2022-01-10T14:44:35.912Z"
  },
  {
    id: "courseTaskIdasjjjjsadf'nf",
    description: "What Was Your Fondest Memory Of High School?",
    availableFrom: "2022-01-04T14:44:35.912Z",
    availableTo: "2022-01-10T14:44:35.912Z"
  },
  {
    id: "courseTaskIdasaaaaadf'nf",
    description: "If You Had Three Wishes, What Would You Wish For?",
    availableFrom: "2022-01-14T14:44:35.912Z",
    availableTo: "2022-02-14T14:44:35.912Z"
  },
  {
    id: "courseTaskIdasjf'sadfwwwwwwwwww",
    description: "What's The Most Beautiful Place You've Ever Seen?",
    availableFrom: "2022-01-09T14:44:35.912Z",
    availableTo: "2022-01-22T14:44:35.912Z"
  }
]

const CourseDetail = (props) => {
  const [error, setError] = useState(null);
  const [courseTasks, setCourseTasks] = useState([]);
  const [inputToDisplay, setInputToDisplay] = useState(null)

  const [selectedTask, setSelectedTask] = useState(null)

  const [updateCourseDialogOpened, setUpdateCourseDialogOpened] = useState(false);

  const location = useLocation()

  const queryParams = queryString.parse(location.search);

  const courseId = _.get(queryParams, 'courseId');

  console.log(courseId);

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  const userIsTeacher = loggedUser.role === 'Teacher';

  // TODO: fetch course tasks!!

  // const fetchCourses = useCallback(async () => {
  //   let response = await fetch(`${BASE_URL}/courses?userFilter=2`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  //     }
  //   })
  //   response = await response.json()

  //   updateCourses(response);

  // }, [])

  // useEffect(() => {
    //   fetchCourses()
    // }, [fetchCourses]);

    const initialValues = {
      description: ''
    }

    const handleSubmit = (values) => {
      console.log(values);
      console.log(selectedTask, "selectedTask")

      fetch(`${BASE_URL}/courses/tasks/{selectedTask.id}/add-answer/`, { // TODO: introduce this api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({...values}),
      })
        .then(r => r.json())
        .then(result => {
          console.log('added new answer', result);
          setInputToDisplay(null);
        })
        .catch(alert);
    }

    const formik = useFormik({
      initialValues,
      onSubmit: handleSubmit
    });

  if (error) {
    return (
      <div>
        <Container>
          <AppError message={error} />
        </Container>
      </div>
    );
  }



  return (
    <div className="courses-wrapper">
      {testTasks.map((task, key) =>
        <Card onClick={() => console.log("test")} key={task.id} sx={{
          marginBottom: "20px"
        }}>
          <CardContent>
            <Stack sx={{
              "flexDirection": "row",
              "justifyContent": "space-between",
            }}>
              <Typography variant="subtitle2" >
              {task.description}
              </Typography>
              <Stack>
                <Typography>
                  Available from: {datetime(task.availableFrom).format("DD/MM/YY hh:mm A")}
                </Typography>
                <Typography>
                Available to: {datetime(task.availableFrom).format("DD/MM/YY hh:mm A")}
                </Typography>
              </Stack>
              </Stack>
              {inputToDisplay === `${task.id}` &&
              <form onSubmit={formik.handleSubmit}>
                  <TextField
                    multiline
                    rows={4}
                    margin="dense"
                    id="description"
                    label="Answer"
                    type="text"
                    fullWidth
                    onChange={formik.handleChange}
                    variant="outlined"
                  />
                  <Button type="submit">Submit answer</Button>
                </form>
              }
          </CardContent>

          <CardActions>
            {userIsTeacher && _.isNull(inputToDisplay) && <Button size="small" onClick={() => console.log("task delete")}>Delete</Button>}
            {!userIsTeacher && _.isNull(inputToDisplay) &&  <Button size="small" onClick={() =>  {setInputToDisplay(task.id); setSelectedTask(task.id)}}>Answer</Button>}

          </CardActions>

        </Card>
      )}
      {userIsTeacher && <div className="add-button"><AddTaskDialog onSubmit={() => console.log("pass")} courseId ={courseId} /></div>}

    </div>
  );
};

export default CourseDetail;
