import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Routes/>
        <Footer/>
      </div>
    );
  }
}

export default App;
