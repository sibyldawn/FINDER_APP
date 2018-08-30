
import React,{ Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";
import MapMarker from '../MapMarker';
//, withScriptjs, withGoogleMap, GoogleMap
import './MapContainer.css';






export class MapContainer extends Component {

 render() {

   
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



{/* find out how job marker is being decided, then, get lat and longitude for each job */}
     
     <Marker onClick={this.onMarkerClick}
               name={'Current location'} />
       <Marker
         title={'the big city'}
         name={'NYC'}
         position={{ lat:40.7128, lng:-74.0060, }} />
        
        
        
        {/* <Marker
         name={'Silicon Valley'}
         position={{lat: 37.759703, lng: -122.428093}} />
       <Marker />  */}
        {/* <MapMarker/>  */}
     </Map>

</div>

     );
   }
 }
 
export default GoogleApiWrapper({
    apiKey: ('AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns')
})(MapContainer)