import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';
const socket = socketIoClient("http://localhost:4000");

// const socketUrl = "http://localhost:4000";

const dummy_text = [
    {
        senderId: '1',
        text:'Hey, what are you doing?'
    },
    {
        senderId: '2',
        text:'Just chilling,how about you?'
    },
    {
        senderId:'1',
        text: 'Want to go out for lunch?'
    },
    {
        senderId:'2',
        text: 'Sure!'
    }
       

]


export default class Message extends Component {
    constructor(props){
        super(props);

        this.state={
        }

        socket.on("message", (message)=> {
            this.setState({
                message: message
            })
        })

    }

    componentDidMount(){
    }

    message =()=> {
        socket.emit("sibyl", "hello")
    }
    
    render() {
        return (
            <div className='message-list'>
                {dummy_text.map((message,index) => {
                    return(
                        <div className='message' key={index}>
                            <span className='message-sender'>{message.senderId}</span>
                            <span className='message-text'>{message.text}</span>
                        </div>
                    )
                })}
                {this.state.message}
                <button onClick={this.message}>press</button>
            </div>
        );
    }
}