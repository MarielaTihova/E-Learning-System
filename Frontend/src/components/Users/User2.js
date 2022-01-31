import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';

import "./User2.css";
import "../../assets/icons/font-awesome/font-awesome.css";
import PropTypes from 'prop-types';

const User2 = (props) => {
    const user = props.user;
    const userRoles = ["No role", "Student", "Admin", "Teacher"];
    console.log("User2", user);

    return (
        <div>
            <div className='card-narrower container1'>
                <MDBCard wide cascade>
                    <MDBView cascade>
                        <MDBCardImage
                            hover
                            overlay='white-slight'
                            className='card-img-top'
                            src='https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-slack/avatars/vaibhav_shrivastava.png'
                            alt='Card cap'
                        />
                    </MDBView>

                    <MDBCardBody cascade className='text-center'>
                        <MDBCardTitle className='card-title'>
                            <strong>{user.personalName}</strong>
                        </MDBCardTitle>

                        <p className='font-weight-bold blue-text'>Role: {userRoles[user.role]}</p>

                        <MDBCardText>
                            Participating in <b>{user?.courses?.length} courses</b>
                        </MDBCardText>

                        <MDBCol md='12' className='d-flex justify-content-center'>
                            <a href='!#' className='px-2 fa-lg li-ic'>
                                <MDBIcon fab icon='linkedin-in'></MDBIcon>
                            </a>

                            <a href='!#' className='px-2 fa-lg tw-ic'>
                                <MDBIcon fab icon='twitter'></MDBIcon>
                            </a>

                            <a href='!#' className='px-2 fa-lg fb-ic'>
                                <MDBIcon fab icon='facebook-f'></MDBIcon>
                            </a>
                        </MDBCol>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </div>
    )
}

User2.propTypes = {
    user: PropTypes.object.isRequired,
}
export default User2;
