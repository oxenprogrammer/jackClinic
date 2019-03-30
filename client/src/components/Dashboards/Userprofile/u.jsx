import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBIcon, MDBCardText } from 'mdbreact';
import Sidenav from '../Sidenav/Sidenav';


class Userprofile extends Component {
    state = {

    };


    render() {
        return (
            <React.Fragment>
                <Sidenav />
                <main id="content" className="p-5">


                    <MDBRow className="mb-4">
                        <MDBCol md="9" className="mb-r">
                            <MDBCard className="cascading-admin-card">
                                <form id="medic-reg">

                                    <div className="grey-text">


                                        <table className="full-width" cellSpacing="0">
                                            <tr>
                                                <td>
                                                    <MDBInput
                                                        label="Your Full Names"
                                                        // icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                        className="full-width"
                                                    />
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        label="National ID Number(NIN)"
                                                        icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                        className="full-width"
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <MDBInput
                                                        // label="Date of Birth "
                                                        icon="user"
                                                        group
                                                        type="date"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />

                                                </td>
                                                <td>
                                                    <MDBInput
                                                        label="Your Specialization"
                                                        icon="envelope"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <MDBInput
                                                        label="Postal Address"
                                                        icon="exclamation-triangle"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        label="City / District "
                                                        icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <MDBInput
                                                        label="Phone Number"
                                                        icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        label="Your Price Rate"
                                                        icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <MDBInput
                                                        label="Your password"
                                                        icon="lock"
                                                        group
                                                        type="password"
                                                        validate
                                                    />
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        label="Confirm password"
                                                        icon="lock"
                                                        group
                                                        type="password"
                                                        validate
                                                    />
                                                </td>
                                            </tr>
                                        </table>



                                    </div>
                                    <div className="text-center">
                                        <MDBBtn color="primary">Register</MDBBtn>
                                    </div>
                                </form>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>


                    <div className="">

                    </div>
                </main>
            </React.Fragment>
        );
    }
}
export default Userprofile;


