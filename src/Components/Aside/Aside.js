import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});




class Aside extends Component {
  constructor(prop){
    super();

    this.state = {
        auth:true
    }
  }

      handleChange = (event, checked) => {
      this.setState({ auth: checked });
    };

  render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>
     
      <List>
        <ListItem>
          <Avatar>
            <Face />
          </Avatar>
          <ListItemText primary="Profile" />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <SupervisedUserCircle />
          </Avatar>
          <ListItemText primary="Match List" />
        </ListItem>
        <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <Settings />
          </Avatar>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <div><FormGroup>
          <FormControlLabel
            control={
              <Switch /*checked={active}*/ onChange={this.handleChange} aria-label="ActiveSwitch" />
            }
            label='Active'
          />
        </FormGroup></div>
    </div>
  );
 }
}


Aside.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Aside);