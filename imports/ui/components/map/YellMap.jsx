import React, { Component } from 'react';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer.js";
import ClusterAvatars from './ClusterAvatars'
import _ from 'lodash'
import { browserHistory } from 'react-router'


const MapBase = withGoogleMap(props => (
   <GoogleMap
   onClick={props.onMapClick}
    zoom={props.zoom}
    onZoomChanged={props.onZoomChanged}
    ref={props.onMapMounted}
    center={props.center}
    onCenterChanged={props.onCenterChanged}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      ref={props.onClusterMounted}
      onClick={props.onClusterClick}
       //maxZoom={5}
      zoomOnClick={props.zoom<7?true:false}
    >
 
      {props.markers.map((marker) => (
      
        <Marker
         onClick={()=>browserHistory.push('/yell/'+marker.refYellId)}
          position={{ lat: marker.yell.publicPlanLoc.coordinates[1], lng: marker.yell.publicPlanLoc.coordinates[0] }}
          title={marker.refYellId}
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
      markers:[],
      active:false,
      zoom:3,
      center:{
        lat:39.257148,
        lng:34.564587
      }
    };
  }

    handleZoomChanged() {
    const nextZoom = this._map.getZoom();
    if (nextZoom != this.state.zoom) {
      this.setState({
        zoom: nextZoom,
      });
    }
  }

 	
 componentWillMount(){
	this.changeMapMarkers(this.props.markers)
 	}

componentWillReceiveProps(nextProps){
	this.changeMapMarkers(nextProps.markers)
}

onMapClick(){
	  this.setState({publicYells:[],active:false})

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
    if (window.location.pathname!='/yell/main'){
      browserHistory.push('/yell/main')
    }

  	if (this.state.zoom>=7) {
    	 markers =cluster.getMarkers()
      yells=[]
      mapMarkers = this.state.markers
      markers.forEach(function (marker) {
        id = marker.getTitle()
        yell= _.find(mapMarkers, { 'refYellId': id} );
        yells.push(yell)
      });
    this.setState({publicYells:yells,active:true})
    } 
  }

	render() {
		
  const  {center} = this.state
		return (
<div className="className">
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
         onMapClick={this.onMapClick.bind(this)}
         onZoomChanged={this.handleZoomChanged.bind(this)}
        center={center}
         zoom={this.state.zoom}
      />
 <div  style={{marginTop:'5%'}} className="two wide column">
                 <ClusterAvatars publicYells={this.state.publicYells} active={this.state.active} />
              </div>
    


</div>
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

