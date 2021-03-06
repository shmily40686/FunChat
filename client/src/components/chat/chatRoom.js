
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from './Messages';
import Input from './input';
import { Message } from "semantic-ui-react";

const ENDPOINT =
    process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'http://localhost:3000';
const socket = io(ENDPOINT);

const ChatRoom = (props) => {
    const [name, setName] = useState(props.name);
    const [room, setRoom] = useState(props.room);
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    socket.on('roomData', ({ users }) => {
        setUsers(users);
    })

    socket.on('message', (message) => {
        setMessages([...messages, message]);
    });

    useEffect(() => {

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

    const sendMessage = (event) => {
        event.preventDefault();
        if (!message) return;

        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200227T232649Z.227c7c18df34770b.9dbbb7beab7bb444f0d1c8295d51d970826edd10&text=${message}&lang=${props.from}-${props.to}`)
            .then((res) => res.json())
            .then((data) => {
                socket.emit('sendMessage', data.text[0], () => {
                    setMessage('')
                });
            })
            .catch(err => console.error(err));
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