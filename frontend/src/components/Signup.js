import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
      passwordcheck: ''
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
    this.props.signUp(this.state.credentials);
    this.setState({
      credentials: {
        username: '',
        password: '',
        passwordcheck: ''
      }
    });
  };


  render() {
    let passwordcheck_style = {};
    (this.state.credentials.passwordcheck.length > 0 && this.state.credentials.passwordcheck !== this.state.credentials.password) ? passwordcheck_style = { display: 'block' } : passwordcheck_style = { display: 'none' };
    return (
      <div className='SignupForm'>
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
              name="passwordcheck"
              value={this.state.credentials.passwordcheck}
              onChange={this.handleChange} />
            <Alert style={passwordcheck_style} color="warning">Password does not match</Alert>
          </FormGroup>
          <Button color="primary">Sign up</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  signupmessage : state.signupmessage
});

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
