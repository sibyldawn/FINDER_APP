import React, {Component} from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Aside from '../Aside/Aside';
import axios from 'axios';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Component {
    state = {
    auth: true,
    anchorEl: null,
    login: false,
    user: ''
};

componentDidMount() {
    axios.get('/api/session/user').then(res => {
        console.log('------------ res', res)
        res.data.first_name &&
        this.setState({ user: res.data, login: true })
        })
}

handleChange = (event, checked) => {
    this.setState({ auth: checked });
};

login = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${window.location.pathname}`)

    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
}

logout = () => {
    this.setState({ anchorEl: null, user: '', login: false });
    axios.post('/api/session/user').then(res => {
        console.log('------------ res', res)
        window.location = '/'
    })
}

handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
};

handleClose = () => {
    this.setState({ anchorEl: null });
};

render() {
    console.log("window",window)
    console.log('------------ this.state.user', this.state.user)
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Finder
                </Typography>
                {auth && (
                <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.state.login ? this.handleMenu : this.login}
                        color="inherit"
                    >
                    {this.state.login ?
                        <div>
                            <figure style={{ 
                                margin: 0, 
                                padding: 0, 
                                height: 30, 
                                width: 30 }}>
                                <img style={{ 
                                    borderRadius: "50%", 
                                    width: 30, 
                                    height: 30, 
                                    margin: 0, 
                                    padding: 0 }} 
                                    src={this.state.user.picture} alt="Profile"/>
                            </figure>
                        </div>
                        :
                        <AccountCircle style={{ fontSize: 33 }} />
                    }
                    </IconButton>
                    
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                        <MenuItem onClick={this.handleClose}><div onClick={this.logout}>Logout</div></MenuItem>
                    </Menu>
                </div>
                )}
                </Toolbar>
            </AppBar>
        </div>
    );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));