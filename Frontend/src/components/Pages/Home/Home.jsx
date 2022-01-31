import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBIcon,
  MDBBadge
} from 'mdbreact';
import './Home.scss';
import UserContext from '../../../providers/UserContext';
import { BASE_URL } from '../../../common/constants';

const Home = (props) => {
  const history = props.history;
  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;
  const [userCourses, setUserCourses] = useState([]);
  const [otherCourses, setOtherCourses] = useState([]);
  const [userCoursesVisible, setUserCoursesVisible] = useState(true);
  const [otherCoursesVisible, setOtherCoursesVisible] = useState(true);
  console.log('logged user', loggedUser);


  const fetchCourses = useCallback(async () => {
    if (loggedUser) {
      fetch(`${BASE_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }
      })
        .then(r => r.json())
        .then(courses => {
          const userCourses = courses ? courses.filter(c => c.participants.find(p => p.id === loggedUser.id)) : [];
          const otherCourses = courses ? courses.filter(c => !userCourses.find(uc => uc.id === c.id)) : [];
          setUserCourses(userCourses);
          setOtherCourses(otherCourses);
        })
      // courses = await courses.json()
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses]);

  return (
    <div id='caltoaction'>

      {!loggedUser &&

        <MDBView src='  https://mdbootstrap.com/img/Photos/Others/gradient3.png'>
          {/* <MDBView src='http://mdbootstrap.com/img/Photos/Others/images/91.jpg'> */}
          <MDBMask className='rgba-purple-slight ' />
          <MDBContainer
            style={{ height: '100%', width: '100%', paddingTop: '14rem' }}
            className='d-flex justify-content-center align-items-center'
          >

            <a name="sec2">
              <MDBRow>
                <MDBCol md='12' className='mb-4 text-center'>
                  <h1 className='display-4 font-weight-bold mb-0 pt-md-5 pt-5'>
                    Welcome to E-learning system
                  </h1>
                  <h5 className='pt-md-5 pt-sm-2 pt-5 pb-md-5 pb-sm-3 pb-5'>
                  </h5>
                  <MDBBtn href='/register?role=3' rounded className='btn-purple'>
                    <MDBIcon icon='user' className='mr-2' /> Sign up as teacher!
                    {/* <MDBNavLink to='/register' icon='user' className='mr-2'>Sign up!</MDBNavLink> */}
                  </MDBBtn>
                  <MDBBtn href='/register?role=1' rounded className='btn-purple'>
                    <MDBIcon icon='user' className='mr-2' /> Sign up as student!
                    {/* <MDBNavLink to='/register' icon='user' className='mr-2'>Sign up!</MDBNavLink> */}
                  </MDBBtn>

                </MDBCol>
              </MDBRow>
            </a>
          </MDBContainer>
        </MDBView>
      }

      {loggedUser &&
        <div className='main-content'>
          <h1> Welcome, {loggedUser.personalName}!</h1>

          <div className='items'>
            <div>
              <MDBBadge tag="a" pill color="default"
                onClick={() => setUserCoursesVisible(!userCoursesVisible)}>
                <h3>Your courses: <strong>{userCourses.length}</strong></h3>
              </MDBBadge>
              <div className={`${userCoursesVisible ? "home-page-item-1" : ""}`}>
                {userCourses && userCoursesVisible && userCourses.map((course, key) =>
                  <h5 className='clickable-item' key={key} onClick={() => history.push(`courses/${course.id}`)}>{key + 1}. {course.name}</h5>
                )}
              </div>
            </div>
            <div>
              <MDBBadge tag="a" pill color="secondary"
                onClick={() => setOtherCoursesVisible(!otherCoursesVisible)}>
                <h3>Other courses: <strong>{otherCourses.length}</strong></h3>
              </MDBBadge>
              <div className={`${otherCoursesVisible ? "home-page-item-2" : ""}`}>
                {otherCourses && otherCoursesVisible && otherCourses.map((course, key) =>
                  <h5 className='clickable-item' key={key} onClick={() => history.push(`courses/${course.id}`)}>{key + 1}. {course.name}</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </div >

  );
}


export default Home;

















// const Home = () => {
//   return (
//     <div className="home">

//     </div>
//   );
// };
// export default Home;

// //Before
// <h2>Home</h2>
// <img className="card__image" src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80" alt=""></img>
// <div className="navigation">
//   <NavLink to="/home">Home</NavLink>
// </div>
