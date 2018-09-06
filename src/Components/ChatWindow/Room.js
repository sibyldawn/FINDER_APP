import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
      flexGrow: 1,
      marginLeft:'auto',
      width: '100%',
      padding: theme.spacing.unit * 2,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    typography:{
      position: 'relative',
      top: '40%',
    },
     bigAvatar: {
        width: 80,
        height: 80,
      },
  });
 class Room extends Component{
    constructor(props){
        super(props)

        this.state={
            otherUser:{}
        }
    }

    componentDidMount(){

        axios.get(`/api/users/${this.props.otherUserId}`).then(response => {
         this.setState({
             otherUser: JSON.parse(response.data.body)
         })
        })
    }
        
    
    render(){
        const { classes } = this.props;
        console.log("otherUser", this.state.otherUser);
        const { name, avatar_url } = this.state.otherUser;
        return (
          <div className={classes.root}>
            <List component="nav">
              <ListItem button>
                <ListItemIcon>
                  <Avatar className={classes.bigAvatar} src={avatar_url} alt=""/>
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
              <Divider />
              </List>
             </div>
          );
        }
        
    }
 Room.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);



