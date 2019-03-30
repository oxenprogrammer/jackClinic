import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import SidenavClient from '../Sidenav/Sidenav';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBMedia } from "mdbreact";

import './ClientDashboard.css';
var Rating = require('react-rating');



class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    


    


    render() {



        return (
            <React.Fragment>
                {/* <Topnav/> */}
                {/* <Sidenav /> */}
                {/* <div className="container"> */}
                {/* <div className="row"> */}
                {/* <div className="col-md-12"> */}
                <SidenavClient />

                <main id="content" className="p-5">

                    <MDBRow>
                        <MDBCol xl="7" md="6">
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
                                    {/* <Rating /> */}

                                </MDBListGroupItem>
                            </MDBListGroup>
                            {/* </MDBContainer> */}
                            {/* </MDBCard> */}

                        </MDBCol>

                        <MDBCol xl="5" md="6">
                            <h3>Medics Available for you</h3>
                            <MDBCard className="cascading-admin-card">

                                <MDBMedia list className="mt-3">
                                    <MDBMedia tag="li" className="available-medic">
                                        <MDBMedia left href="#">
                                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder7.jpg" alt="Generic placeholder image" />
                                        </MDBMedia>
                                        <MDBMedia body>
                                            <MDBMedia >
                                                <h5>Dr. Menton Krono</h5>
                                            </MDBMedia>
                                            Cras sit amet nibh libero, in gravida nullailla. Donec lacinia congue felis in faucibus.
                                        </MDBMedia>
                                    </MDBMedia>
                                    <MDBMedia tag="li" className="available-medic">
                                        <MDBMedia left href="#">
                                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder6.jpg" alt="Generic placeholder image" />
                                        </MDBMedia>
                                        <MDBMedia body>
                                            <MDBMedia >
                                                <h5>Dr. Shaba Ranks</h5>
                                            </MDBMedia>
                                            Cras sit amet nibh libero, in gravida nullailla. Donec lacinia congue felis in faucibus.
                                        </MDBMedia>
                                    </MDBMedia>
                                    <MDBMedia tag="li" className="available-medic">
                                        <MDBMedia left href="#">
                                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder5.jpg" alt="Generic placeholder image" />
                                        </MDBMedia>
                                        <MDBMedia body>
                                            <MDBMedia>
                                                <h5>Dr. Chaka Demus</h5>
                                            </MDBMedia>
                                            Cras sit amet nibh libero, in gravida nullailla. Donec lacinia congue felis in faucibus.
                                         </MDBMedia>
                                    </MDBMedia>
                                    <MDBMedia tag="li" className="available-medic">
                                        <MDBMedia left href="#">
                                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder5.jpg" alt="Generic placeholder image" />
                                        </MDBMedia>
                                        <MDBMedia body>
                                            <MDBMedia>
                                                <h5>Dr. Buju Banton</h5>
                                            </MDBMedia>
                                            Cras sit amet nibh libero, in gravida nullailla. Donec lacinia congue felis in faucibus.
                                         </MDBMedia>
                                    </MDBMedia>
                                </MDBMedia>




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

export default ClientDashboard;