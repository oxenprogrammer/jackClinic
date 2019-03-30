import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom';
import './Signup.css';
import debounce from 'lodash.debounce';
import {singleFieldValidation, allFieldsValidation} from "../../utils/validation";
import FormHelperText from '@material-ui/core/FormHelperText';
// import server from '../../config.json'
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

const waitTime = 500;

const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit*2,
        // marginRight: theme.spacing.unit*2,
        // width: 200,
    },
    dense: {
        // marginTop: 19,
    },
    menu: {
        // width: 200,
    },
});



class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,

            formValues: {
                fullName: '',
                specialization: '',
                phone: '',
                postalAddress: '',
                city: '',
                priceRate: '',
                password: '',
                // password2: ''
            },
            password2: '',

            formErrors: {},
            formIsValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerMedic = this.registerMedic.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeP2 = this.handleChangeP2.bind(this);
       

    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]

        });
    }

    handleChange(e) {
        
        const {name, value} = e.target;
        const {formValues} = this.state;
        formValues[name] = value;
        this.setState({formValues})
        this.debounceSingleFieldValidation({name, value});
        // this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeP2(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    

    handleSubmit(e){
        const thisApp = this
        let password = thisApp.state.formValues.password
        e.preventDefault();
        const {isValid, errors} = allFieldsValidation(this.state.formValues);
        if (!isValid || password != thisApp.state.password2) {
            this.setState({formErrors: errors});
        } else {
            // alert('No error, form can now submit....');
            thisApp.setState({formErrors: {}});
            thisApp.registerMedic(thisApp.state.formValues)
            
            
  }
        
    }

    debounceSingleFieldValidation = debounce(({name, value}) => {
        const {formErrors} = this.state;
        const {isValid, errors} = singleFieldValidation({key: name, value});
        if (!isValid) {
          this.setState({formErrors: {...formErrors, [name]: errors[name]}});
        } else {
          this.setState({formErrors: {...formErrors, [name]: null}});
        }
      }, waitTime);




    registerMedic(data) {

        var req = unirest("POST", addr + "/api/doctors");

        req.headers({
            "cache-control": "no-cache",
            "Content-Type": "application/json"
        });

        req.type("json");
        
        req.send(data);

        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            // console.log(res.body);
            else{
                alert('Account successfully registered');
                window.location.href="/login"
            }       

        });

    }

    render() {

        const { formValues, formErrors } = this.state;
        const {fullName, specialization, phone, postalAddress, city, priceRate, password} = formValues;
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className="main">

                    <div className="container">
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

                                            <form id="medicRegistration" onSubmit={this.handleSubmit} noValidate autoComplete="off">

                                                <div className="grey-text">

                                                    <MDBRow className="mb-4">
                                                        <MDBCol className="mb-r">
                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-user"></i>
                                                                    </Grid>
                                                                    <Grid item md={11} >
                                                                        <TextField
                                                                            error={ formErrors['fullName'] }
                                                                            name="fullName"
                                                                            id="fullName"
                                                                            label="Your Full Names"
                                                                            onChange={this.handleChange}
                                                                            value={fullName} required
                                                                            fullWidth />
                                                                        {/* <FormHelperText error id="component-error-text">{ formErrors['fullName'] }</FormHelperText> */}

                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="mb-4">
                                                        <MDBCol className="mb-r">
                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-user-md"></i>
                                                                    </Grid>
                                                                    <Grid item md={10} >
                                                                        <TextField
                                                                            error={ formErrors['specialization'] }
                                                                            name="specialization"
                                                                            id="specialization"
                                                                            label="Your Specialization"
                                                                            onChange={this.handleChange}
                                                                            value={specialization}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                        <MDBCol className="mb-r">
                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-phone"></i>
                                                                    </Grid>
                                                                    <Grid item md={10} >
                                                                        <TextField
                                                                            error={ formErrors['phone'] }
                                                                            name="phone"
                                                                            id="phone"
                                                                            label="Phone Number"
                                                                            onChange={this.handleChange}
                                                                            value={phone}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="mb-4">
                                                        <MDBCol className="mb-r">

                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-map-marker"></i>
                                                                    </Grid>
                                                                    <Grid item md={11} >
                                                                        <TextField
                                                                            error={ formErrors['postalAddress'] }
                                                                            
                                                                            name="postalAddress"
                                                                            id="postalAddress"
                                                                            label="Postal Address "
                                                                            onChange={this.handleChange}
                                                                            value={postalAddress}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="mb-4">

                                                        <MDBCol className="mb-r">

                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-location-arrow"></i>
                                                                    </Grid>
                                                                    <Grid item md={10} >
                                                                        <TextField
                                                                            error={ formErrors['city'] }
                                                                            name="city"
                                                                            id="city"
                                                                            label="Town / City / District"
                                                                            onChange={this.handleChange}
                                                                            value={city}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>

                                                        <MDBCol>
                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-dollar-sign"></i>
                                                                    </Grid>
                                                                    <Grid item md={10} >
                                                                        <TextField
                                                                            error={ formErrors['priceRate'] }
                                                                            name="priceRate"
                                                                            id="priceRate"
                                                                            label="Your Price Rate"
                                                                            onChange={this.handleChange}
                                                                            value={priceRate}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="mb-4">
                                                        <MDBCol className="mb-r">
                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-lock"></i>
                                                                    </Grid>
                                                                    <Grid item md={10} >
                                                                        <TextField
                                                                            error={ formErrors['password'] }
                                                                            name="password"
                                                                            type="password"
                                                                            id="password"
                                                                            label="Your Password"
                                                                            onChange={this.handleChange}
                                                                            value={password}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                        <MDBCol className="mb-r">
                                                            <div className={classes.margin}>
                                                                <Grid container spacing={8} alignItems="flex-end">
                                                                    <Grid item>
                                                                        <i class="fa fa-lock"></i>
                                                                    </Grid>
                                                                    <Grid item md={10} >
                                                                        <TextField
                                                                            // error={ formErrors['password2'] }
                                                                            name="password2"
                                                                            type="password"
                                                                            id="password2"
                                                                            label="Confirm Password"
                                                                            onChange={this.handleChangeP2}
                                                                            value={this.state.password2}
                                                                            fullWidth />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>

                                                </div>
                                                <div className="text-center">
                                                    {/* <MDBBtn color="primary" type="submit" >Register</MDBBtn> */}
                                                    <button className="btn btn-primary">Register</button>
                                                </div>
                                            </form>


                                        </MDBModalBody>

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

                                            {/* <form id="medic-reg">

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
 */}

                                        </MDBModalBody>

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



export default withStyles(styles)(Signup);

