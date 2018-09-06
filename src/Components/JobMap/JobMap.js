import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './Maps/MapContainer';
import './JobMap.css';
import { withContext } from '../../ContextAPI/Context_HOC';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MapMarker from './MapMarker';
// import InfoBox from "google-maps-infobox/types";


// const API_KEY = 'AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns'


const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
  });

class JobMap extends Component {

    constructor(){
        super();
        this.state = {
            industryCode: '',
            jobsSearched: [],
            selectedJobs: '',
            isRecruiter: '',
            industry: ''
        }
    }



// put terinary to fix inital loading bug from jobmap page
    // componentDidMount(){
    //     console.log('----- CONTEXT USER', this.props.context.user.isrecruiter)
    //     this.setState({isRecruiter: this.props.context.user.isrecruiter}, () => {
    //         axios.get(`/api/users/zipcodes?isRecruiter=${!this.state.isRecruiter}` ).then(results => {
    //             console.log('err on industry code display', results)
    //             let zipArray = []
    //             results.data.map(e => zipArray.push(e.current_zipcode))
    //             this.setState({ industry_code: zipArray});
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     })
    // }



    handleChange = ( key, val ) => {
        this.setState({
            [key]: val
        })
    }


        handleChange = (prop, val) => {
            this.setState({
            [prop]: val
            })
        }
        
    

    displayJobIndustryCode = () => {
        let displayIndustryCodes = {
            industryCode: this.state.industry_code
        };
        console.log('looking up industrycodes', displayIndustryCodes)
            axios.get(`/api/users/zipcodes?isRecruiter=${this.state.isRecruiter}` ).then(results => {
                console.log('err on industry code display', results)
                this.setState({ industry_code: results.data});
            }).catch(error => {
                console.log(error)
            })
    }



    oppositeRollZipCodes = () => {
        this.state.users.zipcodes.map
    };






render(){

    console.log("this.state--------", this.state)
    const { classes } = this.props


    return(
        <div>
    
    
        <div className="jobMapComponent">
           
           <div className="jobsearch">Job Search</div>

   
           
         
           <div className="googlemap">
           <MapContainer
                data={this.state.industry}
                />
           </div>
    
    {/* top three to five results */}
{/*     
    function getRandomLatitude = (min, max) => {
         Math.random() * (max- min)+ min;
}
console.log(getRandomLatitude); */}




        </div>

        </div>
        );

    }
}




export default withContext(withStyles(styles)(JobMap));





// export default JobMap;


//need lat and long for marker
//get random numbers with limitations
//or hardcoded cooridnates

//or it map over a fake array randomly

//needds to be attached to industry code but not displayed

//then needs to show 3-5 different markers