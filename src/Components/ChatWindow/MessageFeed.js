import React from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';
import List from '@material-ui/core/List';

export default class MessageFeed extends React.Component {
    
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
        const styles={
                height: '65vh',
                width: '100vw'
        }


        if(!this.props.roomId){
            return (
                <div className="message-list" style={styles}>
                    <div className="join-room">
                        &larr; Pick a contact
                    </div>
                </div>
            )
        }
        return (
            <div className='message-list' ref={this.messagelist} onScroll={this.onScroll} style={styles}>
            <List>
                {this.props.messages.map((message,index) => {
                    console.log("MESSAGE", message);
                    return(
                        <Message key={message.id} username={message.senderId}  text={message.text} user={this.props.user} time = {message.createdAt}/>

                        
                    )
                })}
              </List>
            </div>
        );
    }
}