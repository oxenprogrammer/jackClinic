import React, { Component } from 'react';
import CountUp from 'react-countup';
import './Home.css'
import { Footer } from '../Shared/Shared';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {


        
        return (

            <React.Fragment>
                <header className="landing">
                    <div className="container fullheight">
                        <div className="row fullheight align-items-center justify-content-center">
                            <div className="col-md-6 align-self-end">
                                {/* <h3 className="text-uppercase font-weight-bold">
                                    Your Favorite Source of Free Bootstrap Themes
                            </h3>
                                <hr className="divider" /> */}
                            </div>
                            <div className="col-md-6 align-self-baseline">
                                <h3 className="text-uppercase font-weight-bold">
                                    Musawo health provider app. Try it.
                                </h3>
                                <hr className="divider" />
                                <p className="text-white-75 font-weight-light mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minus iusto sapiente doloribus, neque repellendus voluptat</p>
                                <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="membership-image-ribbon">
                    <div className="container">
                        <div className="membership-imagine-ribbon-text">
                            <p className="">Your Health Starts from <span className="bold">HOME</span></p>
                        </div>
                    </div>
                </div>

                <div className="stats">
                    <div className="container text-center">
                        <h2>Our statistics</h2>
                        <div className="row">

                            <div className="col-md-4">
                                {/* <h4>43</h4> */}
                               <div className="stat-fa">
                               <i class="fa fa-user-md" aria-hidden="true"></i>
                               </div>
                                
                                <CountUp end={100} />
                                <h5>Registered Medics</h5>
                            </div>
                            <div className="col-md-4">
                                {/* <h5>1203</h5> */}
                                <div className="stat-fa">
                                <i class="fa fa-wheelchair" aria-hidden="true"></i>

                                </div>
                                <CountUp start={0} end={1000} delay={0}>
                                    {({ countUpRef }) => (
                                        <div>
                                            <span ref={countUpRef} />
                                        </div>
                                    )}
                                </CountUp>
                                <h5>Patients handled</h5>
                            </div>
                            <div className="col-md-4">
                              <div className="stat-fa">
                              <i class="fa fa-stethoscope" aria-hidden="true"></i>
                              </div>
                                <h5>43</h5>
                                <h5>Successfull followups</h5>
                            </div>
                            {/* <div className="col-md-3">
                                <h5>43</h5>
                                <h5>Registered M</h5>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="more-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Are you a Doctor?</h3>
                                <h2>Help the people around you</h2>
                                <h5>Offer medical services for the ones who need it</h5>
                            </div>
                            <div className="col-md-6">
                                <h3>Look for a doctor</h3>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />

            </React.Fragment>

        );
    }
}

export default Home;



