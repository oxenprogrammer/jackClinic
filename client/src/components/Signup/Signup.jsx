import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import './Signup.css';
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



const validationSchema = Yup.object({
    fullName: Yup.string("Enter your full names")
        .required("Full Names is required"),
    specialization: Yup.string("Enter your specialization")
        .required("Email is required"),
    phone: Yup.string("Enter your phone number")
        .required("Phone number is required"),
    postalAddress: Yup.string("Enter your Postal address")
        .required("Postal address is required"),
    city: Yup.string("Enter your city or district")
        .required("City or district is required"),
    priceRate: Yup.string("Enter your price rate")
        .required("Price rate is required"),
    password: Yup.string("Enter your password")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password"),
    confirmPassword: Yup.string("Enter your password")
        .required("Confirm your password")
        .oneOf([Yup.ref("password")], "Password does not match")
});

const validationSchema1 = Yup.object({
    fullName: Yup.string("Enter your full names")
        .required("Full Names is required"),
    phone: Yup.string("Enter your phone number")
        .required("Phone number is required"),
    location: Yup.string("Enter your Postal address")
        .required("Postal address is required"),
    city: Yup.string("Enter your city or district")
        .required("City or district is required"),
    password: Yup.string("Enter your password")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password"),
    confirmPassword: Yup.string("Enter your password")
        .required("Confirm your password")
        .oneOf([Yup.ref("password")], "Password does not match")
});


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

  submitMedic = ({fullName, specialization, phone, city, postalAddress, priceRate, password }) => {
    this.registerMedic({ fullName, specialization, phone, city, postalAddress, priceRate, password })
    console.log({ fullName, specialization, phone, city, postalAddress, priceRate, password });
  };


  submitClient = ({fullName, phone, city, location, password }) => {
    this.registerClient({ fullName, phone, city, location, password })
    console.log({ fullName, phone, city, location, password });
  };


    registerMedic(data) {

        var req = unirest("POST", addr + "/api/doctors");

        req.headers({
            "cache-control": "no-cache",
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
        
            if (res.error) {
                console.log(res.error);
                
                Toast.fire({
                    type: 'errors',
                    title: 'Phone number exists'
                  })
            }
            else{      
                  Toast.fire({
                    type: 'success',
                    title: 'Registered successfully'
                  })
                  setTimeout(() => {
                    window.location.href="/login"
                  }, 3000);
                
            }       

        });

    }


    registerClient(data) {

        var req = unirest("POST", addr + "/api/patients");

        req.headers({
            "cache-control": "no-cache",
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
        
            if (res.error) {
                Toast.fire({
                    type: 'error',
                    title: 'Phone number exists'
                  })
            }
            else{      
                  Toast.fire({
                    type: 'success',
                    title: 'Registered successfully'
                  })
                  setTimeout(() => {
                    window.location.href="/login"
                  }, 3000);
                
            }       

        });

    }


    
    render() {
        const classes = this.props;
        const values = { fullName: "", specialization: "", phone: "", city: "", postalAddress: "", priceRate: "", confirmPassword: "", password: "" };
        
        return (
            <React.Fragment>
               

                <div className="main">

                    <div className="container">
                        <h2 className="text-center mt-0">Choose who you are here</h2>
                        <hr className="divider my-4" />
                        <div className="row">
                            <div className="col-md-6 ">
                                <Formik
                                    render={props => <Form1 {...props} />}
                                    initialValues={values}
                                    validationSchema={validationSchema}
                                    onSubmit={this.submitMedic}
                                />
                            </div>
                            <div className="col-md-6 ">
                                <Formik
                                    render={props => <Form2 {...props} />}
                                    initialValues={values}
                                    validationSchema={validationSchema1}
                                    onSubmit={this.submitClient}
                                />
                            </div>

                        </div>
                    </div>
                </div>



            </React.Fragment>
        );
    }
}




