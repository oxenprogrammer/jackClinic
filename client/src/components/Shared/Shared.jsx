import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import './Shared.css'


var unirest = require("unirest");


var server = require('../../config.json');

let addr = server.live_server;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    addr = server.local_server;
} else {
    // production code
    addr = server.live_server;

}

const token = window.sessionStorage.getItem('usertoken')

export class Shared extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Footer />
            </div>
        )
    }
}





class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            isMedic: false,
            profileLink: '',
            dashboardLink: ''
        }
        this.logout = this.logout.bind(this);
    }


    getMyDetails() {
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
                let obj = res.body
                if(typeof obj != "undefined" && obj.hasOwnProperty('priceRate')){
                    console.log("i am a doctor");
                    thisApp.setState({
                        isMedic: true, 
                        profileLink: '/profile',
                        dashboardLink: '/medic'
                     })
                }    
                 else{
                    console.log("i am a patient");
                    thisApp.setState({
                        isMedic: false,
                        profileLink: '/myclientprofile',
                        dashboardLink: '/client'
                     })
                }
            }

        });

    }


    verifyLogin() {
        const thisApp = this

        var req = unirest("GET", addr + "/api/auth/verify");

        req.headers({
            "cache-control": "no-cache",
            "x-auth-token": token
        });


        req.end(function (res) {
            if (res.error) console.log(res.error);
            if (res.status != 200) {
                thisApp.setState({
                    isLoggedin: false
                }, () => console.log(thisApp.state))
            } 
            
            else {
                thisApp.setState({
                    isLoggedin: true
                }, () => console.log(thisApp.state))
            }

            console.log(res.body);
        });

    }

    logout(){
        this.setState({isLoggedin: false})
        sessionStorage.clear()
        window.location.href="/"
    }

    componentDidMount() {
        this.verifyLogin();
        this.getMyDetails()
        
    }




    render() {

        const isLoggedin = this.state.isLoggedin;
        const profileLink = this.state.profileLink;
        const dashboardLink = this.state.dashboardLink;
        const username = window.sessionStorage.getItem('username')
        let account;
        let dashboard;


        if (isLoggedin) {
            // account = <React.Fragment><Nav.Link href="#">Hi {username} <i class="fa fa-user-circle-o" aria-hidden="true"></i></Nav.Link></React.Fragment>
            // account = <React.Fragment><Nav.Link href="#">Hi {username} <i class="fa fa-user-circle-o" aria-hidden="true"></i></Nav.Link></React.Fragment>
            account = <React.Fragment><NavDropdown title={username} id="collasible-nav-dropdown">
                <NavDropdown.Item href= {profileLink} ><i class="fa fa-user-circle-o" aria-hidden="true"></i>  My Profile</NavDropdown.Item>
                <NavDropdown.Item id="logout" onClick={this.logout} ><i class="fa fa-sign-out" aria-hidden="true"></i>  Logout</NavDropdown.Item>

            </NavDropdown></React.Fragment>
            dashboard = <React.Fragment> <Nav.Link href= {dashboardLink} >Dashboard</Nav.Link> </React.Fragment>

        } else {
            account = <React.Fragment><Nav.Link href="/signup">Sign up</Nav.Link> <Nav.Link href="/login">Sign in</Nav.Link></React.Fragment>
            dashboard = ''
        }

        return (
            <div>


                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <div className="container">
                        <Navbar.Brand href="/">MUSAWO</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                            </Nav>
                            <Nav className="account">
                                <Nav.Link href="">About Us</Nav.Link>
                                {/* <Nav.Link href="/signup">Sign Up</Nav.Link>
                                <Nav.Link href="/login">Log In</Nav.Link> */}
                                {/* <Nav.Link>{account}</Nav.Link> */}
                                {dashboard}
                                {account}
                                {/* <NavDropdown title={account} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="">Logout</NavDropdown.Item>
                                
                            </NavDropdown> */}
                            </Nav>

                        </Navbar.Collapse>
                    </div>
                </Navbar>

            </div>
        );
    }
}


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <React.Fragment>

                <footer>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 footer-col">
                                <h5>Support</h5>
                                <div><a href="#">Terms of use</a></div>
                                <div><a href="#">Privacy policy</a></div>
                                <div><a href="#">Contact</a></div>
                                <div><a href="#">FAQs</a></div>
                            </div>
                            <div className="col-md-3 footer-col">
                                <h5>Company</h5>
                                <div><a href="#">About Us</a></div>
                                <div><a href="#">Support</a></div>
                                <div><a href="#">Con</a></div>
                                <div><a href="#">FAQs</a></div>
                            </div>
                            <div className="col-md-3 footer-col">
                                <h5>Users</h5>
                                <div><a href="#">Terms of use</a></div>
                                <div><a href="#">Privacy policy</a></div>
                                <div><a href="#">Contact</a></div>
                                <div><a href="#">FAQs</a></div>
                            </div>
                            <div className="col-md-3 footer-col">
                                <h5>Social Media</h5>
                                <div>
                                    <div className="social">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </div>
                                    <div className="social">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="social">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </div>
                                    <div className="social">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}






// export default Shared;
export { Footer, Navigation };
