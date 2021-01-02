import React from 'react';

const Notification = ({message}) => {
    if (message == null) {
        return <div/>;
    }

    return <div className={`notification notification--${message.type}`}>{message.text}</div>;
};

export default Notification;