import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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


const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class CircularIntegration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            success: false,
            isAvailable: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.toggleAvailability = this.toggleAvailability.bind(this);
        this.getAvailabity = this.getAvailabity.bind(this);
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


    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 3000);
                },
            );
        }
    };

    render() {
        const { loading, success } = this.state;
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });

        return (
            <div className={classes.root}>



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
                    {/* <button className="btn btn-primary" type="submit">Update Availability</button> */}
                    {/* <CircularIntegration onClick={()=> Alert("Hi there") }  /> */}

                    <div className={classes.wrapper}>
                        <ButtonBase
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={this.handleButtonClick}
                            type="submit"
                        >
                            Update Availability
                        </ButtonBase>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>



                </form>



            </div>
        );
    }
}

CircularIntegration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIntegration);