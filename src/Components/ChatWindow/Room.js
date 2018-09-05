import React, { Component } from 'react';
import axios from 'axios';
import { withContext } from '../../ContextAPI/Context_HOC';

 class Room extends Component{
    constructor(props){
        super(props)

        this.state={
            otherUser:{}
        }
    }

    componentDidMount(){

        axios.get(`/users/${this.props.otherUserId}`).then(response => {
         this.setState({
             otherUser: JSON.parse(response.data.body)
         })
        })
    }
        
    


    render(){
        console.log("otherUser", this.state.otherUser);
    return (
            <div className='room'>
                            <img src={this.state.otherUser.avatar_url} alt="User Picture" height={100} width={100}/>
                            <h1>{this.state.otherUser.name}</h1>
                        </div>
        );
    }
}

export default withContext(Room);