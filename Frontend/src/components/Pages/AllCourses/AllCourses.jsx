import _ from 'lodash'

import React, { useEffect, useState, useContext, useCallback} from "react";

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

const AllCourses = (props) => {
    const [error, setError] = useState(null);
    const [appCourses, updateCourses] = useState([]);

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const userIsTeacher = loggedUser.role === 'Teacher';

    const fetchCourses = useCallback( () => fetch(`${BASE_URL}/courses`, {   // fetch all courses here
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      }
  })
      .then((response) => response.json())
      .then((result) => {
          if (Array.isArray(result)) {
              console.log(result);
              updateCourses(result);
          } else {
              throw new Error(result.message);
          }
      })
      .catch((error) => setError(error.message)), [])

    useEffect(() =>
      fetchCourses()
    , []);

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
              {userIsTeacher && <Button size="small" onClick={() => handleEnrollCourse(course.id)}>Join</Button>}
            </CardActions>
          </Card>
        )}
      </div>
    );
};

export default AllCourses;
