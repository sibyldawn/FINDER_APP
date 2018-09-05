import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FindInPageSharp from '@material-ui/icons/FindInPageSharp';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import './JobMatched.scss';
import { Link } from 'react-router-dom';
import handshake from './handshake.png';
import axios from 'axios';

const styles = theme => ({
  root:{
    height:'100vh',
    display: 'block',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 100,
    width: 200,
    color: 'white',
    background: 'linear-gradient(to right, #0099ff 0%, #5accc1 100%)',
    textDecoration: 'none',
  },
  button2: {
    margin: theme.spacing.unit,
    // position: 'absolute',
    width: 200,
    color: 'white',
    background: 'linear-gradient(to right, #0099ff 0%, #5accc1 100%)',
    textDecoration: 'none',
    
  },

  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  
});



class JobMatched extends Component {


  constructor(){
    super()
      this.state={
        name: '',
        roomId: [],
        connectionId: [],
        roomName: '' 
      }
  }

// initial setup for getting two connected users into a chatrom with eachother 

  // currentUser.createRoom({
  //   name: 'general',
  //   private: true,
  //   addUserIds: ['recruiterid', 'applicantId']
  // }).then(room => {
  //   console.log(`Created room called ${room.name}`)
  // })
  // .catch(err => {
  //   console.log(`Error creating room ${err}`)
  // })


// if(this.props.recruiter_decision === this.props.applicant_decision){
//   axios.get(`/api/rooms/users`)
//   console.log('-------Get New Connection Room',res)
// }).then(room => {
//   console.log(`Created room called ${room.name}`)
//   }).catch(err => console.log('Error getting room started',err))
// }


//Leave a room with ID- someRoomId: pushercode
//this funcitonality happens inside of the chat room


// currentUser.leaveRoom({ roomId: someRoomID })
//   .then(room => {
//     console.log(`Left room with ID: ${room.id}`)
//   })
//   .catch(err => {
//     console.log(`Error leaving room ${someRoomID}: ${err}`)
//   })

// currentUser.leaveRoom(
//   roomId = someRoomId
// ).wait().let { result ->
//   when(result) { // Result<Int, Error>
//     is Result.Success -> toast("CurrentUser left room: ${result.value.name}.")
//     is Result.Failure -> toast("Oops, something bad happened: ${result.error}")
//   }
// }

//Fetching an attachment

// currentUser.fetchAttachment(
//   attachmentUrl = message.link
// ).wait().let { result -> // Future<Result<FetchedAttachment, Error>>
//   when(result) { // Result<Int, Error>, either the new message id or an error
//     is Result.Success -> toast("Loaded attachment: ${result.value.link}.")
//     is Result.Failure -> toast("Oops, something bad happened: ${result.error}")
//   }
// }









  render() {
  const { classes } = this.props;

// handleClick = ()> {

// }



  return (
    <div>
    <div className="backgroundhands" className={classes.root}>


    <div className="handshake">
        <div id="handshake"class="animated infinite bounce">
        <img src={handshake} alt="" height={350} width={350}/>
        </div> 
    </div>


{/* <div class="animated infinite slideInRight"className="handshake2">
     <img src={Hand2} alt="" height={150} width={170}/>
    </div> */}
  
  <div className="buttonStyle">

    <div className="button1">
    <Link to ="/">
      <Button variant="extendedFab" aria-label="KeepJobMatching" className={classes.button}>
        <FindInPageSharp />
         Keep Job Matching!
      </Button>
      </Link>
      </div>
      


    <div className="button2">
      <Link to ="/Messages">
      
      <Button onClick={() => this.currentUser.createRoom }  variant="extendedFab" aria-label="Message" className={classes.button2}>
      {/* <Button onClick={this.currentUser.createRoom} */}
        <QuestionAnswer />
       Send A Message
      </Button>
      </Link>
      </div>


      </div>

    </div>
    </div>
  );
}
}

JobMatched.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobMatched);









//.TweenLite( target:Object, duration:Number, vars:Object ) ;
//TweenLite.to( target:handshake, duration:4, vars:Object )
// TweenLite.to( ".handshake", 4, )
//TweenLite.to(graph, 2.5, { ease: Bounce.easeOut, y: -500 });
//TweenLite.to(element, 2, {rotation:30, scaleX:0.8});
//TweenLite.to(element, 2, {rotationX:45, scaleX:0.8, z:-300});





//Instantiate GSDevTools    
//USE THIS IN CODE PEN TO CONTROL YOUR ANIMATIONS AND SAVE TIME
//GSDevTools.create();

