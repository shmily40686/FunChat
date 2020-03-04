import React from "react";
import './chatPage.css';
import io from "socket.io-client";
import ChatRoom from './chatRoom'


class chatPageIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            room: null,
            lang: [],
            selectValue: "en",
            selectValue2: "en",
            color: ["#313131", "#47534d", "#7b8580", "#a0a8a4", "#98c4ae", "#69b890", "#348b5f", "#1f5a3c", "#0d1c14", "#000000"],
            current: 0
        }
        this.update = this.update.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
    }



    componentDidMount() {
        // this.changeColorForText()
        let that = this
        this.props.fetchUser(this.props.userId)
        .then((data) => {
            console.log("data",data)
            that.setState({
                name: data.user.data.username,
                lang: data.user.data.languages
            }, () => {
                that.setState ({
                    selectValue: this.changeToCode(that.state.lang[0])
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
        // socket = io("http://localhost:3000/")
    }

    changeColorForText() {
        let that = this
        window.changeColor = setInterval(() => {
            let index = (that.state.current + 1) % that.state.color.length
            that.setState({
                current: index
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(window.changeColor)
    }

    update(id) {
        let roomStr = `${this.props.userId}-${id}`.split("").sort().join("")
            this.setState({
                room: roomStr
            })
    }

    handleChange(e){
        this.setState({
             selectValue: e.target.value 
        },() => {
            console.log("select-value",this.state.selectValue)
        });
    }

    handleChange2(e) {
        this.setState({
            selectValue2: e.target.value
        }, () => {
            console.log("select-value", this.state.selectValue2)
        });
    }

    changeToCode(str) {
        if (str === "English") {
            return "en"
        } else if (str === "Mandarin") {
            return "zh"
        } else if (str === "Spanish") {
            return "es"
        } else if (str === "Japanese") {
            return "ja"
        } else if (str === "German") {
            return "de"
        }
    } 

    render() {
        return (
            <div>
                <div className="chatPageIndex">
                    <div className="choseLang">
                        <div className="choseLang-inner">
                            <h3 className="title" style={{ color: `${this.state.color[this.state.current]}` }}>Which language do you speak?  </h3>
                            <select onChange={this.handleChange} value={this.state.selectValue} >
                                <option value="en">English</option>
                                <option value="zh">Mandarin</option>
                                <option value="es">Spanish</option>
                                <option value="ja">Japanese</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                        <div className="choseLang-inner">
                            <h3 className="title" style={{ color: `${this.state.color[this.state.current]}`, marginLeft: "30px" }}>What would you like to translate to?  </h3>
                            <select onChange={this.handleChange2} value={this.state.selectValue2} >
                                <option value="en">English</option>
                                <option value="zh">Mandarin</option>
                                <option value="es">Spanish</option>
                                <option value="ja">Japanese</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                    </div>
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
                                <ChatRoom room={this.state.room} name={this.state.name} from={this.state.selectValue} to={this.state.selectValue2}/>
                                : <div className="chatRoom">
                                    <div className="chatRoom-hold">
                                        <div>Let's start a conversation</div>
                                        <img alt='' src='./logo.png' style={{ width: "170px", height: "160px", marginTop: "40px" }} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default chatPageIndex