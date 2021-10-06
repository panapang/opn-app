import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import HouseTimeline from './components/houseTimeline.component';

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
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/houseTimeline"]} component={HouseTimeline} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
