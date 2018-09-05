import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Face from '@material-ui/icons/FaceRounded';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Settings from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import './Aside.css';

const styles = theme => ({
  root: {
    textDecoration: 'none',
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#A8B4B3',
    height: '51em',
  },
});

class Aside extends Component {

  render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>

      <List>
        <Link to="/profile"><ListItem>
          <Avatar>
            <Face />
          </Avatar>
          <ListItemText primary="Profile" />
        </ListItem>
        </Link>
        <li>
          <Divider inset />
        </li>
        <Link to="/Matches">
        <ListItem>
          <Avatar>
            <SupervisedUserCircle />
          </Avatar>
          <ListItemText primary="Match List" />
        </ListItem>
        </Link>
        <Divider inset component="li" />
        <Link to="/Settings">
        <ListItem>
          <Avatar>
            <Settings />
          </Avatar>
          <ListItemText primary="Settings" />
        </ListItem>
        </Link>
      </List>
    </div>
  );
 }
}


Aside.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Aside);