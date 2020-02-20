import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    }

    
    componentWillUnmount() {
        this.props.clearErrors();
    };

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.length === 0) return null;

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user).then(() => this.props.signedIn ? this.props.closeModal() : "")

       
    }

    handleDemoSubmit(e) {
        e.preventDefault();
        const user = {
            email: "demoUser@demo.com",
            password: "123456"
        }
        this.demo(user)
        
    }
    demo(user) {    
        const intervalSpeed = 75;

        const { email, password } = user;
        const { login } = this.props;
        const demoEmailTime = email.length * intervalSpeed;
        const demoPasswordTime = password.length * intervalSpeed;
        const buffer = intervalSpeed * 2;
        const totalDemoTime = demoEmailTime + demoPasswordTime + buffer;

        this.demoEmail(email, intervalSpeed);

        setTimeout(() => this.demoPassword(password, intervalSpeed), demoEmailTime);

        
        setTimeout(() => { 
            login(user)
        }, totalDemoTime)


        
    }

    demoEmail(email, intervalSpeed) {
        let i = 0;

        setInterval(() => {
            if (i <= email.length) {
                this.setState({ email: email.slice(0, i) })
                i++
            } else {
                clearInterval()
            }
        }, intervalSpeed);
    }

    demoPassword(password, intervalSpeed) {
        let j = 0;

        setInterval(() => {
            if (j <= password.length) {
                this.setState({ password: password.slice(0, j) })
                j++
            } else {
                clearInterval();
            }
        }, intervalSpeed);
    }

    renderErrors(field) {
        const err = Object.keys(this.props.errors).filter((error) => (
            error === field
        ))
        return (
            <ul>
                {
                    this.props.errors[err]
                }

            </ul>
        );
    }

    render() {
        return (
          <div className="session-form">
              <h1>Log In</h1>
              <button className="close-form" type="button" onClick={() => this.props.history.push("/")}>×</button>
                <form onSubmit={this.handleSubmit} className="signup-form">
                    <div className="session-inputs">
                        {/* <br /> */}
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            className="login-input"
                        />
                        <div className="session-errors">{this.renderErrors("email")}</div>
                        {/* <br /> */}
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="login-input"
                        />
                        <div className="session-errors">{this.renderErrors("password")}</div>
                        {/* <br /> */}
                        <input type="submit" value="Submit" className="session-submit" />

                    </div>
                    <p className="session-footer">Don't have an accont? &nbsp;
                       <button
                            className="session-footer-button"
                            type="button"
                            onClick={() => this.props.history.push('/signup')}>Sign up
                       </button>.
                   </p>
                    <p className="session-footer">
                        Can't commit? Explore our site with a &nbsp;
                    <button
                            className="session-footer-button"
                            type="button"
                            onClick={this.handleDemoSubmit}
                        >
                            demo login
                  </button>.
                  </p>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);