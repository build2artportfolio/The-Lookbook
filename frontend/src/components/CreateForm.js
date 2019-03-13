import React from 'react';
import { connect } from 'react-redux';
import { createPost, getUserPosts, editPost } from '../actions';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class CreateForm extends React.Component {
  state = {
    postinfo: {
      title: '',
      description: '',
      image: ''
    },
    editing: false
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.currentPost &&
      prevProps.currentPost !== this.props.currentPost
    ) {
      this.setState({
        postinfo: {
          title: this.props.currentPost.title,
          description: this.props.currentPost.description,
          image: this.props.currentPost.imageUrl,
        },
        editing: true
      });
    }
  }

  handleChange = e => {
    e.persist();
    this.setState({
      postinfo: {
        ...this.state.postinfo,
        [e.target.name]: e.target.value
      }
    });
  };

  createPost = e => {
    e.preventDefault();
    this.props.createPost(this.state.postinfo);
    this.props.getUserPosts(localStorage.getItem('currentUserID'));
    this.setState({
      postinfo: {
        title: '',
        description: '',
        image: ''
      }
    });
  };

  editPost = e => {
    e.preventDefault();
    this.props.editPost(this.state.postinfo, this.props.currentPost.id);
    this.setState({
      postinfo: {
        title: '',
        description: '',
        image: ''
      },
      editing: false
    });
  }


  render() {
    let myButton = 'Create Post';
    this.state.editing ? myButton = 'Update Post' : myButton = 'Create Post';
    let myButtonFunction = this.createPost;
    this.state.editing ? myButtonFunction = this.editPost : myButtonFunction = this.createPost;

    return (
      <div className='CreateForm'>
        <Form onSubmit={myButtonFunction}>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text"
              name="title"
              value={this.state.postinfo.title}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input type="text"
              name="description"
              value={this.state.postinfo.description}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Image URL</Label>
            <Input type="text"
              name="image"
              value={this.state.postinfo.image}
              onChange={this.handleChange} />
          </FormGroup>
          <Button color="primary">{myButton}</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentPost: state.currentPost
});

export default connect(
  mapStateToProps,
  { createPost, getUserPosts, editPost }
)(CreateForm);