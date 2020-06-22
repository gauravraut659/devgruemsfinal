import React, { Component } from 'react';
import {Redirect } from 'react-router-dom'
import { Modal, Button, Row, Col, Form, FormGroup, Toast } from 'react-bootstrap';

export class EditEmpModel extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        const flag = localStorage.getItem("flag")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            Flag: flag,
            curTime : new Date().toLocaleString()
            //addModalShow: false
        }
       // alert(JSON.stringify(this.props.empdoj))
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(event) {
        var date;
        event.preventDefault();
        //alert(event.target.doj.value)
        if(event.target.doj.value == "")
        {
            date = this.props.empdoj
            //alert(date)
        }else{
            date = event.target.doj.value
        }
        fetch('https://localhost:44336/api/Employees', {
        //fetch('https://devgruems.azurewebsites.net/api/Employees', {
            method : 'PUT',
            //mode: 'no-cors',//npm install --save-dev http-proxy-middleware
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'                
            },
            body: JSON.stringify({
                id:this.props.empid, 
                employeeid: event.target.employeeid.value,
                firstname: event.target.firstname.value,
                surname: event.target.surname.value,
                emailId: event.target.emailId.value,
                password: this.props.emppassword,
                isEmailConfirmed:  event.target.isEmailConfirmed.value,
                isActive: event.target.isActive.value,
                roleId: this.props.emproleId,
                doj: date
                // if(event.target.doj.value == null)
                // {
                //     doj : {this.props.empdoj}
                // }else{
                //     doj: event.target.doj.value
                // }
               
                    
            })
        })
            .then(response => response.json())
            .then((result) => {
                if(result == "Record has been updated successfully...")
                {
                    alert(result);
                    
                }else{
                alert("Updation Failed");
                }
            },
                (error) => {
                    alert("Failed")
                }).catch(error => console.error('Unable to add item.', error));
    }

    render() {
        //const token = localStorage.getItem("token")
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        
            return (
                <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col sm={6}>
                                    
    
                                        <Form.Group controlId="employeeid">
                                            <Form.Label><b>Employeeid</b></Form.Label>
                                            <Form.Control type="text" name="employeeId" required 
                                             defaultValue = {this.props.empemployeeId} placeholder="Plese Enter Employee ID"></Form.Control>
                                        </Form.Group> 
    
    
                                        <Form.Group controlId="firstname">
                                            <Form.Label><b>Employee First Name</b></Form.Label>
                                            <Form.Control type="text" name="firstname" required
                                             defaultValue = {this.props.empfname} placeholder="Plese Enter Employee First Name"></Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="surname">
                                            <Form.Label><b>Employee Last Name</b></Form.Label>
                                            <Form.Control type="text" name="surname" required 
                                             defaultValue = {this.props.empsurname} placeholder="Plese Enter Employee Sure Name"></Form.Control>
                                        </Form.Group>

                                        

                                        <Form.Group>
                                            <Button variant="primary" type="submit" >
                                                Update Employee
                                            </Button>
                                        </Form.Group>
                                    
                                </Col>
                                <Col sm={6}>        
                                
                                        <Form.Group controlId="emailId">
                                            <Form.Label><b>Employee Email Id</b></Form.Label>
                                            <Form.Control type="email" name="emailId" required
                                             defaultValue = {this.props.empemailId} placeholder="Plese Enter Employee Email Id"></Form.Control>
                                        </Form.Group>

                                        {/* <Form.Group controlId="isEmailConfirmed">
                                            <Form.Label><b>Employee isEmailConfirmed</b></Form.Label>
                                            <Form.Control type="text" name="isEmailConfirmed" required 
                                             defaultValue = {this.props.empisEmailConfirmed} placeholder="Plese Enter Employee Status"></Form.Control>
                                        </Form.Group> */}

                                        <Form.Group controlId="isEmailConfirmed">
                                            <Form.Label>Employee isEmailConfirmed</Form.Label>
                                            <Form.Control as="select" name="isEmailConfirmed" required 
                                             defaultValue = {this.props.empisEmailConfirmed} >
                                            <option>true</option>
                                            <option>false</option>                                            
                                            </Form.Control>
                                        </Form.Group>
    
                                        {/* <Form.Group controlId="isActive">
                                            <Form.Label><b>Employee empisActive</b></Form.Label>
                                            <Form.Control type="text" name="isActive" required 
                                             defaultValue = {this.props.empisActive} placeholder="Plese Enter Employee Status"></Form.Control>
                                        </Form.Group> */}

                                        <Form.Group controlId="isActive">
                                            <Form.Label>Employee isActive</Form.Label>
                                            <Form.Control as="select" name="isActive" required 
                                             defaultValue = {this.props.empisActive} >
                                            <option>true</option>
                                            <option>false</option>                                            
                                            </Form.Control> 
                                        </Form.Group>

                                        <Form.Group controlId="doj"> 
                                            <Form.Label><b>Employee doj</b></Form.Label>
                                            <Form.Control type="date" name="doj"  
                                            //  defaultValue = {
                                            //     new Intl.DateTimeFormat("en-GB", {
                                            //     year: "numeric",
                                            //     month: "long",
                                            //     day: "2-digit"
                                            //   }).format(this.props.empdoj)}
                                             defaultValue = {this.props.empdoj}
                                             placeholder="Plese Enter Employee doj"></Form.Control>
                                        </Form.Group>   
      
                                </Col>
                            </Row>
                            </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal >
                </div>
            );
       
       
                                
    }

}
export default EditEmpModel;