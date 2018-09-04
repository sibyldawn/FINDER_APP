import React from 'react';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withContext } from '../../ContextAPI/Context_HOC'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './Settings.css';

const styles = theme => ({
    colorSwitchBase: {
        color: '#3f51b5',
        '&$colorChecked': {
            color: '#3f51b5',
            '& + $colorBar': {
                backgroundColor: '#3f51b5',
            },
        },
    },
    colorSwitchYellow: {
        color: '#e6e600',
        '&$colorChecked': {
            color: '#e6e600',
            '& + $colorBar': {
                backgroundColor: '#e6e600',
            },
        },
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    input: {
        margin: 'none',
    },
    colorBar: {},
    colorChecked: {},
});

class Settings extends React.Component {
    state = {
        isrecruiter: this.props.context.user.isrecruiter || false,
        active: this.props.context.user.active || false,
        email: this.props.context.user.email,
        open: false
    }

    handleChange = (field, val) => {
        console.log('------------ val', val)
        this.setState({
            [field]: val
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        console.log('------------ this.props.context.user', this.props.context.user)
        return (
            <div className={classes.container}>
                <div className="settingsTitle">
                    Settings
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isrecruiter}
                                onChange={() => this.handleChange('isrecruiter', !this.state.isrecruiter)}
                                value="isrecruiter"
                                classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                }}
                            />
                        }
                        label='I am a recruiter'
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.active}
                                onChange={() => this.handleChange('active', !this.state.active)}
                                value="active"
                                classes={{
                                    switchBase: classes.colorSwitchYellow,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                }}
                            />
                        }
                        label='Account active'
                    />
                    <Button 
                        onClick={this.handleClickOpen}
                        variant='contained' 
                        className={classes.button}>
                            Edit Email Address
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Edit Email Address</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                defaultValue={this.state.email}
                                id="email"
                                onChange={(e) => this.handleChange('email', e.target.value)}
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button 
                        variant='contained'
                        color='secondary'
                        onClick={this.handleClickOpen}>
                            Delete Profile
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Warning! Deleting your profile is permanent and can not be undone. Are you sure you wish to continue?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
};

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(Settings));