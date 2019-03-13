import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './components/UserDashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="Navbar">
            <Link to="/protected">Login or Register</Link>
          </div>
          <Route path="/login" component={Login} />
          <Route path="/login" component={SignUp} />
          <PrivateRoute path="/protected" component={UserDashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
