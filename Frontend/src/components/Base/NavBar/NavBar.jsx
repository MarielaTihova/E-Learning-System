import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
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
  MDBIcon,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdown,

} from 'mdbreact';
import './NavBar.css';
import UserContext from '../../../providers/UserContext';



const NavBar = (props) => {
  const history = props.history;
  const [collapseID, setCollapseID] = useState(false);
  const [searching, setSearching] = useState("");
  const [activeTab, setActiveTab] = useState('home');

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;


  useEffect(() => {
    document.querySelector("nav").style.height = "65px";
    return () => {
      document.querySelector("nav").style.height = "auto";
    };
  }, []);

  const overlay = (

    <div
      id="sidenav-overlay"
      role="presentation"
      // navStyle={{ marginTop: '4rem' }}
      style={{ backgroundColor: "transparent" }}
      onClick={() => handleTogglerClick("handleTogglerClick")}
    />
  );


  const handleTogglerClick = () => {
    setCollapseID(
      collapseID !== collapseID
    )
  }

  return (
    <div id='caltoaction'>
      <MDBNavbar
        color='default-color'
        light
        expand='md'
        fixed='top'
        scrolling
      >
        <MDBContainer className='container'>
          <img height="75px" padding="0px" margin="0px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fowl-icon-20.png&f=1&nofb=1"></img>
          <MDBNavbarBrand>
            <MDBNavLink to='/home' style={{ color: "black", marginTop: "10px" }}>

              <strong>E-Learn</strong>
            </MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={() => handleTogglerClick()} />
          <MDBCollapse isOpen={collapseID} navbar>
            <MDBNavbarNav left>
              {!loggedUser && <MDBBtn href='/login' rounded className='login btn-purple'>
                Login
              </MDBBtn>}
              {loggedUser !== null &&
                <MDBNavItem onClick={() => setActiveTab("profile")} active={activeTab === "profile"}>
                  <MDBNavLink to='/profile'>Profile</MDBNavLink>
                </MDBNavItem>
              }
              {loggedUser !== null &&
                <MDBNavItem onClick={() => setActiveTab("my-courses")} active={activeTab === "my-courses"}>
                  <MDBNavLink to='/my-courses'>My Courses</MDBNavLink>
                </MDBNavItem>
              }
              {loggedUser && loggedUser.role === 'Student' && <MDBNavItem className="allCourses" onClick={() => setActiveTab("allCourses")} active={activeTab === "allCourses"}>
                <MDBNavLink to='/all-courses'>All Courses</MDBNavLink>
              </MDBNavItem>
              }
            </MDBNavbarNav>
            { /* {loggedUser !== null ?

              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBFormInline waves>
                    <div className='md-form my-0'>
                      <input
                        className='form-control mr-sm-2'
                        type='text'
                        placeholder='Search'
                        onChange={(e) => setSearching(e.target.value)}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            history.push(`/books?name=${searching}`);
                          }
                        }}
                        aria-label='Search'

                      />
                    </div>

                  </MDBFormInline>
                </MDBNavItem>
              </MDBNavbarNav>

                      : null}*/}

            {loggedUser && <MDBBtn href='/logout' rounded className='login btn-purple'>
              Logout
            </MDBBtn>}}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {collapseID && overlay}
    </div >
  )
}

export default withRouter(NavBar);
