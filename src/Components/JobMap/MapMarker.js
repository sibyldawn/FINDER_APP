import React, { Component } from "react";
import { Marker } from "react-google-maps";


export default class MapMarker extends Component {

  render(){
    return(
        <Marker
          position={ { lat: 40.5928, lng: 50.3055  }}

        >
        </Marker>
    );
  }
}
