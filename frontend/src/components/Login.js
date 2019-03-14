import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component {
  state = {
    credentials: {
      username: 'David',
      password: '123'
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
  
  login = e => {
    e.preventDefault();
    this.props.login(this.state.credentials).then(() => {
      this.props.history.push('/');
    });
  };


  render() {
    return (
      <div className="LoginForm">
          <Form onSubmit={this.login}>
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
          <Button color="primary">Log in</Button>
        </Form>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
