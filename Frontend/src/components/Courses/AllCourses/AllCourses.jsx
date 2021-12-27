import React, { useEffect, useState, useContext } from "react";
import { withRouter } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from "../../Base/Container/Container";
import { BASE_URL } from "../../../common/constants";
import AppError from "../../Pages/AppError/AppError";
import UserContext from "../../../providers/UserContext";
import './AllCourses.scss';

import {datetime} from '../../../utils/datetime'


import CreateCourseDialog from "../../CreateCourseDialog";

const AllCourses = (props) => {
    const history = props.history;
    const word = props.location.search;
    const searchWord = word.substring(6);

    const [error, setError] = useState(null);
    const [appCourses, updateCourses] = useState([]);


    const [details, setDetails] = useState(false);

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const userIsTeacher = loggedUser.role === 'Teacher';

    useEffect(() => {

        fetch(`${BASE_URL}/courses`, {
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
            .catch((error) => setError(error.message))
    }, []);


    if (error) {
        return (
            <div>
                <Container>
                    <AppError message={error} />
                </Container>
            </div>
        );
    }

    // const neww = sortBooks(appBooks);
    // console.log("All Courses", appCourses);

    return (
        <div className="courses-wrapper">
            {appCourses.map((course, key) =>
                <Card >
                    <CardContent>
                        <Stack sx={{"flex-direction": "row",
                            "justify-content": "space-between"}}>
                            <Typography >
                            {course.name}
                            </Typography>
                            <Stack>
                                <Typography variant="subtitle2">
                                {/* TODO: Use courese schedule day of week and start,end time here*/}
                                    Monday from {datetime("12:30:00", 'HH:mm:ss',).format("hh:mm A")} to {datetime("14:00:00", 'HH:mm:ss',).format("hh:mm A")}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography sx={{ fontSize: 14, marginTop: 5 }} color="text.secondary" gutterBottom>
                            {course.description}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        {userIsTeacher && <Button size="small">Edit</Button>}
                    </CardActions>
                </Card>
            )}
            <div className="add-button"><CreateCourseDialog/></div>
        </div >
    );
};

export default withRouter(AllCourses);
