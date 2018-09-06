import React from 'react';
import MotionStack from 'react-motion-stack';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { withContext } from '../../ContextAPI/Context_HOC'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import JobMatched from '../JobMatched/JobMatched'
import 'react-motion-stack/build/motion-stack.css';
import PropTypes from 'prop-types';
import UserCard from '../Card/Card';
import './MatchFinder.css';
import axios from 'axios'
import Chatkit from '@pusher/chatkit';
import { CSSTransition ,TransitionGroup } from "react-transition-group";

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
        connection_id:0,
        joinedRooms:[],
        appearHome: true
      }

      this.deck = React.createRef();
  }

  componentDidMount(){
    // console.log('----------CONTEXT', this.props.context)
    axios.get(`/api/users/filter?industry=${this.props.context.user.industry_code}&recruiter=${!this.props.context.user.isrecruiter}`).then(res => {
      console.log('------------ COMPONENT DID MOUNT GET ID', res)
      this.setState({
        cards: res.data
      })
    })
  }

  // Activated after a swipe action on <MotionStack/> is completed. Uses swipe direction.
  onBeforeSwipe = (swipe, direction, state) => {
    // console.log('direction', direction);
    // console.log('state', state.data[0].element.props.id);
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
        
        this.props.context.methods.toggleMatchEvent()
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
        //Check if room has been made
        this.getRooms()

        
        
    })
    .catch( err => console.log("ERROR JOINING ROOM",err))
  }

getRooms=()=>{
  this.currentUser.getJoinableRooms()
  .then(joinableRooms => {
      this.setState({
          joinedRooms: this.currentUser.rooms 
      },()=>{this.createRoomOrNot()}) 
  })
  .catch( err => console.log("ERROR FINDING ROOM",err))

}


createRoomOrNot=()=>{
  const { joinedRooms ,roomName} = this.state;
  const roomExists = joinedRooms.includes(roomName)
  if( !roomExists ){
  const { roomName, user1, user2 } = this.state;
  this.currentUser.createRoom({
      name: roomName,
      private: true,
      addUserIds: [`${user1}`,`${user2}`]//Add user 1 and user 2
  })
  .then(room => {
      console.log("new room Id", room.data);
        this.setState({
            room_id: room.id
   },()=>{this.sendRoomToDB()})
    
  }) .catch(err => console.log('create room error',err))
 }else{
  console.log(`Room ${roomName} already exists`);
 }
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

    const {appearHome} = this.state;


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
        <div className="card-container">
          <TransitionGroup>
            <CSSTransition
              in={appearHome}
              appear={true}
              timeout={600}
              classNames="fade">
                <MotionStack
                  data={data}
                  onSwipeEnd={this.onSwipeEnd}
                  onBeforeSwipe={this.onBeforeSwipe}
                  render={props => props.element}
                  renderButtons={this.renderButtons}
                  infinite={false}
                />
              </CSSTransition>
          </TransitionGroup>
          {this.props.context.matchEvent && <JobMatched/>}
        </div>
      :
        <div className="NoUser">No user logged in.</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(App));

