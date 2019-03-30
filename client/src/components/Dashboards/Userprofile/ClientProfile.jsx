import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBIcon, MDBCardText } from 'mdbreact';
import Sidenav from '../Sidenav/Sidenav';
import './Userprofile.css';



class Userprofile extends Component {
    state = {

    };


    render() {
        return (
            <React.Fragment>
                <Sidenav />
                <main id="content" className="p-5">

                    <h3>Update Profile</h3>
                    <h6>Complete your profile</h6>
                    <form id="medic-reg">
                    <MDBRow className="mb-4">
                        <MDBCol md="8" className="mb-r">
                            <MDBCard className="cascading-admin-card">
                                

                                    <div className="grey-text">


                                        <MDBRow>
                                            <MDBCol>
                                            <MDBInput
                                                        label="Full Names"
                                                        icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                        className="full-width"
                                                    />
                                            </MDBCol>
                                            
                                        </MDBRow>

                                        <MDBRow>
                                            
                                            <MDBCol>
                                            <MDBInput
                                                        label="Specialization"
                                                        icon="user-md"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput
                                                label="Your Price Rate"
                                                        icon="dollar-sign"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                />
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow>
                                            <MDBCol>
                                            <MDBInput
                                                        label="Phone Number"
                                                        icon="phone"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                            </MDBCol>
                                            <MDBCol>
                                            <MDBInput
                                                        label="City / District "
                                                        icon="location-arrow"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                            </MDBCol>
                                            
                                        </MDBRow>


                                        <MDBRow>
                                            <MDBCol>
                                            <MDBInput
                                                        label="Postal Address"
                                                        icon="map-marker"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                            </MDBCol>
                                            
                                        </MDBRow>

                                        <MDBRow>
                                        <MDBCol>
                                            <MDBInput
                                                        label="My Biography"
                                                        icon="info-circle"
                                                        group
                                                        type="textarea"
                                                        validate
                                                    />
                                            </MDBCol>
                                        </MDBRow>


                                    </div>
                                    <div className="">
                                        <MDBBtn color="primary">Update Profile</MDBBtn>
                                    </div>
                                
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md="4" className="mb-r">
                            <MDBCard className="cascading-admin-card">
                                
                                <div className="photo pt-2">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSki5bL19vA6cPTUaeqrmW1QJS0tIGnX-m6bDieIZpZMjB16r3lYw" alt=""/>
                                </div>
                                <div className="user-content">
                                    <div className="user">
                                        <h6>Founder</h6>
                                        <h4>Dr. Kazim-Kazim Richards</h4>
                                        <hr/>
                                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam vel doloribus iure, voluptates odit </p>
                                        <button className="btn btn-primary">Follow</button>
                                    </div>
                                </div>
                            </MDBCard>
                        </MDBCol>

                    </MDBRow>
                    </form>


                    
                    
                </main>
            </React.Fragment>
        );
    }
}
export default Userprofile;


