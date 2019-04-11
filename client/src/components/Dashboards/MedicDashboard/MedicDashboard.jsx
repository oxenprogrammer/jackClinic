import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import Sidenav from '../Sidenav/Sidenav';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText, Alert } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularIntegration from './Available';






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

const token = window.sessionStorage.getItem('usertoken')





class MedicDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.toggleAvailability = this.toggleAvailability.bind(this);
        this.getAvailabity = this.getAvailabity.bind(this);
        // this.showAlert = this.showAlert.bind(this)
    }



    handleChange = name => e => {
        this.setState({ [name]: e.target.checked })
    }

    onToggle(e) {
        const thisApp = this;
        e.preventDefault();
        thisApp.toggleAvailability(thisApp.state)
    }


    toggleAvailability(data) {
        var req = unirest("POST", addr + "/api/doctors/my-availability");
        req.headers({

            "cache-control": "no-cache",
            "Content-Type": "application/json",
            "x-auth-token": token
        });

        req.type("json");
        req.send(data);

        req.end(function (res) {
            if (res.error) {
                console.log(res.error);
            }

            console.log(res.body);

        });

    }

    getAvailabity() {
        const thisApp = this;
        var req = unirest("GET", addr + "/api/doctors/me");

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
                // thisApp.setState(res.body)
                thisApp.setState({ isAvailable: res.body.isAvailable })
            }
        });
    }

    componentDidMount() {
        const thisApp = this;
        thisApp.getAvailabity();
    }
    // showAlert(){
    //     window.alert("i am working")
    // }


    render() {
        return (
            <React.Fragment>

                <Sidenav />

                <main id="content" className="p-5">
                    <MDBRow className="mb-4">
                        <MDBCol xl="4" md="6" className="mb-r">
                            <MDBCard className="cascading-admin-card">
                                <div className="admin-up">
                                    <MDBIcon icon="chart-bar" className="primary-color" />
                                    <div className="data">
                                        <p>Requests accepted</p>
                                        <h4>
                                            <strong>$2000</strong>
                                        </h4>
                                    </div>
                                </div>
                                <MDBCardBody>
                                    <div class="footer">
                                        <hr />
                                        <div class="card-stat">
                                            <i class="fas fa-sync-alt"></i> Events from Nov-2018
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol xl="4" md="6" className="mb-r">
                            <MDBCard className="cascading-admin-card">
                                <div className="admin-up">
                                    <MDBIcon icon="chart-line" className="warning-color" />
                                    <div className="data">
                                        <p>Requests declined</p>
                                        <h4>
                                            <strong>200</strong>
                                        </h4>
                                    </div>
                                </div>
                                <MDBCardBody>
                                    <div class="footer">
                                        <hr />
                                        <div class="card-stat">
                                            <i class="fas fa-sync-alt"></i> Events from Nov-2018
                                        </div>
                                    </div>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol xl="4" md="6" className="mb-r">
                            <MDBCard className="cascading-admin-card">
                                <div className="admin-up">
                                    <MDBIcon icon="chart-pie" className="light-blue lighten-1" />
                                    <div className="data">
                                        <p>Successful Follow-ups</p>
                                        <h4>
                                            <strong>20000</strong>
                                        </h4>
                                    </div>
                                </div>
                                <MDBCardBody>
                                    <div class="footer">
                                        <hr />
                                        <div class="card-stat">
                                            <i class="fas fa-sync-alt"></i> Events from Nov-2018
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                    </MDBRow>

                    <MDBRow>
                        <MDBCol xl="8" md="6">
                            {/* <MDBCard className="cascading-admin-card"> */}
                            <h3>Recent Activities</h3>

                            {/* <MDBContainer> */}
                            <MDBListGroup >
                                <MDBListGroupItem hover href="#">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small>3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
                                    <small>Donec id elit non mi porta.</small>
                                </MDBListGroupItem>
                                <MDBListGroupItem hover href="#">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-muted">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
                                    <small className="text-muted">Donec id elit non mi porta.</small>
                                </MDBListGroupItem>
                                <MDBListGroupItem hover href="#">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-muted">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</p>
                                    <small className="text-muted">Donec id elit non mi porta.</small>
                                </MDBListGroupItem>
                            </MDBListGroup>
                            {/* </MDBContainer> */}
                            {/* </MDBCard> */}

                        </MDBCol>

                        <MDBCol xl="4" md="6">
                            <MDBCard className="cascading-admin-card">
                                <h3>Toggle Availability</h3>
                                <div class="custom-control custom-switch">
                                    <form onSubmit={this.onToggle} >
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.isAvailable}
                                                        onChange={this.handleChange('isAvailable')}
                                                        value="isAvailable"

                                                    />
                                                }
                                                label="Available"
                                            />

                                        </FormGroup>
                                        <button className="btn btn-primary" type="submit">Update Availability</button>
                                        
                                        

                                        

                                    </form>

                                </div>


                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </main>


            </React.Fragment>
        );
    }
}




export default MedicDashboard;