import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
    let style = { width: '6rem', height: '6rem' };
    this.props.loginspinner ? style = { width: '6rem', height: '6rem' } : style = { display: 'none' };
    return (
      <div>
        <Spinner className="spinner" color="primary" style={style} />
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
            <Button className='buttonz'>Log in</Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginspinner: state.loginspinner
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
