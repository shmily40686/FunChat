import React from "react";
import * as APIUtil from '../../util/users_api_util';
// import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SelectPage extends React.Component {
    constructor(props){
        super(props)
        this.select = this.select.bind(this)
        this.goToNext = this.goToNext.bind(this)
    }

    componentDidMount() {
        this.props.fetchUser(this.props.userId)
        this.props.fetchUsers(this.props.language)
    }

    select(e) {
        e.target.style.backgroundColor = "#e83e3e"
        e.target.innerText = "Added"
        const data =  {
            id: this.props.userId,
            friend: e.target.dataset.id
        }
        APIUtil.addFriend(data)
    }

    goToNext() {
        this.props.history.push('/chatPage')
    }

    render() {
        return (
            <div>
                {
                    this.props.users ?
                        <div className="cards-box">
                            {
                                this.props.users.data
                                // .flitter((each) => {
                                //     return !this.props.user.data.contacts.includes(each)
                                // })
                                .map((person, i) => (
                                    <div key={i} className="card">
                                        <img className="head-img" src={person.picture}></img>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <div className="username">{person.username}</div>
                                            <div className="languages">Speaks: {
                                                person.languages.map((each, i) => (
                                                    <div  key={i} style={{ marginLeft: "10px" }}>{each}</div>
                                                ))
                                            }</div>
                                        </div>
                                        <button className="card-add-button" data-id={`${person._id}`} onClick={this.select}>Add</button>
                                    </div>
                                ))
                            }
                        </div>
                        : null
                }
                <div className="card-add-button" style={{width:"200px",marginBottom: "100px", marginTop: "30px"}} onClick={this.goToNext}>Next</div>
            </div>
        )
    }
}

export default SelectPage