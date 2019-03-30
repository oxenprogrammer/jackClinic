import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';



class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <React.Fragment>
                <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Write to us</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Subject"
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil-alt"
              />
            </div>
            <div className="text-center">
              <MDBBtn outline color="secondary">
                Send <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            </React.Fragment>
         );
    }
}
 
export default Contact;



// import React, { Component } from 'react';
// import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

// class ModalPage extends Component {
// state = {
//   modal: false
// }

// toggle = () => {
//   this.setState({
//     modal: !this.state.modal
//   });
// }

// render() {
//   return (
//     <MDBContainer>
//       <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
//       <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
//         <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
//         <MDBModalBody>
//           (...)
//         </MDBModalBody>
//         <MDBModalFooter>
//           <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
//           <MDBBtn color="primary">Save changes</MDBBtn>
//         </MDBModalFooter>
//       </MDBModal>
//     </MDBContainer>
//     );
//   }
// }

// export default ModalPage;

