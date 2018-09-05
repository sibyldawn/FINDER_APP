import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';



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
        return (
            <Paper className={classes.root}>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <ButtonBase className={classes.image}>
                    <Avatar className={classes.bigAvatar} alt={this.state.otherUser.name} src={this.state.otherUser.avatar_url} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={6} sm container>
                  <Grid item xs container direction="column" spacing={16} className={classes.typography}>
                      <Typography  align="center" variant="title">{this.state.otherUser.name}</Typography>
                </Grid>
                </Grid>
              </Grid>
            </Paper>
          );
        }
        
    }
 Room.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);



