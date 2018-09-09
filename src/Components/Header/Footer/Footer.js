import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import MessageSharp from '@material-ui/icons/MessageSharp';
import SwapHorizSharp from '@material-ui/icons/SwapHorizSharp';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Settings from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import './Footer.css';



const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width:"100vw",
    background: "#1F2D44",
    color:'#A8B4B3',
    fontSize: 50,
    display:'flex',
    justifyContent: 'space-evenly'
  // },
  // Messages: {
  
  //  backgroundColor: '#1F2D44',
   
  // },
  // MessageSharp: {
  //   color: '#A8B4B3',
   
  // }, 


  // Finder: {
  //   backgroundColor: '#1F2D44',
  // },
  // SwapHorizSharp: {
  //   color: '#A8B4B3',
   
  // },

  // JobMap: {
  //   backgroundColor: '#1F2D44',
  // },
  // LocationOnIcon: {
  //   color: '#A8B4B3',
  // },
   
  }
}




class Footer extends Component {
  state = {
    value: 'messages',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const styles = {
      fontSize: 30, 
      color:'#eff4fc',
    }
    return (
      <BottomNavigation  value={value} onChange={this.handleChange} className={classes.root} color="inherit">
        <Link to="/Messages"><BottomNavigationAction className={classes.Messages} label="Messages" value="messages" icon={<MessageSharp style={styles} />}/></Link>
        <Link to="/"><BottomNavigationAction className={classes.Finder} label="Finder" value="finder" icon={<SwapHorizSharp style={styles}  />} /></Link>
        <Link to="/JobMap"><BottomNavigationAction className={classes.JobMap} label="JobMap" value="map" icon={<LocationOnIcon style={styles} />} /></Link>
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Footer));



