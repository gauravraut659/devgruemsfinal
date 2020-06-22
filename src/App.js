import React from 'react';
//import {Switch, Route, Link} from "react-router-dom"
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login"
import AdminDashboard from "./components/admin/AdminDashboard"
import HrDashboard from "./components/hr/HrDashboard"
import NewResource from "./components/resource/NewResource"
import Logout from "./components/Logout"
import Registration from './components/Registration';


function App() {
  return (
    // <Switch>
    //   <Route exact path="/" component={Login}/>
    //   <Route exact path="/adminDashboard" component={AdminDashboard}/>
    //   <Route exact path="/hrDashboard" component={HrDashboard}/>
    //   <Route exact path="/newResource" component={NewResource}/>
    //   <Route exact path="/logout" component={Logout}/>
    //   <Route exact path="/registration" component={Registration}/>
    // </Switch>
    <Router>
    <div className="App">
      {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>DEVGRU</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/registration"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      {/* <div className="auth-wrapper-login">
        <div className="auth-inner-login"> */}
          {/* <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch> */}
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/adminDashboard" component={AdminDashboard}/>
            <Route exact path="/hrDashboard" component={HrDashboard}/>
            <Route exact path="/newResource" component={NewResource}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/registration" component={Registration}/>
        </Switch>
        {/* </div>
      </div> */}
    </div>
    </Router>
  );
}

export default App;
