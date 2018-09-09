import React, { Component } from 'react';

export default class ChatForm extends Component {
    constructor(){
        super();

        this.state = {
            text: ''
        }
    }

    handleChange=(e)=>{
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.sendMessage(this.state.text)
        this.setState({
            text:''
        })
    }

    render() {
       
        const inputStyle ={
            width: '75vw',
            height:'5vh',
            zIndex:1
        }
        return (
            <div >
             <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.text}
                    placeholder="Type your message and hit ENTER"
                    type="text" style={inputStyle}/>
                     <button id="send-message-form-btn" type="submit" width={100}>✉️</button>
            </form>
            </div>
        );
    }
}