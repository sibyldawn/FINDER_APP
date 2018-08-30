import React from 'react'
import axios from 'axios'

export const AppContext = React.createContext()

export default class ContextProvider extends React.Component {
    state = {
        login: false,
        update: 0,
        user: '',
        methods: {
            updateState: () => {
                this.setState(prevState => {
                    return {
                        update: prevState.update + 1
                    }
                })
            },
            login: () => {
                const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${window.location.pathname}`)
            
                window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
            },
            logout: () => {
                axios.post('/api/session/user').then(res => {
                    console.log('------------ res', res)
                    this.setState((prevState) => {
                        return {
                            login: !prevState.login
                        }
                    })
                    window.location = '/'
                })
            },
            getLoggedInUser: () => {
                axios.get('/api/session/user').then(res => {
                    console.log('------------ res', res)
                    res.data.first_name &&
                    this.setState({ user: res.data, login: true })
                    })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.update !== prevState.update) {
            this.getLoggedInUser
        }
    }

    render() {
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}