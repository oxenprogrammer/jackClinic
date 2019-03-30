import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <MDBContainer className="center_div">
                    
                        <div className="absolute-center is-responsive">
                      
                            <form id="loginform">
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Enter your phone number"
                                        icon="phone"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Enter your password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn>Login</MDBBtn>
                                </div>
                            </form>

                        </div>

                </MDBContainer>
            </div>
        );
    }
}

export default Login;

