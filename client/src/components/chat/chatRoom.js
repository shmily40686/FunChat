
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from './Messages';
import Input from './input';


let socket;

const ChatRoom = (props) => {
    const [name, setName] = useState(props.name);
    const [room, setRoom] = useState(props.room);
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:3000/';


    useEffect(() => {
        socket = io(ENDPOINT);

        if (room !== props.room) {
            console.log('resetting messages');
            setMessages([]);
        }

        setRoom(props.room);
        setName(props.name);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            // alert('disconnecting!');
            socket.emit('unsubscribe');
            socket.off();
        }

    }, [props,room]);

    // useEffect(() => {
    //     alert('disconnecting!');
    //     socket.emit('disconnect');
    //     socket.off();
    // })

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
        console.log(message,messages)
    }

    return (
        <div className="chatRoom" data-room={room}>
          {/* <input value={message} onChange={(event) => setMessage(event.target.value)} 
          onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
          /> */}
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}

export default ChatRoom;