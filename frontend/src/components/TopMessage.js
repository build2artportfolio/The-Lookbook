import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { } from '../actions';

class TopMessage extends React.Component {
    render() {
        let style = {};
        let error_style = {};
        this.props.topMessage ? style = { display: 'block' } : style = { display: 'none' };
        this.props.errorMessage ? error_style = { display: 'block' } : error_style = { display: 'none' };
        return (
            <div>
            <Alert className= 'topMessage' style={style} color="success">
                {this.props.topMessage}
            </Alert>
            <Alert className= 'errorMessage' style={error_style} color="danger">{this.props.errorMessage}</Alert>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    topMessage: state.topMessage,
    errorMessage: state.errorMessage
});

export default connect(
  mapStateToProps,
  {  }
)(TopMessage);