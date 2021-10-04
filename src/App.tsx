import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import User from "./components/user.component";
import UserList from "./components/user-list.component";
import Timeline from './components/timeline.component';
import AddUser from './components/add-user.component';

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/timeline"} className="nav-link">
                House Timeline
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/member"} className="nav-link">
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
            <Route exact path={["/", "/timeline"]} component={Timeline} />
            <Route exact path="/addmember" component={AddUser} />
            <Route exact path="/member" component={UserList} />
            <Route path="/member/:id" component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
