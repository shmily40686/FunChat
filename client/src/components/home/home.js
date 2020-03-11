import React from 'react';
import SelectGroupContainer from './selectGroup_container'
import { Link } from 'react-router-dom'
import './home.css'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ["#313131", "#47534d", "#7b8580", "#a0a8a4", "#98c4ae", "#69b890", "#348b5f", "#1f5a3c", "#0d1c14", "#000000"],
            current: 0,
            changeColor:null
        }
        this.changeColorForText = this.changeColorForText.bind(this)
    }

    componentDidMount() {
        this.changeColorForText()
    }


    changeColorForText() {
        let that = this
       window.changeColor = setInterval(() => {
           let index = (that.state.current + 1) % that.state.color.length
            that.setState({
                current: index
            })
       },1000)
    }

    componentWillUnmount() {
        clearInterval(window.changeColor)
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
                    <div id="title" style={{ color: `${this.state.color[this.state.current]}`}}>Start a conversation with the world!</div>
                    {
                        this.props.loggedIn?
                        <Link to='/chosePeople' className="link-go">Let's go</Link>
                        : <Link to='/login' className="link-go">Let's go</Link>
                    }
                </div>
                <div className="mid-div"></div>
                <SelectGroupContainer />
            </div>
        );
    }
}

export default Home;