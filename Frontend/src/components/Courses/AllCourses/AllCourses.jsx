import React, { useEffect, useState, useContext } from "react";
import { withRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
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
        <Card >
        <CardContent>
            <Typography variant="body2" >
            Course name
            </Typography>
            <Typography sx={{ fontSize: 14, marginTop: 5 }} color="text.secondary" gutterBottom>
            course description  course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description course description
            </Typography>
        </CardContent>
        <CardActions>
            {userIsTeacher && <Button size="small">Edit</Button>}
        </CardActions>
    </Card>
            {appCourses.map((course, key) =>
                <Card sx={{ minWidth: 275 }} key={key}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">

                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                        </Typography>
                        <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            )}
        </div >
    );
};

export default withRouter(AllCourses);
