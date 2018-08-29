import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class TextFields extends React.Component {
  state = {
   
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        
        
        
        
        <TextField
          id="search"
          label="Name"
          type="search"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="search"
          label="Industry Type"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="search"
          label="Preferred Work Location"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="search"
          label="Education"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="search"
          label="Current Location"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="multiline-static"
          label="Bio Snippet "
          multiline
          rows="4"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="search"
          label="Profile Picture"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        
        
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
