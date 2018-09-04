import React, {Component} from 'react';
import { withRouter } from 'react-router';
import ContextProvider, { AppContext } from '../../ContextAPI/ContextProvider'
import { withContext } from '../../ContextAPI/Context_HOC'
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
import './Header.css';


const styles = {
    root: {
        backGroundColor: '#1F2D44',
        flexGrow: 1,
        background: '#1F2D44',
    },
    flex: {
        fontFamily: 'Baloo Bhai',
        color: '#5ACCC1',
        flexGrow: 1,
    },
    menuButton: {
        color: '#5ACCC1',
        marginLeft: -12,
        marginRight: 20,
    },
    AccountCircle: {
        color: '#5ACCC1',
    },
    AppBar: {
        color: '#5ACCC1',
        backGroundColor: '#1F2D44',
    },
    ToolBar: {
        color: '#5ACCC1',
        backGroundColor: '#1F2D44',
    }

};

class Header extends Component {
    state = {
        auth: true,
        anchorEl: null,
        left: false,
    };

    componentDidMount() {
        this.props.context.methods.checkForLogin() 
    }
    handleMenu = event => {
            this.setState({ anchorEl: event.currentTarget });
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidUpdate(prevProps) {
        if(this.props.context.user.picture !== prevProps.context.user.picture) {
            this.props.context.methods.checkForLogin()
        }
    }

    render() {
        console.log('------------ this.props', this.props)
        const { classes, context } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar className={classes.AppBar}position="static">
                    <Toolbar className={classes.ToolBar}>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                        <MenuIcon style={{ fontSize: 50  }} />
                    </IconButton>
                    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            <Aside/>
                        </div>
                        </Drawer>
                    <Typography variant="display3" color="blue" className={classes.flex}>
                        Finder
                    </Typography>
                    {auth && (
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={context.login ? this.handleMenu : context.methods.login}
                            color="inherit"
                        >
                        {context.login ?
                            <div>
                                <figure style={{ 
                                    margin: 0, 
                                    padding: 0, 
                                    height: 33, 
                                    width: 33,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '50%' }}>
                                    <img style={{ 
                                        display: 'inline',
                                        height: '100%',
                                        width: 'auto', 
                                        margin: 0, 
                                        padding: 0 }} 
                                        src={context.user.picture} alt="Profile"/>
                                </figure>
                            </div>
                            :
                            <AccountCircle className={classes.AccountCircle}style={{ fontSize: 50 }} />
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
                            <MenuItem onClick={this.handleClose}><div onClick={context.methods.logout}>Logout</div></MenuItem>
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

export default withContext(withRouter(withStyles(styles)(Header)))