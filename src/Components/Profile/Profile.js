import React, { Component } from 'react';
import axios from 'axios'

export default class Profile extends Component {
    state = {
        user: ''
    }

    componentDidMount() {
        axios.get('/api/session/user').then(res => {
            console.log('------------ res', res)
            this.setState({
                user: res.data
            })
        })
    }
    render() {
        console.log('------------ this.state.user', this.state.user)
        return (
            !this.state.user.first_name ?
            <div>
                Loading...
            </div>
            :
            <div>
                <figure><img src={this.state.user.picture} alt="Profile" width='200'/></figure>
                <div>{this.state.user.first_name} {this.state.user.last_name}</div>
                <div>{this.state.user.email}</div>
            </div>
        );
    }
}