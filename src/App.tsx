import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import User from "./components/user.component";
import UserList from "./components/user-list.component";
import HouseTimeline from './components/houseTimeline.component';
import AddUser from './components/add-user.component';

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/houseTimeline"} className="nav-link">
                House Timeline
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/area"} className="nav-link">
                Area
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/houseTimeline"]} component={HouseTimeline} />
            <Route exact path="/adduser" component={AddUser} />
            <Route exact path="/user" component={UserList} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
