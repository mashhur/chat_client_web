import React, { PropTypes } from 'react';
import ChatComponent from '../../components/chat/ChatComponent.jsx';
import startChat, { sendData } from '../../utils/chat';
import Auth from '../../modules/Auth';

class Chat extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);
        // set the initial component state
        this.state = { };

        const socketServerURL = 'http://127.0.0.1:3000/chat'
            + '?user_pid=' + Auth.getPid()
            + '&user_token=' + Auth.getToken();

        startChat(socketServerURL);
    }

    sendMessage(event) {
        console.log(event);

        sendData("user_message_v5", "Hello World!");
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ChatComponent
                onSendMessage = {this.sendMessage}
            />
        );
    }
}

export default Chat;