// import React from "react";
//import { NavLink } from "react-router-dom";
// tuk shte sedi nov HomePage i ot tuk shte navigira kum drugiq ni register i login


import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBFormInline,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBIcon
} from 'mdbreact';
import './Home.css';
import UserContext from '../../../providers/UserContext';
import MultiCarouselPage from '../../Base/Carousel/Carousel';

const Home = () => {

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  return (
    <div id='caltoaction'>

      {!loggedUser ?
        <MDBView src='https://mdbootstrap.com/img/Photos/Others/gradient2.png'>
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
                    Welcome to Telerik Library
                </h1>
                  <h5 className='pt-md-5 pt-sm-2 pt-5 pb-md-5 pb-sm-3 pb-5'>
                    It comes with a lot of fasinating books for you to borrow. We are trying to make your choice easier by letting you see reviews by other readers.
                    We hope you enjoy it! Happy reading!
                </h5>
                  <MDBBtn href='/register' rounded className='btn-purple'>
                    <MDBIcon icon='user' className='mr-2' /> Sign up!
                  {/* <MDBNavLink to='/register' icon='user' className='mr-2'>Sign up!</MDBNavLink> */}
                  </MDBBtn>
                  <a href="#sec1" className="link">
                    <MDBBtn outline color='purple' rounded>

                      <MDBIcon icon='book' className='mr-2' /> Preview
                  </MDBBtn>
                  </a>
                </MDBCol>
              </MDBRow>
            </a>
          </MDBContainer>
        </MDBView>
        : null}

      {!loggedUser ?
        <div id="carousel">
          <a name="sec1">
            <MultiCarouselPage /></a>
          <a href="#sec2" className="link" id="letsgoBtn">
            <MDBBtn rounded className='btn-purple'>
              <MDBIcon icon='user' className='mr-2' /> Let's go!
            {/* <MDBNavLink to='/register' icon='user' className='mr-2'>Sign up!</MDBNavLink> */}
            </MDBBtn></a>
        </div>
        : null}
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
