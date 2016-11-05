import React, { Component } from 'react';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer.js";

const MapBase = withGoogleMap(props => (
   <GoogleMap
    defaultZoom={3}
    ref={props.onMapMounted}
    defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    onCenterChanged={props.onCenterChanged}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      ref={props.onClusterMounted}
      onClick={props.onClusterClick}
       //maxZoom={5}
      zoomOnClick={false}
    >
 
      {props.markers.map((marker) => (
      
        <Marker
          position={{ lat: marker.loc.coordinates[1][1], lng: marker.loc.coordinates[1][0] }}
          key={marker._id}
        />
    
      ))}

    </MarkerClusterer>
  </GoogleMap>



));


 class YellMap extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	markers:[{_id:1,loc:{coordinates:[[],[-88.175429,39.480155]]}}]
 	  };
 	}
 componentDidMount(){
 	console.log(this.props.markers)
	this.changeMapMarkers(this.props.markers)
 	}

componentWillReceiveProps(nextProps){
	this.changeMapMarkers(nextProps.markers)
}


changeMapMarkers(data){
	this.setState({markers:data})
}

  handleMapMounted(map) {
    this._map = map;
  }

   handleClusterMounted(cluster) {
    this._cluster = cluster;
  }

  handleCenterChanged(){
  	nextLoc = this._map.getCenter()
  	
  }
  onClusterClick(cluster){
  	markers =cluster.getMarkers()
  	console.log(markers)
  	
  }

	render() {
		return (
<MapBase  containerElement={
            <div className="map-container" />
        }
        mapElement={
           <div className="map-container" />
        }
        markers={this.state.markers}
         onMapMounted={this.handleMapMounted.bind(this)}
         onCenterChanged={this.handleCenterChanged.bind(this)}
         onClusterClick={this.onClusterClick.bind(this)}
         onClusterMounted={this.handleClusterMounted.bind(this)}
      />
		);
	}
}
export default YellMap;

/*

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export default class YellMap extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	zoom:2,
	  	position : [23.07973, 11.60156]
	  };
	}

	componentDidMount() {
    	this.mapApi = this.refs.map.leafletElement; // <= this is the Leaflet Map object
  }

  	handleMove(){
		console.log(`center:${this.mapApi.getCenter()}`)
		console.log(this.mapApi.getBounds())
	}

	
	render() {
		const {zoom,position} = this.state
		return (
		<Map center={position}
			onMoveend={this.handleMove.bind(this)}
			ref="map"
			style={styles.mapStyle}
			zoom={zoom} >
		 <TileLayer
		      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		    />
      	</Map>
		);
	}
}

const styles = {
	mapStyle:{
		zIndex:1,
		position:'absolute',		
		top:0,
		left:0,
		top:0,
		bottom:0
	}
};


/*
  {this.props.yells.map(function(yell){
			  		var myIcon = L.icon({
										iconUrl: yell.owner.profile.avatar,
										iconSize: [35, 35],
										iconAnchor: [35, 35],
										popupAnchor: [-3, -26],
										className : "ui circular image"
									});

			            return  <Marker key={yell._id} icon = {myIcon} position={yell.loc.coordinates}>
											<Popup>
												<span>{yell.owner.username}<br/>{yell.content}</span>
											</Popup>
										</Marker>;
			          })}*/

