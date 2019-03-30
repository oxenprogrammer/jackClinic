import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBIcon, MDBCardText } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import SidenavClient from '../Sidenav/SidenavClient';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './Userprofile.css';

var unirest = require("unirest");

var server = require('../../../config.json');



let addr = server.live_server;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    addr = server.local_server;
} else {
    // production code
    addr = server.live_server;

}

const token = window.sessionStorage.getItem('usertoken');


class ClientProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phone: '',
            location: '',
            city: ''
        }
        this.getMyDetails = this.getMyDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.submit = this.submit.bind(this);
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    getMyDetails() {
        const thisApp = this;

        var req = unirest("GET", addr + "/api/patients/me");

        req.headers({
            "cache-control": "no-cache",
            "x-auth-token": token
        });


        req.end(function (res) {
            if (res.error) {
                console.log(res.error);
            }
            else {
                console.log(res.body);
                thisApp.setState(res.body)

            }

        });

    }

    submit(e){
        const thisApp = this;
        e.preventDefault()
        thisApp.updateProfile(thisApp.state)
    }


    updateProfile(data) {
        
        var req = unirest("POST", addr +  "/api/patients/me");

        req.headers({
            "cache-control": "no-cache",
            "x-auth-token": token,
            "Content-Type": "application/json"
        });

        req.type("json");
        req.send(data);

        req.end(function (res) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
        
            if (res.error){
                console.log(res.error);
                Toast.fire({
                    type: 'errors',
                    title: 'Profile update failed.'
                  })
                
            } else{
                Toast.fire({
                    type: 'success',
                    title: 'Profile update successfull'
                  })
                //   setTimeout(() => {
                //     window.location.href="/profile"
                //   }, 3000);
                
            }

            console.log(res.body);
        });

    }

    componentDidMount() {
        this.getMyDetails();
        // this.updateProfile()
    }


    render() {
        return (
            <React.Fragment>
                <SidenavClient />
                <main id="content" className="p-5">

                    <h3>Update Profile</h3>
                    
                    <form onSubmit={this.submit} >
                        <MDBRow className="mb-4">
                            <MDBCol md="8" className="mb-r">
                                <MDBCard className="cascading-admin-card">


                                    <div className="grey-text">

                                        <MDBRow className="mb-4">
                                            <MDBCol className="mb-r">
                                                <div>
                                                    <Grid container spacing={8} alignItems="flex-end">
                                                        <Grid item>
                                                            <i class="fa fa-user"></i>
                                                        </Grid>
                                                        <Grid item md={11} >
                                                            <TextField
                                                                id="fullName"
                                                                name="fullName"
                                                                label="Full Names"
                                                                value={this.state.fullName}
                                                                onChange={this.handleChange}

                                                                fullWidth
                                                            />

                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow className="mb-4">
                                           
                                            <MDBCol className="mb-r">
                                                <div>
                                                    <Grid container spacing={8} alignItems="flex-end">
                                                        <Grid item>
                                                            <i class="fa fa-phone"></i>
                                                        </Grid>
                                                        <Grid item md={10} >
                                                            <TextField

                                                                name="phone"
                                                                id="phone"
                                                                label="Phone Number"
                                                                onChange={this.handleChange}

                                                                value={this.state.phone}
                                                                fullWidth />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow className="mb-4">
                                            <MDBCol className="mb-r">

                                                <div>
                                                    <Grid container spacing={8} alignItems="flex-end">
                                                        <Grid item>
                                                            <i class="fa fa-map-marker"></i>
                                                        </Grid>
                                                        <Grid item md={11} >
                                                            <TextField

                                                                name="location"
                                                                id="location"
                                                                label="Postal Address "
                                                                onChange={this.handleChange}

                                                                value={this.state.location}
                                                                fullWidth />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow className="mb-4">

                                            <MDBCol className="mb-r">

                                                <div>
                                                    <Grid container spacing={8} alignItems="flex-end">
                                                        <Grid item>
                                                            <i class="fa fa-location-arrow"></i>
                                                        </Grid>
                                                        <Grid item md={10} >
                                                            <TextField

                                                                name="city"
                                                                id="city"
                                                                label="Town / City / District"
                                                                onChange={this.handleChange}

                                                                value={this.state.city}
                                                                fullWidth />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </MDBCol>

                                           
                                        </MDBRow>

                                      

                                    </div>


                                    <div className="">
                                        <MDBBtn type="submit" color="primary">Update Profile</MDBBtn>
                                    </div>

                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="4" className="mb-r">
                                <MDBCard className="cascading-admin-card">

                                    <div className="photo pt-2">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSki5bL19vA6cPTUaeqrmW1QJS0tIGnX-m6bDieIZpZMjB16r3lYw" alt="" />
                                    </div>
                                    <div className="user-content">
                                        <div className="user">
                                            <h6>{this.state.specialization}</h6>
                                            <h4>{this.state.fullName} </h4>
                                            <span> <h6> <i class="fa fa-phone"></i>{this.state.phone}
                                                <i class="fa fa-map-marker"></i> {this.state.location} </h6> </span>

                                            <hr />
                                            <p> {this.state.biography} </p>
                                            {/* <button className="btn btn-primary">Follow</button> */}
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
export default ClientProfile;


