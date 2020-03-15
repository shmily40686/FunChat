import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from './Messages/Messages';
import Input from './Input/Input';

import './Chat.css';

const ENDPOINT =
    process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'http://localhost:3000';
const socket = io(ENDPOINT);


const GroupChatRoom = (props) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectValue, setSelectValue] = useState("en")
    const [roomLang, setRoomLang] = useState("en")

    socket.on('roomData', ({ users }) => {
        setUsers(users);
    })

    socket.on('message', (message) => {
        setMessages([...messages, message]);
    });

    useEffect(() => {
        if (!props.user) {
            props.fetchUser(props.userId)
        } else {
            let {room} = queryString.parse(location.hash);
            room = room.toLowerCase();
            if (room === "english") {
                setRoomLang("en")
            } else if (room === "mandarin") {
                setRoomLang("zh")
            } else if (room === "spanish") {
                setRoomLang("es")
            } else if (room === "japanese") {
                setRoomLang("ja")
            } else if (room === "german") {
                setRoomLang("de")
            }
            setRoom(room);
            setName(props.user.data.username);

            if (name && room) {
                socket.emit('join', { name, room }, (error) => {
                    if (error) {
                        alert(error);
                    }
                });
            }

            return () => {
                // alert('disconnecting!');
                socket.emit('unsubscribe');
                socket.off();
            }
        }
    }, [props, room, name]);

    // useEffect(() => {
    //     alert('disconnecting!');
    //     socket.emit('disconnect');
    //     socket.off();
    // })

    const sendMessage = (event) => {
        event.preventDefault();
        fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200227T232649Z.227c7c18df34770b.9dbbb7beab7bb444f0d1c8295d51d970826edd10&text=${message}&lang=${selectValue}-${roomLang}`)
            .then((res) => res.json())
            .then((data) => {
                socket.emit('sendMessage', data.text[0], () => {
                    setMessage('')
                });
                console.log(message, messages)
                console.dir(data)
            })
    }

    return (
        <div className="outerContainer">
            <div className="room-title">{room.toUpperCase()}</div>
            <div className="choseLang-inner">
                <h3 className="title">Translate which language to {room.charAt(0).toUpperCase()}{room.substr(1).toLowerCase()}?</h3>
                <select onChange={(e) => setSelectValue(e.target.value)}>
                    <option value="en">English</option>
                    <option value="zh">Mandarin</option>
                    <option value="es">Spanish</option>
                    <option value="ja">Japanese</option>
                    <option value="de">German</option>
                </select>
            </div>
            <div className="container">
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default GroupChatRoom;