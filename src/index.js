import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextProvider from './ContextAPI/ContextProvider'
import { BrowserRouter as Router } from 'react-router-dom'
// For hot reloading
import { AppContainer } from 'react-hot-loader';

const render = () => { 
    ReactDOM.render(
        <AppContainer>
                <Router>
                <ContextProvider>
                    <App /> 
                </ ContextProvider>
            </ Router>
        </ AppContainer>
        , document.getElementById('root')
    );
}

// Hot reloading below
render()

if (module.hot) {
    module.hot.accept('./App', () => {
        render()
    })
}
