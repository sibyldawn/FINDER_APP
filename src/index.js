import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextProvider from './ContextAPI/ContextProvider'
import { BrowserRouter as Router } from 'react-router-dom'





ReactDOM.render(

    <Router>
        <ContextProvider>
          
                    <App /> 
          
        </ ContextProvider>
    </ Router>
    , document.getElementById('root')
    
    );

