import React from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../actions';
import { } from 'reactstrap';
import Post from './Post';
import CreateForm from './CreateForm';

class UserDashboard extends React.Component {

    componentDidMount() {
            this.props.getUserPosts(localStorage.getItem('currentUserID'));
    }

    render() {
        return (
            <div>
                <CreateForm />
                <div className='card_container'>
                    {this.props.posts.map(post => (
                        <Post key={post.id} post={post}></Post>
                    ))}
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    posts: state.currentUserPosts,
    currentUser: state.currentUser
});

export default connect(
    mapStateToProps,
    { getUserPosts }
)(UserDashboard);