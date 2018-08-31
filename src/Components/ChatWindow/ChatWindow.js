import React, { Component } from 'react';
import MessageFeed from './MessageFeed';
import ChatForm from './ChatForm';
import Chatkit from '@pusher/chatkit';
import Rooms from './Rooms';
import './ChatWindow.css'


export default class ChatWindow extends Component {
    constructor(){
        super()

        this.state = {
             messages:[],
             joinedRooms: []
        }
    }
    //Connecting to Chat UI Kit 
    componentDidMount(){
        const chatManager = new Chatkit.ChatManager({
            instanceLocator:`${process.env.REACT_APP_INSTANCE_LOCATOR}`,
            userId: 'Admin',//change to user
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4845df4a-abc6-4f35-87cf-999c9f6d448d/token' //for testing only
            })
        })
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser

            this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinedRooms: this.currentUser.rooms 
                }) 
            })
            .catch( err => console.log("ERROR FINDING ROOM",err))



            this.currentUser.subscribeToRoom({
                 roomId:15069282,//newroom for new connection id's
                 hooks:{
                     onNewMessage: message => {
                         console.log('message.text', message.text);
                         this.setState({
                             messages:[...this.state.messages,message]
                         })
                     }
                 }
            })
        })
        .catch( err => console.log("ERROR JOINING ROOM",err))
    }

    sendMessage=(text)=>{
        this.currentUser.sendMessage({
            text,
            roomId:15069282
        })
    }

    render() {
       
        return (
            <div className="chat-window">
                <Rooms rooms={this.state.joinedRooms}/>
                <br/> 
                <MessageFeed messages={this.state.messages}/>
                <ChatForm sendMessage={this.sendMessage }/>
                
            </div>
            
        );
    }
} 