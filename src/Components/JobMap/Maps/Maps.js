
import React,{ Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Maps.css';






export class MapContainer extends Component {

 state = {
   showingInfoWindow: false,
   activeMarker: {},
   selectedPlace: {},
 };

 onMarkerClick = (props, marker, e) =>
   this.setState({
     selectedPlace: props,
     activeMarker: marker,
     showingInfoWindow: true
   });

 onMapClicked = (props) => {
   if (this.state.showingInfoWindow) {
     this.setState({
       showingInfoWindow: false,
       activeMarker: null
     })
   }
 };



 
 render() {

   
     return (
      
       <div className="mapsize">
     
     <Map
       google={this.props.google}
 //added these four lines but i still don't see the sizing of the map change      
       googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns&v=3.exp&libraries=geometry,drawing,places`}
      //  loadingElement={<div style={{ height: `100%` }} />}
      //  containerElement={<div style={{ height: `200px`,width: `200px`  }} />}
      //  mapElement={<div style={{ height: `100%` }} />}
   
       initialCenter={{
         lat: 33.4484,
         lng: -112.0740
       }}
       zoom={10}
       onClick={this.onMapClicked}
       
     >

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
        <Marker/> 

   
   <InfoWindow
 onOpen={this.windowHasOpened}
 onClose={this.windowHasClosed}
 visible={this.state.showingInfoWindow}>
   <div>
     <h1>{this.state.selectedPlace.name}</h1>
   </div>
</InfoWindow>
     </Map>

</div>

     );
   }
 }
 
export default GoogleApiWrapper({
    apiKey: ('AIzaSyB3nKfynX9Au9uVZb94D-Jb2tks8kwarns')
})(MapContainer)