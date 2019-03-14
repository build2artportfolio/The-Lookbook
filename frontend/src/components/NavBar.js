import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {

    render() {
        let style = {};
        let loginButton = 'Log in';
        if (this.props.currentUser.username) {
            loginButton = 'Log out';
            style = {display: 'flex'};
        } else {
            loginButton = 'Log in';
            style = {display: 'none'};
        }

        return (
            <div className="NavBar">
                <h4 style={style}>{this.props.currentUser.username}'s Dashboard</h4>
                <NavLink to='/login' activeClassName="activeNavButton" >{loginButton}</NavLink>
                <NavLink to='/myaccount' activeClassName="activeNavButton" style={style}>My Account</NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(
    mapStateToProps,
    {}
)(NavBar);