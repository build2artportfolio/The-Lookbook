import React from 'react';
import { connect } from 'react-redux';
import { createPost, getUserPosts } from '../actions';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class CreateForm extends React.Component {
  state = {
    postinfo: {
        title: '',
        description: '',
        image: ''
    }
  };

  handleChange = e => {
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


  render() {
    
    return (
      <div className='CreateForm'>
        <Form onSubmit={this.createPost}>
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
          <Button color="primary">Create Post</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { createPost, getUserPosts }
)(CreateForm);