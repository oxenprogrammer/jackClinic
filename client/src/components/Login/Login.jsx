import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import { Formik } from "formik";
import * as Yup from "yup"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './Login.css';
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

    phone: Yup.string("Enter your phone number")
        .required("Phone number is required"),
    password: Yup.string("Enter your password")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password")
});



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    login(data) {
        var req = unirest("POST", addr + "/api/auth");

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
        

            if (res.error){
                Toast.fire({
                    type: 'error',
                    title: 'Phone number and password error'
                  })
            } else{
                // console.log(res.body);
                
                sessionStorage.removeItem('userid')
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('usertoken')
                sessionStorage.setItem('userid', res.body.id)
                sessionStorage.setItem('username', res.body.username)
                sessionStorage.setItem('usertoken', res.body.access_token)
                Toast.fire({
                    type: 'success',
                    title: 'Signed in successfully'
                  })
                  setTimeout(() => {
                    window.location.href="/"
                  }, 3000);

            }

            // console.log(res.body);
        });

    }

    render() {
        const values = { phone: "", password: "" };
        return (
            <div>
                <div className="center_div">

                    <div className="absolute-center is-responsive text-center">
                        <h1 >Login</h1>

                        <Formik
                            render={props => <Form {...props} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={this.login}
                        />

                    </div>

                </div>
            </div>
        );
    }
}


const Form = (props) => {
    const {
        values: { phone, password },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        handleBlur
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form id="medicRegistration" onSubmit={props.handleSubmit} autoComplete="off">

            <div className="grey-text">


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

                </MDBRow>

            </div>
            <div className="text-center">
                {/* <MDBBtn color="primary" type="submit" >Register</MDBBtn> */}
                <button disabled={!isValid} className="btn btn-primary">Login</button>
            </div>
        </form>


    )
}

export default Login;

