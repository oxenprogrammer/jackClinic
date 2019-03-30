import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {Navigation, Footer} from './components/Shared/Shared';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import SignupMedic from './components/Signup/SignupMedic';
import Login from './components/Login/Login';
import './App.css';
import Contact from './components/Contact/Contact';
import MedicDashboard from './components/Dashboards/MedicDashboard/MedicDashboard';
import Userprofile from './components/Dashboards/Userprofile/Userprofile';
import ClientProfile from './components/Dashboards/Userprofile/ClientProfile';
import ClientDashboard from './components/Dashboards/ClientDashboard/ClientDashboard';





class App extends Component {
  render() {
    return (
      <React.Fragment>
              <Navigation/>

              <Router basename="/">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/medic-signup" component={SignupMedic} />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/medic" component={ MedicDashboard } />
                  <Route exact path="/client" component={ ClientDashboard } />
                  <Route exact path="/profile" component={ Userprofile } />
                  <Route exact path="/myclientprofile" component={ ClientProfile } />
                  {/* <Route exact path="/contact" component={ Contact } /> */}

                  
                </Switch>

              </Router>
              
      </React.Fragment>
      
        // <React.Fragment>
        //   <Navigation/>
        //   <Home/>  
        //   <Footer/>
        // </React.Fragment>
      
    );
  }
}

export default App;
