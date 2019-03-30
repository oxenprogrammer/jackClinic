import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import Sidenav from '../Sidenav/Sidenav';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';






class MedicDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false
        }
    }



    handleChange = name => e => {
        this.setState({ [name]: e.target.checked })
    }


    render() {
        return (
            <React.Fragment>
                {/* <Topnav/> */}
                {/* <Sidenav /> */}
                {/* <div className="container"> */}
                {/* <div className="row"> */}
                {/* <div className="col-md-12"> */}
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
                        {/* <MDBCol xl="3" md="6" className="mb-r">
                                    <MDBCard className="cascading-admin-card">
                                        <div className="admin-up">
                                            <MDBIcon icon="chart-bar" className="red accent-2" />
                                            <div className="data">
                                                <p>ORGANIC TRAFFIC</p>
                                                <h4>
                                                    <strong>2000</strong>
                                                </h4>
                                            </div>
                                        </div>
                                        <MDBCardBody>
                                            <div className="progress">
                                                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: '25%' }}></div>
                                            </div>
                                            <MDBCardText>Better than last week (25%)</MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol> */}
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

                                    {/* <input type="checkbox" class="custom-control-input" id="customSwitch1" />
                                    <label class="custom-control-label" for="customSwitch1">Toggle Availability</label> */}
                                </div>



                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </main>


                {/* </div> */}
                {/* </div> */}
                {/* </div> */}

            </React.Fragment>
        );
    }
}

export default MedicDashboard;