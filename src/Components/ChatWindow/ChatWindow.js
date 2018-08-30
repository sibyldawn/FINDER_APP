import React, { Component } from 'react';
import MessageFeed from './MessageFeed';
import ChatForm from './ChatForm';


export default class ChatWindow extends Component {
    constructor(){
        super()
    }

    render() {
        return (
            <div className="chat-window"> CHAT WINDOW
                <Message/>
                <ChatForm/>
            
            </div>
            
        );
    }
} 