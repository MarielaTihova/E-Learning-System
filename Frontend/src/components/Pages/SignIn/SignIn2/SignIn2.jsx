import React, { useState, useEffect, useContext } from "react";
import queryString, { ParsedQuery, StringifyOptions } from 'query-string';
import _ from "lodash";
import { useLocation } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from '../../../../providers/UserContext';
import jwtDecode from 'jwt-decode';
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
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdown,
  MDBDropdownItem,


} from "mdbreact";
import "./SignIn2.css";
import { BASE_URL } from "../../../../common/constants";
// import Test from "../../../../Test";




const SignIn = (props) => {
  const history = props.history;
  const location = useLocation();

  const [collapseID, setCollapseID] = useState(false);

  const queryParams = queryString.parse(location.search);

  const userRole = _.get(queryParams, 'role');

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  console.log("Design User: ", loggedUser);

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
      style={{ backgroundColor: "transparent" }}
      onClick={() => toggleCollapse("navbarCollapse")}
    />
  );



  const toggleCollapse = (collapseID) => () =>
    setCollapseID((prevState) =>
      prevState.collapseID !== collapseID ? collapseID : ""
    );



  // const search = () => {
  //   // history.push('./test');
  //   //  setSearching(true);
  //   if (searching) {
  //       return (<Test />)
  //   };
  // }

  //This is from the SignIn Component the original one

  const { setUser } = useContext(UserContext);

  const [user, setUserObject] = useState({
    username: '',
    password: '',
  });

  const updateUser = (prop, value) => setUserObject({ ...user, [prop]: value });

  const isLogin = location.pathname.includes('login');
  const isLogout = location.pathname.includes('logout');

  console.log("user", user);


  const login = () => {
    if (!user.username) {
      return alert('Invalid username!');
    }
    if (!user.password) {
      return alert('Invalid password!');
    }

    fetch(`${BASE_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(r => r.json())
      .then(result => {
        if (result.error) {
          return alert(result.message);
        }

        try {
          const payload = jwtDecode(result.token);
          setUser(payload);
        } catch (e) {
          return alert(e.message);
        }

        localStorage.setItem('token', result.token);
        history.push('/home');
      })
      .catch(alert); // (...rest) => alert(...rest);
  };


  const logout = () => {
    // if (!user.username) {
    //   return alert('Invalid username!');
    // }
    // if (!user.password) {
    //   return alert('Invalid password!');
    // }

    fetch(`${BASE_URL}/session`, {
      method: 'DELETE',
      // body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log(result);
        if (result.error) {
          return alert(result.message);
        }

        // try {
        //   const payload = jwtDecode(result.token);
        //   setUser(payload);
        // } catch (e) {
        //   return alert(e.message);
        // }

        localStorage.removeItem('token', result.token);
        setUser(null)
        history.push('/home');
      })
      .catch(alert); // (...rest) => alert(...rest);
  };



  const register = () => {
    if (!user.username) {
      return alert('Invalid username!');
    }
    if (!user.password) {
      return alert('Invalid password!');
    }

    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        personalName: user.username,
        role: Number(userRole)
      }),
    })
      .then(r => r.json())
      .then(result => {
        console.log('result: ', result);
        if (result.error) {
          return alert(result.message);
        }

        history.push('/login');
      })
      .catch(alert);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }


  return (
    <div id="classicformpage">
      {isLogout ? logout() : null}
      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient" />
        <MDBContainer
          style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
          className="mt-5  d-flex justify-content-center align-items-center"
        >
          <MDBRow>
            <MDBCol >
              <MDBAnimation type="fadeInRight" delay=".3s">
                <MDBCard id="classic-card">

                  <form onSubmit={handleSubmit}>
                  </form>
                  <MDBCardBody className="white-text">
                    <h3 className="text-center">
                      <MDBIcon icon="user-astronaut" /> {isLogin ? 'Login:' : 'Register:'}
                    </h3>
                    <hr className="hr-light" />
                    <MDBInput controlId="username"
                      className="white-text"
                      iconClass="white-text"
                      label="Your name"
                      icon="user"
                      type="text" id="input-username" placeholder="username" value={user.username} onChange={(e) => updateUser('username', e.target.value)}
                    />
                    <MDBInput controlId="password"
                      className="white-text"
                      iconClass="white-text"
                      label="Your password"
                      icon="lock"
                      type="password" id="input-password" value={user.password} onChange={(e) => updateUser('password', e.target.value)}
                    />

                    <div className="text-center mt-4 black-text">
                      {isLogin
                        ? <div> <MDBBtn rounded className='btn-default' onClick={login}>Login</MDBBtn>
                          <MDBBtn outline color='white' rounded onClick={() => history.goBack()}>Go back</MDBBtn>
                        </div>
                        : <MDBBtn rounded className='btn-default' onClick={register}>Register</MDBBtn>}
                      {!isLogin ? <MDBBtn outline color='white' rounded onClick={() => { history.push('/login') }}>Have an account? Login</MDBBtn> : null}
                      {/* <MDBBtn color="indigo">Sign Up</MDBBtn> */}
                      <hr className="hr-light" />
                      <div className="text-center d-flex justify-content-center white-label">
                        <a href="#!" className="p-2 m-2">
                          <MDBIcon fab icon="twitter" className="white-text" />
                        </a>
                        <a href="#!" className="p-2 m-2">
                          <MDBIcon fab icon="linkedin" className="white-text" />
                        </a>
                        <a href="#!" className="p-2 m-2">
                          <MDBIcon
                            fab
                            icon="instagram"
                            className="white-text"
                          />
                        </a>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBView>

      {/* <MDBContainer>
        <MDBRow className="py-5">
          <MDBCol md="12" className="text-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat noooksn proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}
      {/* {isLogin
              ? <MDBBtn variant="dark" block size="lg" onClick={login}>Login</MDBBtn>
              : <MDBBtn variant="dark" block size="lg" onClick={register}>Register</MDBBtn>}
            {!isLogin ? <MDBBtn variant="dark" block size="lg" onClick={() => { history.push('/login') }}>Have an account? Login</MDBBtn> : null} */}
      <a name="aboutus"></a>
    </div>
  );
};

export default SignIn;
