import React, { Component } from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';

export default class MessageFeed extends Component {
    constructor(props){
        super(props);

    }

    componentDidUpdate(){
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight
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