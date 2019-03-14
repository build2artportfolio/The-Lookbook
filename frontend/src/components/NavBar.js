import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions';

class NavBar extends React.Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
        window.location.reload();
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
                <NavLink to='/' style={userloggedin}><h3>{this.props.currentUser.username}'s Dashboard</h3></NavLink>
                <NavLink to='/login' activeClassName="activeNavButton" style={userloggedout}>Log in</NavLink>
                <NavLink to='/' onClick={this.logout} activeClassName="activeNavButton" style = {userloggedin}>Log out</NavLink>
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