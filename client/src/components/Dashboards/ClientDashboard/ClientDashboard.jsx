import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import SidenavClient from '../Sidenav/SidenavClient';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBMedia } from "mdbreact";

import './ClientDashboard.css';

var unirest = require("unirest");

// var Rating = require('react-rating');

var server = require('../../../config.json');

let addr = server.live_server;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    addr = server.local_server;
} else {
    // production code
    addr = server.live_server;

}

const token = window.sessionStorage.getItem('usertoken')


class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableDoctors: []
        }
        this.getDoctors = this.getDoctors.bind(this);
    }

    getDoctors() {
        const thisApp = this;
        var req = unirest("GET", addr + "/api/doctors/available");

        req.headers({

            "cache-control": "no-cache",
            "x-auth-token": token
        });


        req.end(function (res) {
            if (res.error){
                console.log(res.error);  
            } 
            if(res.status == 200){
                thisApp.setState({
                    availableDoctors: res.body
                }, ()=> console.log(thisApp.state) )
            }

            // console.log(res.body);
        });

    }

    componentDidMount(){
        this.getDoctors();
    }








    render() {

        let available = this.state.availableDoctors;
        let listAvailable = available && available.length > 0 ? 
        (
            available.map((listing) => {
                return(
                    <React.Fragment >
                        <MDBMedia list className="mt-3">
                                    <MDBMedia tag="li" className="available-medic">
                                        <MDBMedia left href="#">
                                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder7.jpg" alt="Generic placeholder image" />
                                        </MDBMedia>
                                        <MDBMedia body>
                                            <MDBMedia >
                                                <h5> {listing.fullName} </h5>
                                                
                                            </MDBMedia>
                                            <h6>{listing.specialization}</h6>
                                            {listing.biography}
                                        </MDBMedia>
                                    </MDBMedia>
                        </MDBMedia>
                    </React.Fragment>
                )
            })
        ) : ("")



        return (
            <React.Fragment>

                <SidenavClient />

                <main id="content" className="p-5">

                    <MDBRow>
                        <MDBCol xl="7" md="6">
                            
                            <h3>Recent Activities</h3>

                            
                            <MDBListGroup >
                                <MDBListGroupItem hover href="#">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small>3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
                                    <small className="text-muted">
                                        Rate your medic
                                    </small>
                                </MDBListGroupItem>
                                <MDBListGroupItem hover href="#">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-muted">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
                                    <small className="text-muted">
                                        Rate your medic
                                    </small>
                                </MDBListGroupItem>
                                <MDBListGroupItem hover href="#">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-muted">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
                                    <small className="text-muted">
                                        Rate your medic
                                    </small>
                                   

                                </MDBListGroupItem>
                            </MDBListGroup>
                            
                        </MDBCol>

                        <MDBCol xl="5" md="6">
                            <h3>Medics Available for you</h3>
                            <MDBCard className="cascading-admin-card">

                                {listAvailable}

                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </main>

            </React.Fragment>
        );
    }
}

export default ClientDashboard;