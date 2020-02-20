import React from 'react';
import './navbar.css';
import { withRouter } from 'react-router';
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidUpdate(prevProps) {
        const res = this.props.location.pathname.match("/search/(.*)")
        if (this.props.location.pathname !== prevProps.location.pathname && !res) {
            this.setState({ word: '' });
        }
    }

    backToHome() {
        this.props.history.push("/")
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <button className="loginButton" onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div style={{display: "flex"}}>
                    <button className="loginButton" onClick={() => this.props.history.push('/signup')}>Sign up</button>
                    <button className="loginButton" onClick={() => this.props.history.push('/login')} >Log in</button>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="nav-bar-container">
                <img alt='' src='./logo.png' style={{ width: "60px", height: "60px", marginLeft:"20px" }} />
                <div className="user-box">
                    {
                        this.props.loggedIn ?
                            <FontAwesomeIcon icon={faUser} className="user-icon" onClick={() => this.props.history.push("/chatPage")} />
                            : null   
                    }
                    {this.getLinks()}
                </div>
            </div>
        );
    }
}

export default withRouter(NavBar);