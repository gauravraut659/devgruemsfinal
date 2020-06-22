import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AddEmployee from './AddEmployee';
export class Registration extends Component {
   /*
   password
   emailId
   isActive
   */
        
    constructor(props) {
        super(props)
        //let checkToken = true;
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("checkId")
        //const token = localStorage.getItem("token")
        //let loggedIn = true
        /*if (token == null) {
            loggedIn = false
        }*/
        
        this.state = {
            checkToken: true
           // loggedIn,
            //addModalShow: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     //   this.handleSubmit = this.handleSubmit.bind(this);
     
     componentDidMount = () => {
        
        //alert(JSON.stringify(this.props.match.params))
        //const { urlId } = this.props.match.params
        this.refreshList();
        //alert(JSON.stringify(urlId));
    }
    refreshList(){
        
        fetch('https://localhost:44336/api/Employees/Authenticate?flag='+localStorage.getItem("registrationId"))   
        //fetch('https://devgruems.azurewebsites.net/api/Employees/Authenticate?flag='+localStorage.getItem("registrationId")) 
            .then(response => response.json())
            .then(data => {          
                //alert(JSON.stringify(data))    
               if(data === false)
               {
                this.setState( 
                    {checkToken : false}
                    
                )
                //alert(this.state.checkToken)
               }                             
            }
            );
    }

    handleSubmit(event){
        //this.setState({[e.target.name]:e.target.value})
        event.preventDefault();
        if(event.target.Password.value != event.target.cPassword.value)
        {
            alert("Password not matching..!");
        }else{
            const passwordHash = require('crypto');
        const sha256 = passwordHash.createHash('sha256').update(event.target.Password.value).digest('hex')

           
        fetch('https://localhost:44336/api/Employees/Registration' , {
        //fetch('https://devgruems.azurewebsites.net/api/Employees/Registration' , {    
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'                
            },
            body: JSON.stringify({ 
               // id: event.target.id.value,
                id: localStorage.getItem("registrationId"),
               
              // id: urlId,
               // roleId: "2",
                //password: event.target.Password.value,
                password: sha256,
                //isEmailConfirmed:event.target.IsEmailConfirmed.value,
                isEmailConfirmed:true,
                //emailId: event.target.emailId.value,
                emailId:"dummy",
                firstname: "dummy",
                surname: "dummy"


            })
        })
            .then(response => response.json())
            .then((result) => {
                localStorage.removeItem("registrationId");
                alert(JSON.stringify(result));
            },
                (error) => {
                    alert("Failed")
                }).catch(error => console.error('Unable to add item.', error));
        }
        
       // }
    }
   
    render() {
       // alert(localStorage.getItem("registrationId"))
        const{Username,Password,Role,checkToken}=this.state
        //alert(this.state.checkToken)
        if(this.state.checkToken == false)
        {
            return (
                <div className="App">
                <div className="auth-wrapper">
                <div className="auth-inner">
                {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                    <Link className="navbar-brand" to={"/"}>DEVGRU</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}><b>Login Again</b></Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to={"/registration"}>Sign up</Link>
                        </li> *
                        </ul>
                    </div>
                    </div>
                </nav>  */}
                    <h1>Either your session is ended or you have already regestered..!</h1>
                    <h1>Please for more details contact : devgrunihilent@gmail.com</h1>
                    {/* <Link to="/">Login Again</Link> */}
                </div>
                </div>
                </div>
            );
        }

        return (
            <div className="App">
            <div className="auth-wrapper">
            <div className="auth-inner">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                <Link className="navbar-brand" to={"/"}>DEVGRU</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}><b>Login Here</b></Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to={"/registration"}>Sign up</Link>
                    </li> */}
                    </ul>
                </div>
                </div>
            </nav> 
                
                <Form onSubmit={this.handleSubmit}>

                    {/* <Form.Group controlId="id">
                        <Form.Label>id</Form.Label>
                        <Form.Control type="text" name="id" required disabled
                           defaultValue = {localStorage.getItem("registrationId")} ></Form.Control>   
                    </Form.Group>   */}

                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" required
                            placeholder="Generate your password"></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="cPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="cPassword" required
                            placeholder="Confirm your password"></Form.Control>
                    </Form.Group>

                    {/* <Form.Group controlId="IsEmailConfirmed">
                        <Form.Label>IsEmailConfirmed</Form.Label>
                        <Form.Control type="text" name="IsEmailConfirmed" required disabled
                        defaultValue = "True" ></Form.Control>
                    </Form.Group> */}
                    
                    <Form.Group>
                        <Button variant="primary" type="submit" >
                            Confirm Your Details
                        </Button>
                    </Form.Group>
                   
                </Form>
                {/* <Link to="/">Login Here</Link> */}
            </div>
            </div>
            </div>
            
            //  <div>
            //      <h1>After successfull registration click Login to view details>>!</h1>
            //      <Link to="/">Login Here</Link>
            //  </div>
        );
    }
}

export default Registration;
