import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FindInPageSharp from '@material-ui/icons/FindInPageSharp';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      
    <div className="handshake">
    <img src="https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/714/2018/06/06093841/shutterstock_340774508.jpg" alt=""/>
    </div>

      <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
        <FindInPageSharp />
        Keep Job Matching!
      </Button>
      <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
        <QuestionAnswer />
        Message
      </Button>


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
// TweenLite.to( ".handshake", 4, {opacity: 0} )
//TweenLite.to(graph, 2.5, { ease: Bounce.easeOut, y: -500 });