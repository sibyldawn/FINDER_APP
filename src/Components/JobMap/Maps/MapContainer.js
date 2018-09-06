
import React,{ Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";
// import MapMarker from '../MapMarker';   InfoWindow,
import { withContext } from '../../../ContextAPI/Context_HOC';
//, withScriptjs, withGoogleMap, GoogleMap
import './MapContainer.css';
import axios from 'axios';






class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipcodes: props.zipcodes,
      isRecruiter: '',
      latLng: [],
    }
  }

// componentDidMount(){
//   axios.get('/api/users/zipcodes').then(response => {
//     console.log(response.data)
//     this.setState({
//       current_zipcode: response.data
//     }).then (current_zipcode  => {
//         console.log(current_zipcode)
//     }).catch(error => {
//       console.log('componentDidMount Error',error)
//     })
//   })
// }

componentDidMount(){
  console.log('----- CONTEXT USER', this.props.context.user.isrecruiter)
  this.setState({isRecruiter: this.props.context.user.isrecruiter}, () => {
      axios.get(`/api/users/zipcodes?isRecruiter=${!this.state.isRecruiter}` ).then(results => {
        console.log('------------ zipcode query results', results)
          let zipArray = []
          results.data.map(e => zipArray.push(e.current_zipcode))
          console.log('------------ zipArray', zipArray)
          zipArray.forEach(e => axios.get(`https://api.promaptools.com/service/us/zip-lat-lng/get/?zip=${e}&key=7oe8dysanxdrgv1c`)
            .then(res => {
              console.log('------------ Map API res', res)
             res.data.output&&
              this.setState(prevState => {
                return {
                  latLng: [...prevState.latLng].concat(res.data.output[0])
                }
              })
            })
            .catch(error => {
              console.log('--------api converter error', error)
            })
          )
        }).catch(error => {
          console.log(error)
      })
  })
}

// componentDidUpdate(prevProps){
//   if(prevProps.zipcodes !== this.props.zipcodes) {
//     this.props.zipcodes.forEach(e => axios.get(`https://api.promaptools.com/service/us/zip-lat-lng/get/?zip=${e}&key=7oe8dysanxdrgv1c`)
//       .then(res => {
//         console.log('------------ Map API res', res)
//         this.setState(prevState => {
//           return {
//             latLng: prevState.lat.push(res.data.output[0])
//           }
//         })
//       })
//       .catch(error => {
//         console.log('--------api converter error', error)
//       })
//     )
//   }
// }






// handleClick() {
//   this.setState()
// }


 render() {
console.log('------------ this.props', this.props)
console.log('------------ MAPCONTAINTER this.state', this.state)
  

   
     return (
      
      <div className="mapsize">
     
     <Map
       google={this.props.google}
 //added these four lines but i still don't see the sizing of the map change      
       googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns&v=3.exp&libraries=geometry,drawing,places`}
       loadingElement={<div style={{ height: `100%` }} />}
       containerElement={<div style={{ height: `200px`,width: `200px`  }} />}
       mapElement={<div style={{ height: `100%` }} />}
   
       initialCenter={{
         lat: 33.4484,
         lng: -112.0740
       }}
       zoom={10}
       
     >
     {this.state.latLng.map(e => {
      return(
        <Marker onClick={this.onMarkerClick} position={{lat: e.latitude, lng: e.longitude ,}}  />
      )
    })}

     {/* {this.props.zipcodes.map(e => {
       return(
         <Marker onClick={this.onMarkerClick} position={{lat: this.props.zipcodes, lng: this.props.zipcodes ,}}  />
       )

     })}



  axios.get('https://api.promaptools.com/service/us/zip-lat-lng/get/?zip={[85234]}&key=7oe8dysanxdrgv1c').then(res => console.log('------------ Map API res', res))  */}




{/* find out how job marker is being decided, then, get lat and longitude for each job */}
     
     <Marker onClick={this.onMarkerClick}
               name={'Current location'} />
        {/* <Marker
         name={''}
          position={{lat: this.props.zipcode, lng: this.props.zipcode,}} /> */}





      
     </Map>












</div>

     );
   }
 }

 
export default withContext(GoogleApiWrapper({
    apiKey: ('AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns')
})(MapContainer))






// <Marker
// name={'Estrella Village'}
//  position={{lat: 33.4304, lng: -112.2026,}} />
// {/* /zipcode    85005     /  */}


// <Marker
// name={'Maryvale Village'}
//  position={{lat: 33.4898, lng: -112.2265,}} />
// {/* /zipcode    85031     /  */}


// <Marker
// name={'gilbert'}
//  position={{lat: 33.3528, lng: -111.7890,}} />
// {/* /zipcode    85142     /  */}


// <Marker
// name={'scottsdale'}
//  position={{lat: 33.4942, lng: -111.9261,}} />
// {/* /zipcode     85054    /  */}

// <Marker
// name={'Mesa'}
//  position={{lat: 33.4152, lng: -111.8315,}} />
// {/* /zipcode    85201     /  */}

// <Marker
// name={'chandler'}
//  position={{lat: 33.3062, lng: -111.8413,}} />
// {/* /zipcode         /  */}

// <Marker
// name={'Tempe'}
//  position={{lat: 33.4255, lng: -111.9400,}} />
// {/* /zipcode   85224      /  */}

// <Marker
// name={'Glendale'}
//  position={{lat: 33.5387, lng: -112.1860,}} />
// {/* /zipcode    85031     /  */}

// <Marker
// name={'Goodyear'}
//  position={{lat: 33.4353, lng: -112.3577,}} />
// {/* /zipcode    85326     /  */}

// <Marker
// name={'Tonopah'}
//  position={{lat: 33.4935, lng: -112.9371,}} />
// {/* /zipcode    85354     /  */}

// <Marker
// name={'Tolleson'}
//  position={{lat: 33.4500, lng: -112.2593,}} />
// {/* /zipcode     85037    /  */}

// <Marker
// name={'Queen creek'}
//  position={{lat: 33.2487, lng: -111.6343,}} />
// {/* /zipcode    85142     /  */}

// <Marker
// name={'Sun Lakes'}
//  position={{lat:33.2182, lng: -111.8759,}} />
// {/* /zipcode   85248     /  */}

// <Marker
// name={'Apache Junction'}
//  position={{lat: 33.4150, lng: -111.5496,}} />
// {/* /zipcode     85117    /  */}

// <Marker
// name={'Paradise valley'}
//  position={{lat: 33.5312, lng: -111.9426,}} />
// {/* /zipcode    85250     /  */}

// <Marker
// name={'Peoria'}
//  position={{lat: 33.5806, lng: -112.2374,}} />
// {/* /zipcode     85301    /  */}