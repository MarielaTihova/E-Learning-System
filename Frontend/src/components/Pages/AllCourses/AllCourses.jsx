import _ from 'lodash';

import React, { useEffect, useState, useContext, useCallback } from "react";

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from "../../Base/Container/Container";
import { BASE_URL, DAYS_OF_THE_WEEK_CHOICES } from "../../../common/constants";
import AppError from "../../Pages/AppError/AppError";
import UserContext from "../../../providers/UserContext";
import './AllCourses.scss';

import { datetime } from '../../../utils/datetime';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCourses = (props) => {
  const [error, setError] = useState(null);
  const [appCourses, updateCourses] = useState([]);
  const [joinButtonVisible, setJoinButtonVisible] = useState(true);

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  const userIsTeacher = loggedUser.role === 'Teacher';

  const fetchCourses = useCallback(async () => {
    let courses = await fetch(`${BASE_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      }
    })
    courses = await courses.json()

    updateCourses(courses);
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses]);

  const handleEnrollCourse = (courseId) => {
    console.log("Enroll", courseId);

    fetch(`${BASE_URL}/courses/enroll/${courseId}`, {  // Test when having all courses
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

        toast.configure();
        toast('Successfuly joined the course!', { position: toast.POSITION.TOP_RIGHT });

      })
      .catch(alert);
  }

  const showJoinButton = (course) => {
    const userEnrolledInCourse = !!course.participants.find(p => p.id === loggedUser.id);
    return !userEnrolledInCourse;
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

  console.log("All Courses", appCourses);

  return (
    <div className="courses-wrapper">
      {appCourses.map((course, key) =>
        <Card key={course.id} sx={{
          marginBottom: "20px"
        }}>
          <CardContent>
            <Stack sx={{
              "flexDirection": "row",
              "justifyContent": "space-between",
            }}>
              <Typography>
                {course.name}
              </Typography>
              <Stack>
                <Typography variant="subtitle2">
                  {_.find(DAYS_OF_THE_WEEK_CHOICES, ['value', course.dayOfWeek])?.label} from {datetime(course.startTime, 'HH:mm',).format("hh:mm A")} to {datetime(course.endTime, 'HH:mm',).format("hh:mm A")}
                  {/* Monday from {datetime("12:30:00", 'HH:mm:ss',).format("hh:mm A")} to {datetime("14:00:00", 'HH:mm:ss',).format("hh:mm A")} */}
                </Typography>
              </Stack>
            </Stack>
            <Typography sx={{ fontSize: 14, marginTop: 5 }} color="text.secondary" gutterBottom>
              {course.description}
            </Typography>
          </CardContent>
          <CardActions>
            {!userIsTeacher && showJoinButton(course) && <Button size="small" onClick={() => handleEnrollCourse(course.id)}>Join</Button>}
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default AllCourses;
