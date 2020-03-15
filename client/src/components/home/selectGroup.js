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
                        <div className="text">Choose which language you wish to speak</div>
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
                        <div className="text">Add a friend based on their language</div>
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