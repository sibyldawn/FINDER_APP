import React, {Component} from 'react';
import ChatForm from './ChatForm';
import Message from './Message';
import './ChatWindow.css';


export default class ChatWindow extends Component{
    

    render(){
        
        return (
            <div className="chat-window">
            <Message/>
            <ChatForm/>
            </div>
        )
    }
}
