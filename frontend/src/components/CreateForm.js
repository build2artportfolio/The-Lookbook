import React from 'react';
import { connect } from 'react-redux';
import { createPost, getUserPosts, editPost } from '../actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class CreateForm extends React.Component {
  state = {
    postinfo: {
      title: '',
      description: '',
      // image: ''
      image: null
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
    this.props.createPost(this.state.postinfo, this.props.getUserPosts);
    this.setState({
      postinfo: {
        title: '',
        description: '',
        // image: ''
        image: null
      }
    });
  };

  editPost = e => {
    e.preventDefault();
    this.props.editPost(this.state.postinfo, this.props.currentPost.id, this.props.getUserPosts);
    this.setState({
      postinfo: {
        title: '',
        description: '',
        // image: ''
        image: null
      },
      editing: false
    });
  }

  fileSelectHandler = e => {
    e.persist();
    this.setState({
      postinfo: {
        ...this.state.postinfo,
        image: e.target.files[0]
      }
    });
  };

  fileUploadHandler = () => {
    const frmData = new FormData();
    frmData.append('image', this.state.imgFile, this.state.imgFile.name);
    axios.post('location.com', frmData, {
      onUploadProgress: ProgressEvent => {
        // Change to Progress bar during styling and have nice visual feedback
        console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
      }
    })
      .then(res => {
        console.log(res)
      });
  }


  render() {
    let urlDisable = false;
    let myButton = 'Create Post';
    this.state.editing ? myButton = 'Update Post' : myButton = 'Create Post';
    let myButtonFunction = this.createPost;
    this.state.editing ? myButtonFunction = this.editPost : myButtonFunction = this.createPost;
    this.state.editing ? urlDisable = true : urlDisable = false;

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
          {/* <FormGroup>
            <Label>Image URL</Label>
            <Input type="text"
              name="image"
              value={this.state.postinfo.image}
              onChange={this.handleChange} disabled={urlDisable}/>
          </FormGroup> */}
          <FormGroup>
            <Label>Image Upload</Label>
            <Input type="file"
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