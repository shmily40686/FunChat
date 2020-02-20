import React from 'react';
import { Link } from 'react-router-dom'
import './home.css'


class Home extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="background-video">
                    <video loop autoPlay muted >
                        <source src='//res.wx.qq.com/a/wx_fed/wechat-main-page-frontend/res/static/res/1QzwDFl.mp4' type="video/mp4" />
                    </video>
                </div>
                <div className="title-box">
                    <div className="title">Start a conversation with the world!</div>
                    <Link to='/chosePeople' className="link-go">GO</Link>
                </div>
            </div>
        );
    }
}

export default Home;