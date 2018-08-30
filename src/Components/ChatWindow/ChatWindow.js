import React, { Component } from 'react';
import MessageFeed from './MessageFeed';
import ChatForm from './ChatForm';
import Chatkit from '@pusher/chatkit';


export default class ChatWindow extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        const chatManager = new Chatkit.ChatManager({
            instanceLocator:`${process.env.REACT_APP_INSTANCE_LOCATOR}`,
            userId: 'Admin',
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4845df4a-abc6-4f35-87cf-999c9f6d448d/token'
            })
        })
        chatManager.connect()
        .then(currentUser => {
            currentUser.subscribeToRoom({
                 roomId:15069282,
                 hooks:{
                     onNewMessage: message => {
                         console.log('message.text', message.text);
                     }
                 }
            })
        })
    }

    render() {
        return (
            <div className="chat-window"> CHAT WINDOW
                <MessageFeed/>
                <ChatForm/>
            
            </div>
            
        );
    }
} 