class Form1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
        }
    }


    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]

        });
    }

   

    render() {
        const {
            values: { fullName, specialization, phone, city, postalAddress, priceRate, password, confirmPassword },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleBlur
        } = this.props;

        const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false);
        };

        return (
            <React.Fragment>

                <div className="mt-5">
                    <i className="fa fa-user-md text-primary mb-4"></i>
                    <h3 className="h4 mb-2">Medical Personel</h3>
                    <p className="text-muted mb-0">Register here as a practioner</p>
                    <MDBBtn color="info" onClick={this.toggle(1)}>Register here</MDBBtn>

                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg"  >
                        <MDBModalHeader toggle={this.toggle(1)}>Sign Up as a Medic here.</MDBModalHeader>
                        <MDBModalBody>

                            <form id="medicRegistration" onSubmit={this.props.handleSubmit} autoComplete="off">

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
                                                            helperText={touched.fullName ? errors.fullName : ""}
                                                            error={touched.fullName && Boolean(errors.fullName)}
                                                            label="Full Names"
                                                            value={fullName}
                                                            onChange={change.bind(null, "fullName")}
                                                            onBlur={handleBlur}
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
                                                        <i class="fa fa-user-md"></i>
                                                    </Grid>
                                                    <Grid item md={10} >
                                                        <TextField
                                                            id="specialization"
                                                            name="specialization"
                                                            helperText={touched.specialization ? errors.specialization : ""}
                                                            error={touched.specialization && Boolean(errors.specialization)}
                                                            label="Your Specialization"
                                                            onChange={change.bind(null, "specialization")}
                                                            onBlur={handleBlur}
                                                            value={specialization}
                                                            fullWidth />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </MDBCol>
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
                                                            helperText={touched.phone ? errors.phone : ""}
                                                            error={touched.phone && Boolean(errors.phone)}
                                                            label="Phone Number"
                                                            onChange={change.bind(null, "phone")}
                                                            onBlur={handleBlur}
                                                            value={phone}
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

                                                            name="postalAddress"
                                                            id="postalAddress"
                                                            helperText={touched.postalAddress ? errors.postalAddress : ""}
                                                            error={touched.postalAddress && Boolean(errors.postalAddress)}
                                                            label="Postal Address "
                                                            onChange={change.bind(null, "postalAddress")}
                                                            onBlur={handleBlur}
                                                            value={postalAddress}
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
                                                            helperText={touched.city ? errors.city : ""}
                                                            error={touched.city && Boolean(errors.city)}
                                                            label="Town / City / District"
                                                            onChange={change.bind(null, "postalAddress")}
                                                            onBlur={handleBlur}
                                                            value={city}
                                                            fullWidth />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </MDBCol>

                                        <MDBCol>
                                            <div>
                                                <Grid container spacing={8} alignItems="flex-end">
                                                    <Grid item>
                                                        <i class="fa fa-dollar-sign"></i>
                                                    </Grid>
                                                    <Grid item md={10} >
                                                        <TextField

                                                            name="priceRate"
                                                            id="priceRate"
                                                            helperText={touched.priceRate ? errors.priceRate : ""}
                                                            error={touched.priceRate && Boolean(errors.priceRate)}
                                                            label="Your Price Rate"
                                                            onChange={change.bind(null, "priceRate")}
                                                            onBlur={handleBlur}
                                                            value={priceRate}
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
                                                        <i class="fa fa-lock"></i>
                                                    </Grid>
                                                    <Grid item md={10} >
                                                        <TextField

                                                            name="password"
                                                            type="password"
                                                            id="password"
                                                            helperText={touched.password ? errors.password : ""}
                                                            error={touched.password && Boolean(errors.password)}
                                                            label="Your Password"
                                                            onChange={change.bind(null, "password")}
                                                            onBlur={handleBlur}
                                                            value={password}
                                                            fullWidth />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </MDBCol>
                                        <MDBCol className="mb-r">
                                            <div>
                                                <Grid container spacing={8} alignItems="flex-end">
                                                    <Grid item>
                                                        <i class="fa fa-lock"></i>
                                                    </Grid>
                                                    <Grid item md={10} >
                                                        <TextField
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                            label="Confirm Password"
                                                            fullWidth
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={change.bind(null, "confirmPassword")}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>

                                </div>
                                <div className="text-center">
                                    {/* <MDBBtn color="primary" type="submit" >Register</MDBBtn> */}
                                    <button disabled={!isValid} onClick={this.toggle(1)} className="btn btn-primary">Register</button>
                                </div>
                            </form>


                        </MDBModalBody>

                    </MDBModal>
                </div>

            </React.Fragment>
        );
    }
}


