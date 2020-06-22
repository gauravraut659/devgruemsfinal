import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../Dashboard.css'
import { Table, Col, Row, Container } from 'react-bootstrap';
import { Button, ButtonToolbar, Form, FormControl, Pagination} from "react-bootstrap";
import {AddEmployee} from "../AddEmployee"
import {EditEmpModel} from "../EditEmpMpdel"


export default class hrDashboard extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        let currentPage = 1
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            currentPage,
            empRole: localStorage.getItem("role"),
            addModalShow: false,
            editModalShow: false,
            emps: []
            
        }
    }

    componentDidMount() {
        this.refreshList();       
    }
    refreshList() {        
        fetch('https://localhost:44336/api/Employees/SearchByRole?id='+this.state.empRole+'&&pageNumber='+this.state.currentPage+'&&pageSize='+5)
                //fetch('https://devgruems.azurewebsites.net/api/Employees/SearchByRole?id='+this.state.empRole)
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data });
                //alert(JSON.stringify(data))
            }
            );
    }
    //to refresh list after new employee is added in admin dashboard
    componentDidUpdate() {
        this.refreshList(); 
    }
    
    deleteEmp(empid){
        if(window.confirm("Are you sure..?")){
            fetch('https://localhost:44336/api/Employees/'+empid,{
            //fetch('https://devgruems.azurewebsites.net/api/Employees/'+empid,{
                method :'DELETE',
                header:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
        }
    }

    render() {
        const { emps, empid,empemployeeId, empfname, empsurname, empemailId, emproleId, empisActive,empdoj, empisEmailConfirmed, emppassword} = this.state;
        if(this.state.empRole != 2){
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("checkId")
            return <Redirect to="/"/>
        }
        if(this.state.loggedIn === false){
            return <Redirect to="/"/>
        }
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="App">
                <div className="auth-wrapper">
            <div className="auth-inner">             
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                <Link className="navbar-brand" to={"#"}>HRAdmin-Dashboard</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    {/* <form inline>
                    <input type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </form> */}
                    </li>
                    
                    {/* <Form inline>
                    <FormControl type="text" placeholder="Search Resource by Id" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form> */}
                    <li className="nav-item">
                        <Link className="nav-link" to={"//#region "}><b></b></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/logout"}><b>Logout</b></Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to={"/registration"}>Sign up</Link>
                    </li> */}
                    </ul>
                </div>
                </div>
            </nav>
            <Container> 
                <h1>Welcome</h1>
                {/* <Link to="/logout">Logout</Link> */}
                <Table className="mt-4" striped bordered hover size ="sm">
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th>Firstname</th>
                            <th>Surname</th>
                            <th>EmailID</th>
                            <th>IsEmailConfirmed</th>
                            <th>Role</th>
                            <th>IsActive</th>
                            <th>DOJ</th>
                            <th>Options</th>
                            
                        </tr>
                    </thead>
                    <tbody>{
                        emps.map(emp => 
                            <tr key={emp.id}>
                                <td>{emp.employeeId}</td>
                                <td>{emp.firstname}</td>
                                <td>{emp.surname}</td>
                                <td>{emp.emailId}</td>
                                <td>{JSON.stringify(emp.isEmailConfirmed)}</td>
                                <td>Resource</td> 
                                <td>{JSON.stringify(emp.isActive)}</td>                              
                                <td>{emp.doj}</td>
                                
                                
                                
                                <td>
                                 <ButtonToolbar>
                                    <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true,
                                    empid: emp.id,
                                    empfname: emp.firstname,
                                    empsurname: emp.surname,
                                    empemailId: emp.emailId,
                                    emppassword: emp.password,
                                    empisEmailConfirmed: emp.isEmailConfirmed,
                                    empisActive: emp.isActive,
                                    empemployeeId: emp.employeeId,
                                    empdoj: emp.doj,
                                    emproleId: emp.roleId
                                    })}>
                                        Edit
                                     </Button> 
                                    <Button className="mr-2" variant="danger" onClick={()=> this.deleteEmp(emp.id)}> 
                                        Delete
                                    </Button>
                                    <EditEmpModel
                                    show = {this.state.editModalShow}
                                    onHide = {editModalClose}
                                    empid = {empid}  
                                    empfname = {empfname}
                                    empsurname = {empsurname}
                                    empemailId = {empemailId}
                                    emppassword = {emppassword}
                                    empisEmailConfirmed = {empisEmailConfirmed}
                                    empisActive ={empisActive}
                                    empemployeeId = {empemployeeId}
                                    empdoj = {empdoj}
                                    emproleId = {emproleId}
                                    />     
                                </ButtonToolbar> 
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                
                <Row>
                  <Col>   
                <ButtonToolbar>
                    <Button variant='success' onClick={() => this.setState({ addModalShow: true })}>
                        Add Employee
                    </Button>

                    <AddEmployee show={this.state.addModalShow} onHide={addModalClose}>

                    </AddEmployee>
                 </ButtonToolbar> 
                 </Col>
                        
                        <Col xs={6}>
                        <Pagination >
                        <Pagination.First onClick={() => this.setState({ currentPage: 1 })}/>
                        {/* <Pagination.Prev /> */}
                        <Pagination.Item onClick={() => this.setState({ currentPage: 1 })}>{1}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 2 })}>{2}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 3 })}>{3}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 4 })}>{4}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 5 })}>{5}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 6 })}>{6}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 7 })}>{7}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 8 })}>{8}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 9 })}>{9}</Pagination.Item>
                        <Pagination.Item onClick={() => this.setState({ currentPage: 10 })}>{10}</Pagination.Item>
                        {/* <Pagination.Ellipsis />
                        <Pagination.Ellipsis /> */}
                        {/* <Pagination.Next /> */}
                        <Pagination.Last onClick={() => this.setState({ currentPage: 10 })}/>
                        </Pagination>
                        </Col>
                        <Col xs={3}></Col>                        
                    </Row>
                   
            
                    </Container> 
                 
                 
            </div >
            </div>     
            </div >
        )
    }
}
