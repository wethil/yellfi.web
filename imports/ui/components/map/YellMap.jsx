import React, { Component } from 'react';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer.js";
import ClusterAvatars from './ClusterAvatars'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import emitter from '../emitter.js'


const MapBase = withGoogleMap(props => (
   <GoogleMap
   onClick={props.onMapClick}
    zoom={props.zoom}
    onZoomChanged={props.onZoomChanged}
    ref={props.onMapMounted}
    center={props.center}
    //onCenterChanged={props.onCenterChanged}
    onDragEnd={props.onDragEnd}
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
          position={{ lat: marker.publicPlanLoc.coordinates[1], lng: marker.publicPlanLoc.coordinates[0] }}
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
      zoom:7,
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
    this.handleEndDraging()
  }

 componentDidMount(){
    emitter.addListener('changeLocForMap', (userCoord)=> this.changeLocForMap(userCoord));//from main fragment
   
  }	

  changeLocForMap(userCoord){
    this.setState({
      center:{
        lat:userCoord[1],
        lng:userCoord[0]
      }
    })
  }


 componentWillMount(){
	this.changeMapMarkers(this.props.markers)
 	}



componentWillReceiveProps(nextProps){
	this.changeMapMarkers(nextProps.markers)
}

onMapClick(){
	  this.setState({publicYells:[],active:false})
     this.closeDrawerViaUrl()

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
    bounds = this._map.getBounds()
    this.changeQueryWithBounds(bounds)
  	
  }

  handleEndDraging(){
    bounds = this._map.getBounds()
    this.changeQueryWithBounds(bounds)
  }


  closeDrawerViaUrl(){
     if (window.location.pathname!='/yell/main'){
      browserHistory.push('/yell/main')
    }
  }

  changeQueryWithBounds(bounds){
    console.log('north')
    preNE=bounds.getNorthEast().toJSON()
    NE=[preNE.lng,preNE.lat]
    preSW = bounds.getSouthWest().toJSON()
    SW=[preSW.lng,preSW.lat]
    finalBounds = [SW,NE]
    emitter.emit('changebounds',finalBounds)
  }

  onClusterClick(cluster){
   this.closeDrawerViaUrl()

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
       //  onCenterChanged={this.handleCenterChanged.bind(this)}
         onDragEnd={this.handleEndDraging.bind(this)}
         onClusterClick={this.onClusterClick.bind(this)}
         onClusterMounted={this.handleClusterMounted.bind(this)}
         onMapClick={this.onMapClick.bind(this)}
         onZoomChanged={this.handleZoomChanged.bind(this)}
        center={center}
         zoom={this.state.zoom}
      />
 <div  style={{marginTop:'2%'}} className="two wide column">
                 <ClusterAvatars publicYells={this.state.publicYells} active={this.state.active} />
              </div>
    


</div>
		);
	}
}
export default YellMap;
