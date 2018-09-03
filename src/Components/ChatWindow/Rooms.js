import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});
class Rooms extends Component {

    render() {
        const rooms =this.props.rooms.map(room => {
        //     const otherUserId = room.filter( (e => {
        //      if(e.id !== this.props.chat_user.id){
        //        return e
        //       } 
        //    }))
             return (
                 <ListItem button key={room.id} onClick={()=>this.props.handleChangeIndex(1)}>
                 <ListItemText  primary={`${room.name}`} onClick={() => this.props.subscribeToRoom(room.id)}/>
                 </ListItem>
             )
         })
      
    const { classes } = this.props;
        return (
             <div className={classes.root}>
             <List>
                 {rooms}
            </List>
    </div>
  );
 }
} 

Rooms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rooms);













// import React, { Component } from 'react';

// export default class Rooms extends Component {
//     render() {
//         console.log("rooms", this.props.rooms);
//         return (
//             <div className="rooms-list">
        
//                 {this.props.rooms.map(room => {
//                     const active = this.props.roomId === room.id ? "active" : "";
//                     return (
//                         <li key={room.id} className={"room" + active}>
//                             <a  href="#" onClick={() => this.props.subscribeToRoom(room.id)}>#{room.name}</a>
//                         </li>
//                     )
//                 })}
//             </div>
//         );
//     }
// }