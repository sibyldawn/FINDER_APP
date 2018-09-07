import React from 'react';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withContext } from '../../ContextAPI/Context_HOC'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import axios from 'axios'
import helpIcon from '../../Assets/help-icon.svg'
import './Settings.css';

const styles = theme => ({
    colorSwitchBase: {
        color: '#2699FB',
        '&$colorChecked': {
            color: '#1F2D44',
            '& + $colorBar': {
                backgroundColor: '#2699FB',
            },
        },
    },
    colorSwitchYellow: {
        color: '#5ACCC1',
        '&$colorChecked': {
            color: '#4063fc',
            '& + $colorBar': {
                backgroundColor: '#5ACCC1',
            },
        },
    },

    recruiterSwitch: {
        
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    activeSwitch: {
      
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    container: {
        backgroundColor: '#eff4fc',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // flexWrap: 'wrap',
    },
    input: {
        margin: 'none',
    },
    editEmailButton: {
        margin: '20px',
        background: 'linear-gradient(to right, #2699FB 0%, #A8B4B3 100%)',
    },
    deleteProfileButton: {
          margin: '20px',
        background: 'linear-gradient(to right, #fb2634 0%, #4063fc 100%)',
    },
    colorBar: {},
    colorChecked: {},
});

class Settings extends React.Component {
    state = {
        isrecruiter: this.props.context.user.isrecruiter || false,
        active: this.props.context.user.active || false,
        email: this.props.context.user.email,
        open: false,
        confirm: false,
        snack: false,
        snackMessage: ''
    }

    componentDidUpdate(prevProps) {
        if(this.props.context.user !== prevProps.context.user) {
            this.setState({
                email: this.props.context.user.email,
                isrecruiter: this.props.context.user.isrecruiter,
                active: this.props.context.user.active
            })
        }
    }

    toggleValue = (field) => {
        this.setState({
            [field]: !this.state[field]
        }, () => axios.put('/api/user/toggle', { field, value: this.state[field], id: this.props.context.user.id})
            .then(res => {
                this.props.context.methods.checkForLogin()
                console.log('------------ res', res)
            })
        )
        
    }

    handleChange = (field, val) => {
        console.log('------------ val', val)
        this.setState({
            [field]: val
        })
    }

    deleteProfile = () => {
        axios.delete(`/api/user?id=${this.props.context.user.id}`).then(res => {
            console.log('------------ Delete profile response', res)
            this.props.context.methods.checkForLogin()
            this.props.history.push('/')
        }).catch(error => console.log('------------ deleteProfile error', error))
    }

    submitEmail = () => {
        const { email } = this.state

        // Test the email input for correct formatting
        if(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            axios.put('/api/user/email', { email: this.state.email, id: this.props.context.user.id }).then(res => {
                console.log('------------ submitEmail res', res.data)
                this.setState({
                    snackMessage: 'Email updated',
                    snack: true,
                    open: false
                }, this.props.context.methods.checkForLogin())
            }).catch(error => console.log('------------ submitEmail error', error))
        } else {
            this.setState({
                snackMessage: 'Please enter a valid email address',
                snack: true
            })
        }
    }

    render() {
        const { classes } = this.props;
        console.log('------------ this.state', this.state)
        console.log('------------ this.props.context.user', this.props.context.user)
        return (
            <div className={classes.container}>
            <div className="settingsTitle">
                 Settings
            </div>
            <div className="settings">
                   
                    <FormControlLabel
                        control={
                            <Switch className={classes.recruiterSwitch}
                                checked={this.state.isrecruiter}
                                onChange={() => this.toggleValue('isrecruiter')}
                                value="isrecruiter"
                                classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                }}
                            />
                        }
                        label={this.state.isrecruiter ? 'I am a recruiter' : 'I am an applicant'}
                    />
                    <Tooltip title={this.state.isrecruiter ? "This account represents a company's recruiter" : 'This account represents a job applicant'}>
                        <img src={ helpIcon } alt='Help' />
                    </Tooltip>
                    <FormControlLabel
                        control={
                            <Switch className={classes.activeSwitch}
                                checked={this.state.active}
                                onChange={() => this.toggleValue('active')}
                                value="active"
                                classes={{
                                    switchBase: classes.colorSwitchYellow,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                }}
                            />
                        }
                        // the label and tool tip image need to be syled and positioned with the toggle switch
                        label='Account active'
                    />
                    <Tooltip title={this.state.active ? "This account will show up in other users's match queue" : "This account will not show up in other users' match queue."}>
                        <img src={ helpIcon } alt='Help' />
                    </Tooltip>
                    <Button className={classes.editEmailButton}
                        onClick={() => this.handleChange('open', true)}
                        variant='contained' 
                        >
                            Edit Email Address
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.handleChange('open', false)}
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
                            <Button onClick={() => this.handleChange('open', false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => this.submitEmail()} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button className={classes.deleteProfileButton}
                        variant='contained'
                       
                        onClick={() => this.handleChange('confirm', true)}>
                            Delete Profile
                    </Button>
                    <Dialog
                        open={this.state.confirm}
                        onClose={() => this.handleChange('confirm', false)}
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
                            <Button onClick={() => this.handleChange('confirm', false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => this.deleteProfile()} color="secondary" autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={this.state.snack}
                            autoHideDuration={6000}
                            onClose={() => this.handleChange('snack', false)}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            variant='success'
                            message={<span id="message-id">{this.state.snackMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={() => this.handleChange('snack', false)}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                </div>
            </div>
        );
    }
};

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(Settings));