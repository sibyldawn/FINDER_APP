import React, { Component } from 'react';
import MessageFeed from './MessageFeed';
import ChatForm from './ChatForm';
import Chatkit from '@pusher/chatkit';
import { withContext } from '../../ContextAPI/Context_HOC'
import { withRouter } from 'react-router-dom'
import Rooms from './Rooms';
import './ChatWindow.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
    width: '100vw',
    position:'fixed',
    top:60,
    color:'white',
  },
  container: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
  },
  roomListContainer: {
    width: '15%',
    padding: 20,
    height:'80vh',
    backgroundColor: '#2c303b',
    color: 'white',
  },
  chatContainer: {
    height: '80vh',
    display: 'flex',
    flex: 1,
    height: '100vh'
  },
  chatListContainer: {
    padding: 20,
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
  },
});



class ChatWindow extends Component {
    constructor(props){
        super(props)

        this.state = {
          roomId: 0,
          messages:[],
          joinedRooms: [],
          id:'',
          name:'',
          picture:'',
          user:{},
          value:0,
          room_users:[],
          sender:{},
          usersWhoAreTyping: [],
          currentRoom: {}
        }
    }



    componentDidMount(){
    console.log('auth0_id', this.props.context.user.auth0_id);
        axios.get(`/api/users/${this.props.context.user.auth0_id}`).then(response => {
            console.log("FOUND USER", response.data.body);
            this.setState({
                user: JSON.parse(response.data.body)
            },()=>{this.connectToChat()})
        }).catch(err => console.log("FIND USER ERROR",err))
       }
   
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({
        value: index 
    })
 }


  connectToChat=()=>{
    console.log("CONNECT USER ID====>", this.state.user.id)
    const chatManager = new Chatkit.ChatManager({
        instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
        userId: this.state.user.id,//change to user
        tokenProvider: new Chatkit.TokenProvider({
            url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e9f2af90-4758-4eed-8d0d-f1e5faa192f5/token' 
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
        messageLimit:100,
        hooks:{
            onNewMessage: message => {
                console.log('message props', message);
                this.setState({
                    messages:[...this.state.messages,message]
                })
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
              })
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              })
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
        }
   })
   .then(room => {
       this.setState({
           roomId: room.id,
           currentRoom: room
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
    console.log('CONTEXT USER', this.props.context.user);
    const { classes, theme } = this.props;
    console.log("CHATWINDOW room_users", this.state.room_users);
  
    return (
        <div className={classes.container}>
        
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
        <div className={classes.chatContainer}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
          {/* <OnlineStatus user={this.state.user} users ={this.state.currentRoom.users}/> */}
         
          <Rooms rooms={[...this.state.joinedRooms]}
                       roomId ={this.state.roomId}//axios get from db
                       subscribeToRoom={this.subscribeToRoom}
                       handleChangeIndex={this.handleChangeIndex}
                       roomUsers = {this.state.room_users}
                       user = {this.state.user}
                       sender={this.state.sender}
                       getOtherUser = {this.getOtherUser}

                />
            
          </TabContainer>
          <TabContainer dir={theme.direction} className={classes.chatListContainer}>
          <MessageFeed messages={this.state.messages} roomId={this.state.roomId} user={this.state.user}/>
          <ChatForm sendMessage={this.sendMessage } disabled={!this.state.roomId}/>
          </TabContainer>
   
        </SwipeableViews>
        </div>
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


export default  withContext(withStyles(styles, { withTheme: true })(ChatWindow));
