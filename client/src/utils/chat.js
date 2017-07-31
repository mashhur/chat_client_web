import io from 'socket.io-client';

var socket = null;

/*
private static final String SEND_MESSAGE = "user_message_v5";
private static final String MESSAGE_DELIVERY = "message_delivery_v5";
private static final String GET_HISTORY = "session_history_v5";
private static final String SEND_ACTION = "session_action_v5";
private static final String UPDATE_MESSAGE = "update_message_v5";

private static final String MESSAGE_LISTEN = "user_message_v5";
private static final String HISTORY_LISTEN = "session_history_v5";
private static final String DELIVERY_LISTEN = "message_delivery_v5";
private static final String ACTION_LISTEN = "session_action_v5";
private static final String UPDATE_LISTEN = "update_message_v5";
private static final String USER_INFO_LISTEN = "login_v5";
*/

export default function startChat(url, user_pid, user_token) {
    try {
        socket = io(url, {transports: ['websocket'], upgrade: false}, {'force new connection': true});

        console.log("Socket connection start...", url);
        console.log("Socket status: ", socket);
    } catch(exception){
        console.log("Socket exception: ", exception);
    }

    // Отключение сокета
    socket.on('disconnect', function(data) {
        socket.close();
        console.log('> disconnect', data);
    });

    // Подключение сокета
    socket.on('connect', function(data) {
        console.log('> connect', data);

    });


    socket.on('user_message_v5', function(data) {
        console.log('> user_message_v5', data);
    });

    // Пришло хистори
    socket.on('session_history_v5', function(data) {
        console.log('> session_history_v5', data);
    });

    // Пришло подтверждение о получении сообщения
    socket.on('message_delivery_v5', function(data) {
        console.log('> message_delivery_v5', data);
    });

    // Пришла чьято активность в чате
    socket.on('session_action_v5', function(data) {
        console.log('> session_action_v5', data);
    });

    socket.on('update_message_v5', function(data) {
        console.log('> update_message_v5', data);
    });

    socket.on('login_v5', function(data) {
        console.log('> login_v5', data);
    });
}

export function sendData(message_type, data){
    socket.emit(message_type, data);
}