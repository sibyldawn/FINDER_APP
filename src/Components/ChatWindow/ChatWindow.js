import React, { Component } from 'react';
import MessageFeed from './MessageFeed';
import ChatForm from './ChatForm';
import Chatkit from '@pusher/chatkit';
import { withContext } from '../../ContextAPI/Context_HOC'
import { withRouter } from 'react-router-dom'
import Rooms from './Rooms';
import './ChatWindow.css'
import NewRoom from './NewRoom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100vw',
  },
});



class ChatWindow extends Component {
    constructor(){
        super()

        this.state = {
             roomId: null,
             messages:[],
             joinedRooms: [],
             id:'',
             name:'',
             picture:'',
             user:{},
             value:0
        }
    }

    componentDidMount(){
        axios.get('/users/Admin').then(response => {
            console.log("FOUND USER", response.data.body);
            this.setState({
                user: JSON.parse(response.data.body)
            },()=>{this.connectToChat()})
        }).catch(err => console.log("FIND USER ERROR",err))
              
       }
   
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  connectToChat=()=>{
    console.log("CONNECT USER ID====>", this.state.user.id)
    const chatManager = new Chatkit.ChatManager({
        instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
        userId: this.state.user.id,//change to user
        tokenProvider: new Chatkit.TokenProvider({
            url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4845df4a-abc6-4f35-87cf-999c9f6d448d/token' 
        })
    })
    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
        this.subscribeToRoom()
        
    })
    .catch( err => console.log("ERROR JOINING ROOM",err))
}

subscribeToRoom=(roomId)=>{
    this.setState({
        messages: []
    })
    this.currentUser.subscribeToRoom({
        roomId:roomId,//newroom for new connection id's
        hooks:{
            onNewMessage: message => {
                console.log('message props', message);
                this.setState({
                    messages:[...this.state.messages,message]
                })
            }
        }
   })
   .then(room => {
       this.setState({
           roomId: room.id
       })
       this.getRooms()
   })
   .catch(err => console.log("ERROR FINDING ROOM",err))
}

getRooms=()=>{
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
        this.setState({
            joinedRooms: this.currentUser.rooms 
        }) 
    })
    .catch( err => console.log("ERROR FINDING ROOM",err))

}

sendMessage=(text)=>{
    this.currentUser.sendMessage({
        text,
        roomId:this.state.roomId
    })
}



  render() {
    const { classes, theme } = this.props;
    console.log("===>index", this.state.value);
    return (
        <div>
        {this.state.user ? <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Contacts" />
            <Tab label="Chat" />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
          <Rooms rooms={[...this.state.joinedRooms]}
                       roomId ={this.state.roomId}//axios get from db
                       subscribeToRoom={this.subscribeToRoom}
                       handleChangeIndex={this.handleChangeIndex}

                />
          </TabContainer>
          <TabContainer dir={theme.direction}>
          <MessageFeed messages={this.state.messages} roomId={this.state.roomId}/>
          <ChatForm sendMessage={this.sendMessage } disabled={!this.state.roomId}/>
          </TabContainer>
   
        </SwipeableViews>
      </div>
    :
        <div>
        <h1> Log In First</h1>
        </div>
     }
     </div>
    )
  }
}

ChatWindow.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default  withRouter(withStyles(styles, { withTheme: true })(ChatWindow));
