import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';
//import styled from 'styled-components';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  signUp = e => {
    e.preventDefault();
    this.props.signUp(this.state.credentials).then(() => {
      this.props.history.push('/protected');
    });
  };


  render() {
    return (
      <div className='signup-form'>
        <Form onSubmit={this.signUp}>
          <FormGroup>
            <Label>Username</Label>
            <Input type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input type="password"
              name="password"
              // State check required
              value={this.state.credentials.password}
              onChange={this.handleChange} />
          </FormGroup>
          <Button color="primary">Sign Up</Button>
          <Alert style={error_style} color="danger">{this.props.error}</Alert>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { signUp }
)(SignUp);
