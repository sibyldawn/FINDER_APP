import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'

const styles = theme => ({
  card: {
    minWidth: 350,
    maxWidth: "60%",
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: 500,
    top: 150,
    right:30,
    overflow: "scroll",
    userSelect: 'none'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserCard extends React.Component {
  state = { 
    expanded: false,
    user: ''
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    const { id } = this.props
    console.log('------------ id', id)
    if(id && id.length){
      axios.get(`/api/user?id=${id}`).then(res => {
        console.log('------------ GET user res', res)
        this.setState({
          user: res.data[0]
        })
      })
    }
  }

  render() {
    const { classes } = this.props;
    const { isrecruiter } = this.state.user
    console.log('------------ this.state.user', this.state.user)
    const { user } = this.state
    return (
      user ? 
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardheader}
            title={`${user.first_name} ${user.last_name}`}
            subheader={user.job_interest}
          />
          <CardMedia
            className={classes.media}
            image={user.picture}
            title={`${user.first_name} ${user.last_name}`}
          />
          <CardContent className={classes.cardcontent}>
            <Typography paragraph>
              <Typography paragraph variant="body2">
                {isrecruiter ? 'Company:' : 'Bio:'}
              </Typography>
              {user.bio}
            </Typography>

            <Typography paragraph>
              <Typography paragraph variant="body2">
                {isrecruiter ? 'Company Description:' : 'Work History:'}
              </Typography>
              {user.work_history}
            </Typography>

          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardcontent}>

              <Typography paragraph variant="body2">
                {isrecruiter ? 'State:' : 'Preferred Location:'}
              </Typography>
              <Typography paragraph>
                {user.preferred_location}
              </Typography>

              <Typography paragraph variant="body2">
                {isrecruiter ? 'Zipcode' : 'Current Zipcode:'}
              </Typography>
              <Typography paragraph>
                {user.current_zipcode}
              </Typography>

              <Typography paragraph variant="body2">
                Industry: 
              </Typography>
              <Typography paragraph>
                {user.industry_code}
              </Typography>

              <Typography paragraph variant="body2">
                {isrecruiter ? 'Positions Open:' : 'Job Interests:'}
              </Typography>
              <Typography paragraph>
                {user.current_job}
              </Typography>
              
              <Typography paragraph variant="body2">
                {isrecruiter ? 'Qualifications:' : 'Education Background:'}
              </Typography>
              <Typography paragraph>
                {user.education_background}
              </Typography>

            </CardContent>
          </Collapse>
        </Card>
        :
        <CircularProgress className={classes.progress} size={50} color='primary' />
    );
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);