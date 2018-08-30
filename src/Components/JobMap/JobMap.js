import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './Maps/MapContainer';
import './JobMap.css';

const API_KEY = 'AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns'

export default class JobMap extends Component {

    constructor(){
        super();
        this.state = {
            industrycode: '',
            jobsSearched: [],
            selectedJobs: '',
        }
    }




    // componentDidMount(){
    //     axios.get(`/api/jobsSearched`).then(response => {
    //         console.log('get job list error', response)
    //         this.setState({
    //             jobsSearched: response.data
    //         })
    //     })
    // }



    handleChange = ( key, val ) => {
        this.setState({
            [key]: val
        })
    }

    

    displayJobIndustryCode = () => {
        let displayIndustryCodes = {
            industryCode: this.state.industry_code
        };
        console.log('looking up industrycodes', displayIndustryCodes)
            axios.get(`/api/user`,displayIndustryCodes).then(results => {
                console.log('err on industry code display', results)
                this.setState({ industry_code: results.data});
            }).catch(error => {
                console.log(error)
            })
    }


render(){

    console.log("this.state--------", this.state)


    return(
        <div>
    
        <div className="joblocation">Job Location</div>

       
        
       <div className="joblist">Job List</div>
    
        <div className="jobMapComponent">
           
           <div className="jobsearch">Job Search</div>
   
            <input onChange={ e => this.handleChange('industrytype',e.target.value)}className="industryType" placeholder="industry type"></input>
           {/* <input type="text" className="industrycode" placeholder="industry type"/> */}
         
           <div className="googlemap">
           <MapContainer
          
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










// export default JobMap;


//need lat and long for marker
//get random numbers with limitations
//or hardcoded cooridnates

//or it map over a fake array randomly

//needds to be attached to industry code but not displayed

//then needs to show 3-5 different markers