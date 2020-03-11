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
                    <div className="text-title">Join A Group Room</div>
                    <div>
                        <img alt='' src='./chat2.png' style={{ width: "250px", height: "240px", marginTop: "60px", marginBottom:"60px" }} />
                        <div className="text">you can choose a group languese people to talk.. balalalla</div>
                    </div>
                    {
                        this.props.loggedIn ?
                            <Link to='/groupSelect' className="link-go">Let's go</Link>
                            : <Link to='/login' className="link-go">Let's go</Link>
                    }
                </div>
                <div className="chose-box2">
                    <div className="text-title">Talk with A Foreign Friend</div>
                    <div>
                        <img alt='' src='./chat1.png' style={{ width: "250px", height: "240px", marginTop: "60px", marginBottom:"60px" }} />
                        <div className="text">add a foreign friend, make you and him have no problem to talk..balalalla</div>
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