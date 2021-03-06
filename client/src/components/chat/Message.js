import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim()[0].toUpperCase();

    if (user === name.trim().toLowerCase()) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pr-10">{trimmedName}</p>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <p className="sentText pl-10 ">{user.trim()[0].toUpperCase()}</p>
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
    );
}

export default Message;