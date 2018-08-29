import React from 'react';
import MapContainer from './Maps/Maps';

const JobMap = () => {
    return (
        <div>
            JobMap
        <div className="jobsearch">Job Search</div>

        
        <input type="text" className="industrycode"/>
        <input type="text" className="jobdistance"/>
        <div className="googlemap">Google Map
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