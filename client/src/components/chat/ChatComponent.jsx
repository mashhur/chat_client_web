import { Card, CardText } from 'material-ui/Card';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import  RaisedButton from 'material-ui/RaisedButton';

const ChatComponent = ({
    onSendMessage,
    errors,
    }) => (

    <Card className="container">
        <CardText>Chat page!</CardText>
        <div>
            <TextField
                floatingLabelText="Insert text to send..."
                name="user_insert_text"
            />
            <RaisedButton onTouchTap={onSendMessage} label="Send message" primary />
        </div>

        <Link to={'/logout'}>Logout</Link>
    </Card>
);

ChatComponent.propTypes = {
    onSendMessage: PropTypes.func.isRequired
};

export default ChatComponent;