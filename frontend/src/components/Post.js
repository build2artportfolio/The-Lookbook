import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';
import { setEditForm, getUserPosts, deletePost } from '../actions';

class Post extends React.Component {
    render() {
        return (
            <Card className='card'>
                <CardImg top width="100%" src={this.props.post.imageUrl} alt="User's image" />
                <CardBody>
                    <CardTitle>{this.props.post.title}</CardTitle>
                    <CardText>{this.props.post.description}</CardText>
                    <Button color="info" onClick={e => this.props.setEditForm(this.props.post)}>Edit</Button>
                    <Button color="danger" onClick={e => this.props.deletePost(this.props.post,this.props.getUserPosts)}>Delete</Button>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { setEditForm, getUserPosts, deletePost }
)(Post);