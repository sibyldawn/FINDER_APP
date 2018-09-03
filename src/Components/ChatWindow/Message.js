import React, { Component } from 'react';

export default class Message extends Component{
    constructor(props){
        super(props)

    }

    componentDidMount(){
        
    }


    render(){
    return (
            <div className='message'>
                            <div className='message-username'>{this.props.username}</div>
                            <div className='message-text'>{this.props.text}</div>
                        </div>
        );
    }
}