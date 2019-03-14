import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { } from '../actions';

class MyAccount extends React.Component {
    render() {
        console.log(this.props.currentUserInfo);
        return (
            <Table className='table' striped>
                <tbody>
                    <tr>
                        <th scope="row">ID</th>
                        <td>{this.props.currentUserInfo.id}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Username</th>
                        <td>{this.props.currentUserInfo.username}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {this.props.currentUserInfo.posts.map(post => (
                        <tr key={post.id}>
                            <th scope="row">Post ID: {post.id}</th>
                            <td>{post.title}</td>
                            <td>{post.description}</td>
                            <td>{post.imageUrl}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    currentUserInfo: state.currentUserInfo
});

export default connect(
    mapStateToProps,
    {}
)(MyAccount);