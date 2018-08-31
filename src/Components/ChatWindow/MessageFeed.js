import React, { Component } from 'react';
import Message from './Message';

export default class MessageFeed extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className='message-list'>
                {this.props.messages.map((message,index) => {
                    return(
                        <Message key={index} username={message.senderId} text={message.text}/>

                        
                    )
                })}
              
            </div>
        );
    }
}