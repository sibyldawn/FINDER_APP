import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FindInPageSharp from '@material-ui/icons/FindInPageSharp';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import './JobMatched.scss';
import { Link } from 'react-router-dom';
import Hand1 from './hand1.png';
import Hand2 from './hand2.png';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    // position: 'absolute',
    // bottom: 90
  },
  button2: {
    margin: theme.spacing.unit,
    // position: 'absolute',
    
  },

  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  
});






function FloatingActionButtons(props) {
  const { classes } = props;


  return (
    <div className="backgroundhands">
     
    <div class="animated infinite slideInLeft"className="handshake">
     <img src={Hand1} alt="" height={150} width={170}/>
    </div> 

<div class="animated infinite slideInRight"className="handshake2">
     <img src={Hand2} alt="" height={150} width={170}/>
    </div>


      <div className="buttonStyle">
    <Link to ="/">
      <Button variant="extendedFab" aria-label="KeepJobMatching" className={classes.button}>
        <FindInPageSharp />
        <a href=""> Keep Job Matching!</a> 
      </Button>
      </Link>
      

      <Link to ="/Messages">
      <Button variant="extendedFab" aria-label="Message" className={classes.button2}>
        <QuestionAnswer />
        Message
      </Button>
      </Link>


      </div>

    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);



//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/CSSPlugin.min.js"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/easing/EasePack.min.js"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenLite.min.js"></script>







//.TweenLite( target:Object, duration:Number, vars:Object ) ;
//TweenLite.to( target:handshake, duration:4, vars:Object )
// TweenLite.to( ".handshake", 4, )
//TweenLite.to(graph, 2.5, { ease: Bounce.easeOut, y: -500 });
//TweenLite.to(element, 2, {rotation:30, scaleX:0.8});
//TweenLite.to(element, 2, {rotationX:45, scaleX:0.8, z:-300});



//green sock dev tools code
//<script src="js/gsap/GSDevTools.min.js"></script>


//Instantiate GSDevTools    
//USE THIS IN CODE PEN TO CONTROL YOUR ANIMATIONS AND SAVE TIME
//GSDevTools.create();

