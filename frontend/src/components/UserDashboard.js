import React from 'react';
import { connect } from 'react-redux';
import {  } from '../actions';
import {  } from 'reactstrap';
import Post from './Post';

class UserDashboard extends React.Component {
    state = {
    };
    render() {
        return (
            <div className='card_container'>
                {this.props.posts.map(post => (
                    <Post post={post}></Post>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.currentUserPosts
  });
  
export default connect(
    mapStateToProps,
    { }
  )(UserDashboard);