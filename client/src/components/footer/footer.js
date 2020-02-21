import React from "react";
import './footer.css';
import { faGithub,faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="footer">
                    <div>
                        <a href="https://www.linkedin.com/in/lingxiaowen/" className="link"><FontAwesomeIcon icon={faGithub} className="work-icon" /></a>
                        <a href="https://github.com/shmily40686" className="link"> <FontAwesomeIcon icon={faLinkedin} className="work-icon" /></a>
                    </div>
                    <span className="copy-right">© Fun Chat, 2020</span>
                </div>
            </div>
        )
    }
}

export default Footer