import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
      fontSize: '-0.125rem',
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 15
      },
    avatar: {
        margin: 10,
      },
     
  });
  

class Message extends Component{
    constructor(props){
        super(props)
            this.state = {
                sender:{}
            }
    }

    componentDidMount(){
        axios.get(`/api/users/${this.props.username}`).then(response => {
            console.log("message sender", response.data.body);
            this.setState({
                sender: JSON.parse(response.data.body)
            })
        }).catch(err => console.log("FIND USER ERROR",err))
    }


    render(){
        const { classes } = this.props;

        const timestamp =  Date.parse(this.props.time);
        const date= new Date(timestamp).toLocaleString();
        console.log('SENDER DETAILS', this.state.sender);

    return (
        <div className={classes.root}>
             <ListItem>
                <Avatar src={this.state.sender.avatar_url} height={60} width={60} className={classes.avatar}/>
                <div className={classes.container}>
                <Chip label={this.props.text} className={classes.chip} color="primary"/>
                <ListItemText  secondary={`${this.state.sender.name} ${date}`} className={classes.secondary} style={{fontSize:'xx-small'}} />
                </div>
            </ListItem>
        
    </div>
        );
    }
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Message);


/*<div className='message'>
<div className='image-container'>
<img src={this.state.sender.avatar_url} height={60} width={60}/>
</div>
<div className='text-details'>
<div>
    <p className='message-username'>{this.state.sender.name}</p>
    <p className='message-time'>{date}</p>
</div>

<div>
    <p className='message-text'>{this.props.text}</p>
</div>
</div>
</div>*/