import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions';

class NavBar extends React.Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
        //.then(() => {this.props.history.push('/login');});
    };

    render() {
        let userloggedin = {};
        if (this.props.currentUser.username) {
            userloggedin = { display: 'flex' };
        } else {
            userloggedin = { display: 'none' };
        }

        let userloggedout = {};
        if (this.props.currentUser.username) {
            userloggedout = { display: 'none' };
        } else {
            userloggedout = { display: 'flex' };
        }

        return (
            <div className="NavBar">
                <h4 style={userloggedin}>{this.props.currentUser.username}'s Dashboard</h4>
                <NavLink to='/login' activeClassName="activeNavButton" style={userloggedout}>Log in</NavLink>
                <NavLink to='/login' onClick={this.logout} activeClassName="activeNavButton" style = {userloggedin}>Log out</NavLink>
                <NavLink to='/myaccount' activeClassName="activeNavButton" style={userloggedin}>My Account</NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(
    mapStateToProps,
    { logout }
)(NavBar);