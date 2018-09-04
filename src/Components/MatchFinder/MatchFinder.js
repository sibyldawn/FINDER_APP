import React from 'react';
import MotionStack from 'react-motion-stack';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { withContext } from '../../ContextAPI/Context_HOC'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import 'react-motion-stack/build/motion-stack.css';
import PropTypes from 'prop-types';
import UserCard from '../Card/Card';
import './MatchFinder.css';
import axios from 'axios'
import Chatkit from '@pusher/chatkit';

const styles = theme => ({
  formControl: {
      margin: theme.spacing.unit,
      minWidth: 200,
  },
});

class App extends React.Component {
  constructor(){
    super()
      this.state = {
        industry: '',
        cards: [],
        user1: {},
        user2:{},
        room_id: 0,
        roomName: '',
        connection_id:0 
      }

      this.deck = React.createRef();
  }

  componentDidMount(){
    console.log('----------CONTEXT', this.props.context)
    axios.get(`/api/users/filter?industry=${this.props.context.user.industry_code}&recruiter=${!this.props.context.user.isrecruiter}`).then(res => {
      console.log('------------ COMPONENT DID MOUNT GET ID', res)
      this.setState({
        cards: res.data
      })
    })
  }

  // Activated after a swipe action on <MotionStack/> is completed. Uses swipe direction.
  onBeforeSwipe = (swipe, direction, state) => {
    console.log('direction', direction);
    console.log('state', state.data[0].element.props.id);
    const {auth0_id, isrecruiter, email, first_name} = this.props.context.user

    axios.post('/api/user/matches', {
        direction, 
        userId: auth0_id, 
        cardId: state.data[0].element.props.id, 
        isRecruiter: isrecruiter,
        email,
        first_name
    }).then(res => {
      console.log('------------ res ', res )
      if(res.data !== false ){
        const name = `${res.data[0].applicant_id} + ${res.data[0].recruiter_id}`
  
        this.setState({
        user1: res.data[0].applicant_id,
        user2: res.data[0].recruiter_id,
        roomName: name,
        connection_id: res.data[0].id
        },()=>{this.connectToChat()})
    }})
    swipe();
  }

  onSwipeEnd = ({ data }) => {
    console.log('data', data);
  //   if(data !== false ){
  //     const name = `${data[0].applicant_id} + ${data[0].recruiter_id}`

  //     this.setState({
  //     user1: data[0].applicant_id,
  //     user2: data[0].recruiter_id,
  //     roomName: name,
  //     connection_id: data[0].id
  //     },()=>{this.connectToChat()})
      
  // }
  };

  connectToChat=()=>{
    console.log("CONNECT USER ID====>", this.props.context.user.auth0_id)

    const chatManager = new Chatkit.ChatManager({
        instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
        userId: this.props.context.user.auth0_id,//change to user
        tokenProvider: new Chatkit.TokenProvider({
            url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4845df4a-abc6-4f35-87cf-999c9f6d448d/token' 
        })
    })
    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        this.createRoom()
        
        
    })
    .catch( err => console.log("ERROR JOINING ROOM",err))
}

  
  
  createRoom=()=>{
    const { roomName, user1, user2 } = this.state;
    this.currentUser.createRoom({
        name: roomName,
        private: true,
        addUserIds: [`${user1}`,`${user2}`]//Add user 1 and user 2
    })
    .then(room => {
        console.log("new room Id", room.data);
        this.subscribeToRoom(room.id)
        this.sendRoomToDB()
    })
    .catch(err => console.log('create room error',err))
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
         room_id: room.id
     })
     
 })
 .catch(err => console.log("ERROR SUBSCRIBING TO ROOM",err))
}


sendRoomToDB=()=>{

  const newRoom = {
    connection_id: this.state.connection_id,
    room_id:+this.state.room_id,
    room_name: this.state.roomName
}
console.log("new ROOM=====>", newRoom)
  axios.post('/api/rooms',newRoom).then( response => {
    console.log("new room =====>", response);
  }).catch( err => console.log("Room not recorded", err))
}



  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

 

  componentDidUpdate(prevProps) {
    if(this.props.context.user !== prevProps.context.user) {
      axios.get(`/api/users/filter?industry=${this.props.context.user.industry_code}&recruiter=${!this.props.context.user.isrecruiter}`).then(res => {
        console.log('------------ COMPONENT UPDATE GET ID', res)
        this.setState({
          cards: res.data
        })
      })
    }
  }

  render() {
    console.log("CHAT ROOMS=======>", this.state);

      const { classes, context } = this.props
      let userCards = this.state.cards.map(user => <UserCard id={user.auth0_id} draggable={false} />)
      console.log('------------ userCards', userCards)
      const data = Array.from({ length: this.state.cards.length }, (_, i) => ({
        id: new Date().getTime() + i,
        element: (
          userCards[i]
        )
      }));
    console.log("data",data);
    console.log(this.deck)
    return (
      context.login ?
        <div className="demo-wrapper">
 
          <MotionStack
            data={data}
            onSwipeEnd={this.onSwipeEnd}
            onBeforeSwipe={this.onBeforeSwipe}
            render={props => props.element}
            renderButtons={this.renderButtons}
            infinite={false}
          />
        </div>
      :
      <div>No user logged in.</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(App));

