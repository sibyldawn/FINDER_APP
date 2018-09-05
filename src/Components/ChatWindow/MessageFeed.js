import React from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';

export default class MessageFeed extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight        
    }

    componentDidUpdate(){
        if(this.shouldScrollToBottom){
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        if(!this.props.roomId){
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className='message-list' ref={this.messagelist} onScroll={this.onScroll}>
                {this.props.messages.map((message,index) => {
                    console.log("MESSAGE", message);
                    return(
                        <Message key={message.id} username={message.senderId}  text={message.text}/>

                        
                    )
                })}
              
            </div>
        );
    }
}