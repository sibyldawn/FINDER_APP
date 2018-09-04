import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Header from './Components/Header/Header';
import Footer from './Components/Header/Footer/Footer';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Header/>
       
        <div className='spacer'>
          {routes}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
