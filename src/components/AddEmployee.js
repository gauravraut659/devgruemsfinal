import React, { Component } from 'react';
import {Redirect } from 'react-router-dom'
import { Modal, Button, Row, Col, Form, FormGroup, Radio, RadioGroup } from 'react-bootstrap';
import FormErrors from './FormErrors';
export class AddEmployee extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
       let registrationId
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            
            loggedIn,
            newRole: localStorage.getItem("role"),
            registrationId
            //addModalShow: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
   
    
    handleSubmit(event) {
        event.preventDefault();
        
        fetch('https://localhost:44336/api/Employees'   , {
        //fetch('https://devgruems.azurewebsites.net/api/Employees'   , {
            method : 'POST',
            //mode: 'no-cors',//npm install --save-dev http-proxy-middleware
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'                
            },
            body: JSON.stringify({ 
                //id: null,//"name" : "shantanu"
                firstname: event.target.firstname.value,
                surname: event.target.surname.value,
                emailId: event.target.emailId.value,
                password: null,
                isEmailConfirmed: "False",
                isActive: "False",
                employeeId: "0000",
                doj:"01-01-2020",
                roleId: this.state.newRole

               
               // UserId: null
            })
        })
            .then(response => response.json())
            .then((result) => {
                if(result!=null){
                    alert("Recorded added and Mail sent successfully...!");
                }
                /*this.setState({
                    //localStorage.setItem("registrationId",result)
                    registrationId: result
                     });*/
                     localStorage.setItem("registrationId",result)
               // alert(this.state.registrationId);
                /*if(result!=null)
                {
               
                fetch('https://localhost:44336/api/Employees/Authenticate?flag='+JSON.stringify(result))    
                    .then(response => response.json())
                    .then(data => {              
                           
                    }
                    );
                    alert("Recorded added and Mail sent successfully...!");
                }*/
            },
                (error) => {
                    alert("Failed")
                }).catch(error => console.error('Unable to add item.', error));
    }

   
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        
        return (
            <div>

            <div className="container">
                
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New HR
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <Row>
                            <Col sm={8}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="firstname">
                                        <Form.Label>Employee First Name</Form.Label>
                                        <Form.Control  type="text" name="firstname" required placeholder="Plese Enter Employee First Name"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="surname">
                                        <Form.Label>Employee Last Name</Form.Label>
                                        <Form.Control type="text" name="surname" required placeholder="Plese Enter Employee Last Name"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="emailId">
                                        <Form.Label>Employee Email Id</Form.Label>
                                        <Form.Control type="email" name="emailId" required placeholder="Plese Enter Employee Email Id"></Form.Control>
                                    </Form.Group>

                                   
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal >
            {/* <Registration 
                emailId = {"udaydeorepatil@gmail.com"}
                /> */}
                {/* <Registration id= {this.state.registrationId}/> */}
            </div>
            </div>
        );
    }
}

export default AddEmployee;
