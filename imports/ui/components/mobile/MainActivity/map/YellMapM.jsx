import React, { Component } from 'react';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer.js";
import ClusterAvatarsM from './ClusterAvatarsM'
import _ from 'lodash'
import { browserHistory } from 'react-router'


const MapBase = withGoogleMap(props => (
   <GoogleMap
   onClick={props.onMapClick}
    zoom={props.zoom}
    clickableIcons={false}
    onZoomChanged={props.onZoomChanged}
    ref={props.onMapMounted}
    center={props.center}
    onCenterChanged={props.onCenterChanged}
  >


      
        <Marker
       
          position={{ lat: props.center.lat, lng: props.center.lng }}
          title="see"
          key="1"
        />
    

  </GoogleMap>



));


 class YellMapM extends Component {
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

  	this.setState({
  		  center:{
	        lat:nextLoc.lat(),
	        lng:nextLoc.lng()
      }
  	})
  	
  }
  closeDrawerViaUrl(){
     if (window.location.pathname!='/yell/main'){
      browserHistory.push('/yell/main')
    }
  }

  onClusterClick(cluster){
   this.closeDrawerViaUrl()

  	if (this.state.zoom>=7) {
  		console.log('clusters active')
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
<div >
<h4 className="ui  header" style={header} >Drag your desired location under the marker</h4>
	<div>
  <MapBase  containerElement={
            <div className="map-container_mobile" />
        }
        mapElement={
           <div className="map-container_mobile" />
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

</div>

<div>
     		<div className="ui container center aligned grid" style={frameStyle} >	
				<div  style={loadingCard} className="ui card card--z-2">
					<div  className="content">
						<img src={bg} alt="" />
					</div>
				</div>
				<div  className="ui card card--z-2">
					<div  className="content">
						<img src={bg} alt="" />
					</div>
				</div>
				<div  className="ui card card--z-2">
					<div  className="content">
						<img src={bg} alt="" />
					</div>
				</div>
			</div>
    


</div>
</div>
		);
	}
}
export default YellMapM;

const bg = "http://i.hizliresim.com/2n181j.png";
 const frameStyle = {paddingTop: '90%'};

 const header={
 	 position: 'fixed',
    top: '3.2em',
    width: '100%',
    'textAlign': 'center',
    'zIndex':"20",
    'color':'#3f51b5'
 }
 const loadingCard={
	height:'12em'
}