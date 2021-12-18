import React, { useState } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

const FormsPage = () => {
    const [state, setState] = useState({
        username: {
            value: "Mark",
            valid: true
        },
        password: {
            value: "Otto",
            valid: false,
        }
    })




    // state = {
    //     username: {
    //         value: "Mark",
    //         valid: true
    //     },
    //     password: {
    //         value: "Otto",
    //         valid: true
    //     },
    // };

    const changeHandler = event => {
        setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
    };


    return (
        <div>
            <div>
                dsddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
            </div>
            <div>
                dsddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    </div>
            <div>
                dsddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
</div>
            <form>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormRegisterNameEx"
                            className="grey-text"
                        >
                            Username
              </label>
                        <input
                            value={state.username.value}
                            className={state.username.valid ? "form-control is-valid" : "form-control is-invalid"}
                            name="username"
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            id="defaultFormRegisterNameEx"
                            placeholder="First name"
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label
                            htmlFor="defaultFormRegisterEmailEx2"
                            className="grey-text"
                        >
                            Password
              </label>
                        <input
                            value={state.password.value}
                            className={state.password.valid ? "form-control is-valid" : "form-control is-invalid"}
                            name="password"
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            id="defaultFormRegisterEmailEx2"
                            placeholder="Last name"
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </MDBCol>

                </MDBRow>

                <MDBBtn color="primary" type="submit">
                    Submit Form
          </MDBBtn>
            </form>
        </div>
    );

}

export default FormsPage;