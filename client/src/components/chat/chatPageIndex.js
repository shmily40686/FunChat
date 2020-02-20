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
                        <div className="friendList">{
                            this.props.user ?
                            this.props.user.data.contacts.map((friend,i) => (
                                <li key={i} onClick={() => this.update(friend._id)}>{friend.username}</li>
                            )) :
                            null
                        }</div>
                        { this.state.room ? 
                            <ChatRoom room={this.state.room} name={this.state.name} />
                            :<div className="chatRoom">Not room</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default chatPageIndex