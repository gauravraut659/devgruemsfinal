import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("checkId")
    }
    render() {
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
                        <Link className="nav-link" to={"/"}><b>Login Again</b></Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to={"/registration"}>Sign up</Link>
                    </li> */}
                    </ul>
                </div>
                </div>
            </nav> 
                <h1>You have been logged out...!</h1>
                {/* <Link to="/">Login Again</Link> */}
            </div>
            </div>
            </div>
        )
    }
}