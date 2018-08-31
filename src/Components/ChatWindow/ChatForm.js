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
            <form className="send-message-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Type your text and hit Enter..." onChange={this.handleChange} value={this.state.text} className="text-input"/>
                <input type="submit" value="Submit" style={{ width: 50, background:'tomato'}} className="submit-button"/>
            </form>
            </div>
        );
    }
}