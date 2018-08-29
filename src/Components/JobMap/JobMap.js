import React from 'react';
import MapContainer from './Maps/Maps';
import './JobMap.css';



const JobMap = () => {
    return (
        <div className="jobMapComponent">
           
        <div className="jobsearch">Job Search</div>

        
        <input type="text" className="industrycode" placeholder="industry type"/>
      
        <div className="googlemap">
        <MapContainer/>
        </div>




        </div>
    );
};






// export default class JobMap extends Component {

//     constructor(){
//         super();
//         this.state = {
//             industrycode: '',
//         }
//     }




//     componentDidMount(){
//         axios.get(`/api/industycode`).then(response => {
//             console.log('get job list error', response)
//             this.setState({
//                 industrycode: response.data
//             })
//         })
//     }


    

//     displayJobIndustryCode = () {
//         let display = {
//             industryCode: this.state.industry_code
//         };


//     }






//     <div className="joblocation">Job Location</div>

       
//     <div className="joblist">Job List</div>


// {/* top three to five results */}





// render(){
//     return(

//         );

//     }
// }







export default JobMap;

//my api key
//AIzaSyAn91z_nODvV9TFqNgv5lD3cMBi6_ScsPc