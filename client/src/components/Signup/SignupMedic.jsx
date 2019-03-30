// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import './Signup.css';

// class Signup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         return (
//             <div>
//                 <Main />
//             </div>
//         );
//     }
// }

// class Main extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 <div className="main">

//                     <div class="container">
//                         <h2 className="text-center mt-0">Choose who you are here</h2>
//                         <hr className="divider my-4" />
//                         <div className="row">
//                             <div className="col-md-6 text-center">
//                                 <div className="mt-5">
//                                     <i className="fa fa-user-md text-primary mb-4"></i>
//                                     <h3 className="h4 mb-2">Medical Personel</h3>
//                                     <p className="text-muted mb-0">Register here as a practioner</p>
//                                     <Link className="btn btn-primary" to="/medic-signup">Register here</Link>
//                                 </div>
//                             </div>
//                             <div className="col-md-6 text-center">
//                                 <div className="mt-5">
//                                     <i className="fa fa-wheelchair text-primary mb-4"></i>
//                                     <h3 className="h4 mb-2">Looking for a doctor</h3>
//                                     <p className="text-muted mb-0">Register here as a client</p>
//                                     <Link className="btn btn-primary" to="/">Register here</Link>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </React.Fragment>
//         );
//     }
// }



// export default Signup;



import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';


import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Main />
            </div>
        );
    }
}

class Main extends Component {
    state = {
        modal1: false,
        modal2: false
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]

        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">

                    <div class="container">
                        <h2 className="text-center mt-0">Choose who you are here</h2>
                        <hr className="divider my-4" />
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="mt-5">
                                    <i className="fa fa-user-md text-primary mb-4"></i>
                                    <h3 className="h4 mb-2">Medical Personel</h3>
                                    <p className="text-muted mb-0">Register here as a practioner</p>
                                    <MDBBtn color="info" onClick={this.toggle(1)}>Register here</MDBBtn>
                                    {/* MODAL */}
                                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg"  >
                                        <MDBModalHeader toggle={this.toggle(1)}>Sign Up as a Medic here.</MDBModalHeader>
                                        <MDBModalBody>

                                            <form id="medic-reg">

                                                <div className="grey-text">

                                                    <div >
                                                        <MDBInput
                                                            label="Your Full Names"
                                                            icon="user"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />

                                                    </div>
                                                    <div>

                                                        <MDBInput
                                                            label="Your Specialization"
                                                            icon="envelope"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                    </div>
                                                    <div>

                                                        <MDBInput
                                                            label="Town / City / District(Location) "
                                                            icon="user"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                    </div>
                                                    {/* <div>
                                                                <MDBInput
                                                                    label="Phone Number"
                                                                    icon="user"
                                                                    group
                                                                    type="text"
                                                                    validate
                                                                    error="wrong"
                                                                    success="right"
                                                                />
                                                                <MDBInput
                                                                    label="Your Price Rate"
                                                                    icon="user"
                                                                    group
                                                                    type="text"
                                                                    validate
                                                                    error="wrong"
                                                                    success="right"
                                                                />
                                                                </div> */}

                                                    {/* <div>
                                                                <MDBInput
                                                                    label="Your password"
                                                                    icon="lock"
                                                                    group
                                                                    type="password"
                                                                    validate
                                                                />
                                                                <MDBInput
                                                                    label="Confirm password"
                                                                    icon="lock"
                                                                    group
                                                                    type="password"
                                                                    validate
                                                                />
                                                                </div> */}

                                                    <table>
                                                        <tbody>
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
                                                        </tbody>
                                                    </table>

                                                    <table>
                                                        <tbody>
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
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className="text-center">
                                                    <MDBBtn color="primary">Register</MDBBtn>
                                                </div>
                                            </form>


                                        </MDBModalBody>
                                        {/* <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                            <MDBBtn color="primary">Save changes</MDBBtn>
                                        </MDBModalFooter> */}
                                    </MDBModal>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="mt-5">
                                    <i className="fa fa-wheelchair text-primary mb-4"></i>
                                    <h3 className="h4 mb-2">Looking for a doctor</h3>
                                    <p className="text-muted mb-0">Register here as a client</p>
                                    <MDBBtn color="info" onClick={this.toggle(2)}>Register here</MDBBtn>
                                    {/* MODAL */}
                                    <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}  >
                                        <MDBModalHeader toggle={this.toggle(2)}>Sign Up as a client.</MDBModalHeader>
                                        <MDBModalBody>

                                            <form id="medic-reg">

                                                <div className="grey-text">

                                                    <div >
                                                        <MDBInput
                                                            label="Your Full Names"
                                                            icon="user"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />

                                                    </div>
                                                    <div>


                                                        <MDBInput
                                                            label="Town / City / District(Location) "
                                                            icon="user"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                    </div>
                                                    <div>


                                                    </div>
                                                    <div>
                                                        <MDBInput
                                                            label="Phone Number"
                                                            icon="user"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />

                                                    </div>
                                                    <div>
                                                        <MDBInput
                                                            label="Your password"
                                                            icon="lock"
                                                            group
                                                            type="password"
                                                            validate
                                                        />
                                                        <MDBInput
                                                            label="Confirm password"
                                                            icon="lock"
                                                            group
                                                            type="password"
                                                            validate
                                                        />
                                                    </div>

                                                </div>
                                                <div className="text-center">
                                                    <MDBBtn color="primary">Register</MDBBtn>
                                                </div>
                                            </form>


                                        </MDBModalBody>
                                        {/* <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                            <MDBBtn color="primary">Save changes</MDBBtn>
                                        </MDBModalFooter> */}
                                    </MDBModal>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}



export default Signup;