class Form2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modal1: false,
            modal2: false,
        }
    }


    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]

        });
    }


    render() {
        const {
            values: { fullName, phone, city, location, password, confirmPassword },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
            handleBlur
        } = this.props;

        const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false);
        };

        return (
            <React.Fragment>

                <div className="mt-5">
                    <i className="fa fa-wheelchair text-primary mb-4"></i>
                    <h3 className="h4 mb-2">Looking for a doctor</h3>
                    <p className="text-muted mb-0">Register here as a client</p>
                    <MDBBtn color="info" onClick={this.toggle(2)}>Register here</MDBBtn>

                    <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}  >
                        <MDBModalHeader toggle={this.toggle(2)}>Sign Up as a client.</MDBModalHeader>
                        <MDBModalBody>

                            <form id="medicRegistration" onSubmit={this.props.handleSubmit} autoComplete="off">

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
                                                            helperText={touched.fullName ? errors.fullName : ""}
                                                            error={touched.fullName && Boolean(errors.fullName)}
                                                            label="Full Names"
                                                            value={fullName}
                                                            onChange={change.bind(null, "fullName")}
                                                            onBlur={handleBlur}
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
                                                    <Grid item md={11} >
                                                        <TextField

                                                            name="phone"
                                                            id="phone"
                                                            helperText={touched.phone ? errors.phone : ""}
                                                            error={touched.phone && Boolean(errors.phone)}
                                                            label="Phone Number"
                                                            onChange={change.bind(null, "phone")}
                                                            onBlur={handleBlur}
                                                            value={phone}
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
                                                            helperText={touched.location ? errors.location : ""}
                                                            error={touched.location && Boolean(errors.location)}
                                                            label="Location "
                                                            onChange={change.bind(null, "location")}
                                                            onBlur={handleBlur}
                                                            value={location}
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
                                                    <Grid item md={11} >
                                                        <TextField

                                                            name="city"
                                                            id="city"
                                                            helperText={touched.city ? errors.city : ""}
                                                            error={touched.city && Boolean(errors.city)}
                                                            label="Town / City / District"
                                                            onChange={change.bind(null, "postalAddress")}
                                                            onBlur={handleBlur}
                                                            value={city}
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
                                                        <i class="fa fa-lock"></i>
                                                    </Grid>
                                                    <Grid item md={10} >
                                                        <TextField

                                                            name="password"
                                                            type="password"
                                                            id="password"
                                                            helperText={touched.password ? errors.password : ""}
                                                            error={touched.password && Boolean(errors.password)}
                                                            label="Your Password"
                                                            onChange={change.bind(null, "password")}
                                                            onBlur={handleBlur}
                                                            value={password}
                                                            fullWidth />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </MDBCol>
                                        <MDBCol className="mb-r">
                                            <div>
                                                <Grid container spacing={8} alignItems="flex-end">
                                                    <Grid item>
                                                        <i class="fa fa-lock"></i>
                                                    </Grid>
                                                    <Grid item md={10} >
                                                        <TextField
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                            label="Confirm Password"
                                                            fullWidth
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={change.bind(null, "confirmPassword")}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>

                                </div>
                                <div className="text-center">
                                    {/* <MDBBtn color="primary" type="submit" >Register</MDBBtn> */}
                                    <button disabled={!isValid} onClick={this.toggle(2)} className="btn btn-primary">Register</button>
                                </div>
                            </form>


                        </MDBModalBody>

                    </MDBModal>
                </div>
            </React.Fragment>
        );
    }
}


export default Signup;











