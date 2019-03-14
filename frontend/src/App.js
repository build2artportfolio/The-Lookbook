import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './components/UserDashboard';
import TopMessage from './components/TopMessage';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopMessage />
          <NavBar />
          <Route path="/login" component={Login} />
          <Route path="/login" component={SignUp} />
          <PrivateRoute component={UserDashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
