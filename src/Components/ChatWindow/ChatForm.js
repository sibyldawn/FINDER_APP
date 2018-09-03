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
        return (
            <div>
             <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
            </div>
        );
    }
}