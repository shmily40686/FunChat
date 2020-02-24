import React from "react";
import './chatPage.css';
import io from "socket.io-client";
import ChatRoom from './chatRoom'


class chatPageIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            room: null
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        let that = this
        this.props.fetchUser(this.props.userId)
        .then((data) => {
            console.log("data",data)
            that.setState({
                name: data.user.data.username
            })
        })
        // socket = io("http://localhost:3000/")
    }

    update(id) {
        let roomStr = `${this.props.userId}-${id}`.split("").sort().join("")
            this.setState({
                room: roomStr
            })
    }

    render() {
        return (
            <div>
                <div className="chatPageIndex">
                    <div className="chat">
                        <div className="friendList">
                        <div className="chat-header">Friend List</div>
                        {
                            this.props.user ?
                            this.props.user.data.contacts.map((friend,i) => (
                                <li  className="friend-list-enter"key={i} onClick={() => this.update(friend._id)}>
                                    <img className="list-img" src={friend.picture}></img>
                                    <div style={{marginLeft:"20px", fontSize:"18px"}}>{friend.username}</div>
                                </li>
                            )) 
                            : null
                        }
                        </div>
                        <div className="chat-box">
                            <div className="chat-header">Chat Room</div>
                            {this.state.room ?
                                <ChatRoom room={this.state.room} name={this.state.name} />
                                : <div className="chatRoom">Not room</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default chatPageIndex