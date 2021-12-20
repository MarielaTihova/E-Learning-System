import React, { useEffect, useState, useContext } from "react";
import { withRouter } from 'react-router-dom';
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
                <ul>
                    <li key={key}>
                        <div>Name: {course.name}</div>
                        <div>Description: {course.description}</div></li>
                </ul>)}
        </div >
    );
};

export default withRouter(AllCourses);
