import React from 'react';
// import { render } from 'react-dom';
import MotionStack from 'react-motion-stack';
import 'react-motion-stack/build/motion-stack.css';
import UserCard from '../Card/Card';
import './MatchFinder.css';




 
export default class App extends React.Component {
  constructor(){
    super()
      this.state = {
        arr: ["card1","card2","card3","card4","card5"]
      }

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
    // const data = this.state.arr.map( (e,i) => {
    //   return <div key={i} style={{background:"yellow",height:'80vh',width:'80vw'}}>{e}</div>
    // })
     
      const data = Array.from({ length: 10 }, (_, i) => ({
        id: new Date().getTime() + i,
        element: (
          // <img
          //   draggable={false}
          //   src={`https://source.unsplash.com/random/${i + 1}`}
          // />
          <UserCard
          draggable={false}
          />
        )
      }));
    console.log("data",data);
    console.log(this.deck)
    return (
      <div  className="demo-wrapper">
        <MotionStack
          data={data}
          onSwipeEnd={this.onSwipeEnd}
          onBeforeSwipe={this.onBeforeSwipe}
          render={props => props.element}
          renderButtons={this.renderButtons}
          
        />
      </div>
    );
  }
}

