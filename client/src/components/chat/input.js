import React from 'react';


const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
)


// class Input extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             value: ""
//         }
//         this.translate = this.translate.bind(this)
//     }

//     translate(value) {
//         let that = this
//         fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200227T232649Z.227c7c18df34770b.9dbbb7beab7bb444f0d1c8295d51d970826edd10&text=${value}&lang=en-zh`)
//         .then(res => res.json)
//         .then((data) => {
//             that.props.setMessage(data.text)
//         })
//     }

//     render() {
//        return(
//            <form className="form">
//                <input
//                    className="input"
//                    type="text"
//                    placeholder="Type a message..."
//                    onChange={({ target: { value } }) => this.translate(value)}
//                    onKeyPress={event => event.key === 'Enter' ? this.props.sendMessage(event) : null}
//                />
//                <button className="sendButton" onClick={e => this.props.sendMessage(e)}>Send</button>
//            </form>
//        ) 
//     }
// }

export default Input;