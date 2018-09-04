import React, { Component } from "react";
import { Marker } from "react-google-maps";
// import InfoBox from "google-maps-infobox/types";
import axios from 'axios';


export default class MapMarker extends Component {
constructor() {
  super();
  this.state={
    industry_codes: [],
    toggle: false
  }
}
componentDidMount(){
  axios.get(`/api/users/industry_code`).then(response => {
    this.setState({
      industry_codes: response.data
    })
  }).catch(error => {
    console.log('Axios error GET componentDidMount', error)
  })
}

onToggleOpen =(id) => {
  this.setState((prevState) => {
    return {
      [id]: !prevState[id]
    }
  })
}





  // render(){
  //   let markers = this.state.industry_codes ? this.state.industry_codes.map(industry_codes => {
  //     // console.log('whats with the markers',markers)
  //     console.log(this.state.industry_codes[0])
  //     return <Marker
  //               key={industry_codes.id}
  //               position={ {  lat: +industry_codes.longitude, lng: +industry_codes.latitude  } }
  //               // icon={customIcon}
  //               onClick={() => this.onToggleOpen(industry_codes.id)}
  //               >
                
  //               {this.state.industry_codes[`${industry_codes.id}`] && <InfoBox
  //                 onCloseClick={this.onToggleOpen}
  //                   options={{ closeBoxURL: ``, enableEventPropagation: true }}
  //                 >
  //                   <div style={{ backgroundColor: `rgb(250, 255, 255, .75)`, opacity: 0.9, padding: `12px`, borderRadius: `5%` }}>
  //                     <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
  //                       <div className="job-info-box">
  //                         <div>-{industry_codes.industry_name}</div>
                      
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </InfoBox>}
                  
  //             </Marker>
            
  //   }) : ''

//     console.log('------infobox', InfoBox)

//     return(
//         <div>
//            {markers}
// {/*  
//         <Marker
//           position={ { lat: 40.5928, lng: 50.3055  }}

//         >

       
//         </Marker> */}
//         </div>
//     );
//   }
}
