import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { BASE_URL } from "../../../common/constants";
import { withRouter } from "react-router-dom";
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


const CreateReview = ({ history, match }) => {

  const [error, setError] = useState(null);
  const [bookName, setBookName] = useState("");
  const [x, setx] = useState('');
  const [review, setReview] = useState({
    text: "",
  });

  const updateReviewProp = (prop, value) => {
    review[prop] = value;
  };

  const bookId = match.params['id'];

  console.log('Create Review ID:', bookId)
  console.log('MATCH CREATE REVIEW', match)

  const createReview = ({ text }) => {

    fetch(`${BASE_URL}/books/${bookId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,

      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }

        else {
          setReview(result)
          history.push(`/books/${bookId}/reviews`);
        }
      })

      .catch((error) => alert(error.message))
  };


  const getBookName = () => {



    fetch(`${BASE_URL}/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setBookName(result.name);
      })

      .catch((error) => alert(error.message))
  };

  function handleSubmit(event) {
    event.preventDefault();
  }


  getBookName();

  return (
    <div id="classicformpage">

      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient" />
        <MDBContainer
          style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
          className="mt-5  d-flex justify-content-center align-items-center"
        >
          <MDBRow>
            <MDBAnimation
              type="fadeInLeft"
              delay=".3s"
              className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
            >
              <h1 className="h1-responsive font-weight-bold">
                {bookName}
              </h1>
              <hr className="hr-light" />
              <h6 className="mb-4">
                Enjoyed <b><u>{bookName}</u></b>? Leave a review and recommend it to others too!
              </h6>
            </MDBAnimation>

            <MDBCol md="6" xl="4" className="mb-4">
              <MDBAnimation type="fadeInRight" delay=".3s">
                <MDBCard id="classic-card">

                  <form onSubmit={handleSubmit}>
                  </form>
                  <MDBCardBody className="white-text">
                    <h3 className="text-center">
                      <MDBIcon icon="pencil-alt" /> Create a new review for this book
                    </h3>
                    <hr className="hr-light" />

                    <MDBInput controlId="todo-name"
                      className="white-text"
                      iconClass="white-text"
                      label="review text"
                      icon="comment"
                      type="text" id="input-text" placeholder="review text" onChange={(e) => updateReviewProp("text", e.target.value)}
                    />

                    <div className="text-center mt-4 black-text">

                      <div> <MDBBtn rounded className='btn-purple' onClick={() => (createReview(review), history.push(`/books/${bookId}/reviews`))}>Create</MDBBtn>
                        <MDBBtn outline color='white' rounded onClick={() => history.goBack()}>Cancel</MDBBtn>
                      </div>


                      {/* <MDBBtn color="indigo">Sign Up</MDBBtn> */}

                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBView>


      <a name="aboutus"></a>
    </div>
  );

};

CreateReview.propTypes = {
  history: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
};

export default withRouter(CreateReview)
