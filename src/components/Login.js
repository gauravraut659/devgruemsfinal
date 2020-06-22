import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//import './Login.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Table, Form,Modal, Button, Row, Col } from 'react-bootstrap';


//import { Button, ButtonToolbar } from "react-bootstrap";

export default class login extends Component {
    
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        
        if(token == null){
            loggedIn = false
        }
        this.state = {
            
            email : '',
            password : '',
            role:'',
            loggedIn,
            token : [],
            authEmp :[]
        } 
        //bind() function is used to hold entered value
        this.onChange = this.onChange.bind(this) 
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        
        // fetch('https://localhost:44373/api/Employees')            
        //     .then(response => response.json())
        //     .then(data => {               
        //         this.setState({ authEmp : data });  
                                           
        //     }
        //     );
        //     //string str = JSON.stringify(this.state.flag)
        // //alert(flag)    
       
        fetch('https://localhost:44336/api/Employees/Authenticate?flag='+"login")    
        //fetch('https://devgruems.azurewebsites.net/api/Employees/Authenticate?flag='+"login") 
            .then(response => response.json())
            .then(data => {              
               // alert(JSON.stringify(data.access_token))
            this.setState({ token : JSON.stringify(data.access_token) });  
            //alert(this.state.token)        
            }
            );
            
        }
    
    // this event is used to assign entered value to the tag name
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e){
        e.preventDefault()
        const {email,password, role, authEmp,token} = this.state       
        var loggedin = false
        const passwordHash = require('crypto');
        const sha256 = passwordHash.createHash('sha256').update(password).digest('hex')
       // alert(sha256)
        
        fetch("https://localhost:44336/api/Employees/CheckLogin?email="+email+"&&password="+sha256)
       // fetch("https://devgruems.azurewebsites.net/api/Employees/CheckLogin?email="+email+"&&password="+sha256)            
        .then(response => response.json())
        .then(data => {       
            //alert(data);        
            //this.setState({ authEmp : data });  
            data.forEach((index) =>{
                if((loggedin === false) 
                && (index.isActive)
                )
                {
                    localStorage.setItem("role",index.roleId)
                    localStorage.setItem("token",this.state.token) 
                    localStorage.setItem("checkId",index.employeeId)  
                   // alert(JSON.stringify(index.isActive))
                    this.state.role = index.roleId
                    this.setState({    loggedIn: true    })
                    loggedin = true
                }
                
            });
            if(loggedin === false )
                    {
                        alert("Invalid Credentials")
                    }                
        }
        );   
        // authEmp.forEach((index) =>{
        //     if(( JSON.stringify(email) === JSON.stringify(index.emailId))
        //     && (JSON.stringify(password) === JSON.stringify(index.password))
        //     && (loggedin === false) 
        //     && (index.isActive)
        //     )
        //     {
        //         localStorage.setItem("role",index.roleId)
        //         localStorage.setItem("token",this.state.token) 
        //         localStorage.setItem("checkId",index.employeeId)  
        //        // alert(JSON.stringify(index.isActive))
        //         this.state.role = index.roleId
        //         this.setState({    loggedIn: true    })
        //         loggedin = true
        //     }
        // });
        // if(loggedin === false )
        //     {
        //         alert("Invalid Credentials")
        //     }
                                   
    }
    render() {
        
        if(this.state.loggedIn){
            //alert(this.state.role)
            if(this.state.role === 1){
                return <Redirect to="/adminDashboard"/>
            }
            else if(this.state.role === 3){
                return <Redirect to="/NewResource"/>
                //alert("Going to New Resource")
            }else if(this.state.role === 2){
                return <Redirect to="/hrDashboard"/>
                //alert("Going to Hr-admin")
            }
        }
        
        return (
            
            
           /* <div className="container" >
            <h1>Login</h1>
                <Col sm={4}>
            <Form onSubmit={this.submitForm}>
                <Form.Group controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label> 
                    <Form.Control type="email" placeholder="Enter email" required name="email" value={this.state.email} onChange={this.onChange} />
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label> 
                    <Form.Control type="password" placeholder="Password" required name="password" value={this.state.password} onChange={this.onChange}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
                </Col>
                
            </div>
            */
           <div className="App">
           <div >             
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>TEAM : DEVGRU</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Sign in</Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <Link className="nav-link" to={"/registration"}>Sign up</Link>
                            </li> */}
                            </ul>
                        </div>
                        </div>
                    </nav>
            </div>           
            <br></br><br></br><br></br><br></br><br></br>                 
            <div className="auth-wrapper-login">
                <div className="auth-inner-login">             
                    <form onSubmit={this.submitForm}>
                        {/* <h3 style="text-align:center">Sign In</h3> */}
                        <h3 >Sign In</h3>
                        <br></br>
                        <div className="form-group">
                            {/* <label>Email address</label> */}
                            <input type="email" required className="form-control" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange}/>
                        </div>
                        
                        <div className="form-group">
                            {/* <label>Password</label> */}
                            <input type="password" required className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChange}/>
                        </div>
                        <br></br>
                        {/* <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div> */}

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        {/* <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p> */}
                    </form>
                </div>
            </div> 
           
            </div> 
        );
    }
}
