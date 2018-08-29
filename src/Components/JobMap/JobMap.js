import React from 'react';
import MapContainer from './Maps/Maps';
// import './JobMaps.css';

const JobMap = () => {
    return (
        <div className="jobMapComponent">
           
        <div className="jobsearch">Job Search</div>

        
        <input type="text" className="industrycode" placeholder="industry type"/>
        <input type="text" className="jobdistance"placeholder="job distance"/>
        <div className="googlemap">
        <MapContainer/>
        </div>

        <div className="joblocation">Job Location</div>

        
        <div className="joblist">Job List</div>


{/* top three to five results */}
    




        </div>
    );
};

export default JobMap;

//my api key
//AIzaSyAn91z_nODvV9TFqNgv5lD3cMBi6_ScsPc