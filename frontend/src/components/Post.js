import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';

class Post extends React.Component {
    render() {
        return (
            <Card className='card'>
                <CardImg top width="100%" src={this.props.post.imageUrl} alt="User's image" />
                <CardBody>
                    <CardTitle>{this.props.post.title}</CardTitle>
                    <CardText>{this.props.post.description}</CardText>
                    <Button>Edit</Button>
                </CardBody>
            </Card>
        );
    }
}

export default Post;