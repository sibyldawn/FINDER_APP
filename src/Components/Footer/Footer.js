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


const styles = {
  root: {
    position: 'relative',
    bottom: 0,
    width: '100vw',
  },
};

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

    return (
      <BottomNavigation  showLabels value={value} onChange={this.handleChange} className={classes.root} color="inherit">
       <Link to="/Messages"><BottomNavigationAction label="Messages" value="messages" icon={<MessageSharp />} /></Link>
       <Link to="/Matches"><BottomNavigationAction label="Matches" value="matches" icon={<SupervisedUserCircle />} /></Link>
       <Link to="/"><BottomNavigationAction label="Finder" value="finder" icon={<SwapHorizSharp />} /></Link>
       <Link to="/JobMap"><BottomNavigationAction label="JobMap" value="map" icon={<LocationOnIcon />} /></Link>
       <Link to="/Settings"><BottomNavigationAction label="Settings" value="settings" icon={<Settings />} /></Link>
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Footer));



