import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';
import { setEditForm } from '../actions';

class Post extends React.Component {
    render() {
        return (
            <Card className='card'>
                <CardImg top width="100%" src={this.props.post.imageUrl} alt="User's image" />
                <CardBody>
                    <CardTitle>{this.props.post.title}</CardTitle>
                    <CardText>{this.props.post.description}</CardText>
                    <Button onClick={e => this.props.setEditForm(this.props.post)}>Edit</Button>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { setEditForm }
)(Post);