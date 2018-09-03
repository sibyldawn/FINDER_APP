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


    onScroll =()=>{
        console.log("fetching past messages");
    }




    render() {
        return (
            <div className='message-list' ref={this.messagelist} onScroll={this.onScroll}>
                {this.props.messages.map((message,index) => {
                    return(
                        <Message key={index} username={message.senderId} text={message.text}/>

                        
                    )
                })}
              
            </div>
        );
    }
}