import React, { Component } from 'react';

export default class ChatForm extends Component {
    render() {
        return (
            <div className="chat-form">
                <input type="text"/><button>SEND</button>
            </div>
        );
    }
}