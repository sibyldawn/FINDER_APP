import React from 'react';
import { render } from 'react-dom';
import MotionStack from 'react-motion-stack';
import 'react-motion-stack/build/motion-stack.css';
import './MatchFinder.css';

 
const data = Array.from({ length: 10 }, (_, i) => ({
  id: new Date().getTime() + i,
  element: (
    <img
      draggable={false}
      src={`https://source.unsplash.com/random/${i + 1}`}
    />
  )
}));
 
export default class App extends React.Component {
  constructor(){
    super()
      this.deck = React.createRef();
  }

  onBeforeSwipe = (swipe, direction, state) => {
    console.log('direction', direction);
    console.log('state', state);
 
    swipe();
  }
 
  onSwipeEnd = ({ data }) => {
    console.log('data', data);
  };
 
  // renderButtons(props) {
  //   return (
  //     <div className="btn-group">
  //       <button children="👎" onClick={props.reject} />
  //       <button children="👍" onClick={props.accept} />
  //     </div>
  //   );
  // }
 
  render() {

    console.log(this.deck)
    return (
      <div  className="demo-wrapper" 
      ref={this.deck}>
      <figure style={{height:'100vh'}}>
        <MotionStack
          data={data}
          onSwipeEnd={this.onSwipeEnd}
          onBeforeSwipe={this.onBeforeSwipe}
          render={props => props.element}
          renderButtons={this.renderButtons}
          style={{height:'100%'}}
        />
       </figure> 
      </div>
    );
  }
}

