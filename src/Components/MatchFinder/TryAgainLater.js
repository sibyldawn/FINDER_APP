import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../Assets/motorcycle.json';

export default class TryAgainLater extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isStopped: false, isPaused: false};
  }

  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    };

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <div className="lottie-container`">
      <Lottie options={defaultOptions}
              height={'80vh'}
              width={'100vw'}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}/>
        <h1>OUT LOOKING FOR MORE CONNECTIONS.</h1>
        <h3>We'll e-mail you when you get a match!</h3>
    </div>
  }
}