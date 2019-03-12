import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';

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
      <div>
          
      </div>
    );
  }
}

export default connect(
  null,
  { signUp }
)(SignUp);
