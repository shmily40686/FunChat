import React from 'react';
import { Link } from 'react-router-dom'

class SelectGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="selectBox">
                <div className="chose-box1">
                    <div className="text-title">Join a Group</div>
                    <div>
                        <img alt='' src='./chat2.png' style={{ width: "250px", height: "240px", marginTop: "60px", marginBottom:"60px" }} />
                        <div className="text">Share in a group conversation where each member speaks in a language of their choosing and all messages are translated to the foreign language of your choosing.</div>
                    </div>
                    {
                        this.props.loggedIn ?
                            <Link to='/groupSelect' className="link-go">Let's go</Link>
                            : <Link to='/login' className="link-go">Let's go</Link>
                    }
                </div>
                <div className="chose-box2">
                    <div className="text-title">Chat with a friend</div>
                    <div>
                        <img alt='' src='./chat1.png' style={{ width: "250px", height: "240px", marginTop: "60px", marginBottom:"60px" }} />
                        <div className="text">Have a one on one conversation with a native foreign language speaker. You will be able to type in your preferred language and translate to their preferred language.</div>
                    </div>
                    {
                        this.props.loggedIn ?
                            <Link to='/chosePeople' className="link-go">Let's go</Link>
                            : <Link to='/login' className="link-go">Let's go</Link>
                    }
                </div>
            </div>
        )
    }
}

export default SelectGroup