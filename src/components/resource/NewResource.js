import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../Dashboard.css'
import { Table } from 'react-bootstrap';


export default class newResource extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            empRole: localStorage.getItem("role"),
            checkId: localStorage.getItem("checkId"),
            addModalShow: false,
            editModalShow: false,
            emps: []
            
        }
    }

    componentDidMount() {
        this.refreshList();       
    }
    refreshList() {        
        fetch('https://localhost:44336/api/Employees/SearchByRole?id='+localStorage.getItem("checkId"))
        //fetch('https://devgruems.azurewebsites.net/api/Employees/SearchByRole?id='+localStorage.getItem("checkId"))
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data });
               // alert(JSON.stringify(data))
            }
            );
    }
    //to refresh list after new employee is added in admin dashboard
    componentDidUpdate() {
        this.refreshList(); 
    }
    
    

    render() {
        const { emps} = this.state;
        if(this.state.empRole != 3){
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
                <Link className="navbar-brand" to={"#"}>Employee-Dashboard</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    {/* <form inline>
                    <input type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </form> */}
                    </li>
                    
                    {/* <Form inline>
                    <FormControl type="text" placeholder="Search  by Id" className="mr-sm-2" />
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
                            </tr>
                        )}
                    </tbody>
                 </Table>              
            </div >
            </div>
            </div>
        )
    }
}
