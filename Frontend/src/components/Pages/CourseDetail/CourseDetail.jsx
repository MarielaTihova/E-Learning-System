import _ from 'lodash';
import { MDBContainer, MDBRow, MDBBadge, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from
  "mdbreact";

import React, { useEffect, useState, useContext, useCallback } from "react";
import { useFormik } from "formik"
import { useLocation } from "react-router"

import queryString from 'query-string';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

import { BASE_URL, DAYS_OF_THE_WEEK_CHOICES } from "../../../common/constants";

import AddTaskDialog from "../../AddTaskDialog";

const CourseDetail = (props) => {
  const history = props.history;

  const [error, setError] = useState(null);
  const [courseTasks, setCourseTasks] = useState([]);
  const [inputToDisplay, setInputToDisplay] = useState(null)
  const [showTaskAnswers, setShowTaskAnswers] = useState(null)

  const [selectedTask, setSelectedTask] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  const [updateCourseDialogOpened, setUpdateCourseDialogOpened] = useState(false);
  const [activeItem, setActiveItem] = useState("1");

  const toggle = (tab) => {
    if (activeItem !== tab) {
      setActiveItem(tab)
    }
  }

  const location = useLocation()

  const queryParams = queryString.parse(location.search);

  // const courseId = _.get(queryParams, 'courseId');
  const courseId = props.match.params['courseId'];
  console.log(courseId);

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  const userIsTeacher = loggedUser.role === 'Teacher';

  // TODO: fetch course tasks!!

  const fetchCourses = useCallback(async () => {
    let response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      }
    })
    response = await response.json()
    console.log('course details', response);
    console.log('tasks', response.tasks);
    setCurrentCourse(response);
    setCourseTasks(response.tasks.filter(task => !task.isDeleted));

  }, [])

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const initialValues = {
    answerText: ''
  }

  const handleSubmit = (values) => {
    console.log(values);
    console.log(selectedTask, "selectedTask")

    fetch(`${BASE_URL}/courses/${courseId}/tasks/${selectedTask.id}`, { // TODO: introduce this api -> Everyone, this is api 10. Api 10, this is everyone
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ ...values }),
    })
      .then(r => r.json())
      .then(result => {
        console.log('added new answer', result);

        toast.configure();
        toast('Successfuly added answer!', { position: toast.POSITION.TOP_RIGHT });

        setInputToDisplay(null);
      })
      .catch(alert);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });

  const deleteTask = (taskId) => {
    fetch(`${BASE_URL}/courses/${courseId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log('delete result', result);
        toast.configure();
        toast('Task deleted!', { position: toast.POSITION.TOP_RIGHT });
      })
    // .catch(alert);
    const filteredTasks = courseTasks.filter(t => t.id !== taskId);
    setCourseTasks(filteredTasks);
  }

  const showJoinButton = (course) => {
    const userEnrolledInCourse = !!course?.participants.find(p => p.id === loggedUser.id);
    return !userEnrolledInCourse;
  }

  const handleEnrollCourse = (courseId) => {
    console.log("Enroll", courseId);

    fetch(`${BASE_URL}/courses/enroll/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({}),
    })
      .then(r => r.json())
      .then(result => {
        console.log('Enroll course', result);
        fetchCourses();
        toast.configure();
        toast('Successfuly joined the course!', { position: toast.POSITION.TOP_RIGHT });

      })
      .catch(alert);
  }
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
      <h2 className='course-description'>
        {currentCourse && currentCourse.name}
        {showJoinButton(currentCourse) && <Button size="small" onClick={() => handleEnrollCourse(currentCourse.id)}>Join</Button>}

      </h2>
      <MDBContainer>
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => toggle("1")} role="tab" >
              Course details
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => toggle("2")} role="tab" >
              Tasks
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeItem === "3"} onClick={() => toggle("3")} role="tab" >
              Participants
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            {currentCourse &&
              <div className="mt-2">
                <h6> <b>Day of the week: </b>
                  <span><MDBBadge color="warning">{_.find(DAYS_OF_THE_WEEK_CHOICES, ['value', currentCourse.dayOfWeek])?.label}</MDBBadge></span>
                </h6>
                <h6><b>Start time:</b> <MDBBadge color="default">{currentCourse.startTime}</MDBBadge></h6>
                <h6><b>End time:</b> <MDBBadge color="danger">{currentCourse.endTime}</MDBBadge></h6>
                <h6><b>Description:</b> {currentCourse.description}</h6>
              </div>}
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            {currentCourse &&
              <div>
                {courseTasks.length > 0 ? courseTasks.map((task, key) =>
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
                            Available from: <MDBBadge color="default">{datetime(task.availableFrom).format("DD/MM/YY hh:mm A")}</MDBBadge>
                          </Typography>
                          <Typography>
                            Available to: <MDBBadge color="danger">{datetime(task.availableFrom).format("DD/MM/YY hh:mm A")}</MDBBadge>
                          </Typography>
                        </Stack>
                      </Stack>
                      {inputToDisplay == `${task.id}` &&
                        <form onSubmit={formik.handleSubmit}>
                          <TextField
                            multiline
                            rows={4}
                            margin="dense"
                            id="answerText"
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
                      {userIsTeacher && (_.isNull(showTaskAnswers) || showTaskAnswers !== task.id) && <>
                        <Button size="small" onClick={() => deleteTask(task.id)}>Delete</Button>
                        <Button size="small" onClick={() => setShowTaskAnswers(task.id)}>View answers</Button>

                      </>}
                      {userIsTeacher && !_.isNull(showTaskAnswers) && showTaskAnswers === task.id &&
                        <>
                          <Stack>
                            {_.isEmpty(task.answers) ? <Typography variant="subtitle2" >Currently no answers</Typography> :
                              <div>
                                {task.answers.map((answer, index) =>
                                  <Stack key={answer.id} sx={{
                                    "flexDirection": "row"
                                  }}>
                                    <Typography variant="subtitle2">{answer.madeBy}</Typography>
                                    <Typography>{index + 1}.{answer.answerText}</Typography>
                                  </Stack>)
                                }
                              </div>
                            }
                            <Button size="small" onClick={() => setShowTaskAnswers(null)}>Hide answers</Button>
                          </Stack>
                        </>
                      }
                      {!userIsTeacher && _.isNull(inputToDisplay) && <Button size="small" onClick={() => { setInputToDisplay(task.id); setSelectedTask(task) }}>Answer</Button>}

                    </CardActions>
                  </Card>

                )
                  : <div>
                    <h1>No tasks for this course!</h1>
                  </div>
                }
                <Button size="small" onClick={() => history.replace('/my-courses')}>Back to courses</Button >

                {userIsTeacher && <div className="add-button"><AddTaskDialog onSubmit={() => fetchCourses()} courseId={courseId} /></div>}

              </div>
            }
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <div className="mt-2">
              {currentCourse &&
                currentCourse.participants.map((p, index) => <h6 key={index}>{index + 1}.{p.personalName}</h6>)
              }
            </div>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    </div>
  );
};

export default CourseDetail;
