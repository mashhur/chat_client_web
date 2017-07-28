import { Card, CardText } from 'material-ui/Card';
import React from 'react';
import { Link } from 'react-router';

const ChatComponent = ({
        errors,
    }) => (

    <Card className="container">
        <CardText>Chat page!</CardText>
        <Link to={'/logout'}>Logout</Link>
    </Card>
);

export default ChatComponent;