import React, { Component } from 'react';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import _ from 'lodash';
import emitter from '../../emitter.js'
import RawPublicYells from './RawPublicYells.jsx'

const MapBase = withGoogleMap(props => (
   <GoogleMap
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
      yells:[],
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
	this.changeMapMarkers(this.props.yells)
 	}

componentWillReceiveProps(nextProps){
	this.changeMapMarkers(nextProps.yells)
}



changeMapMarkers(data){
	this.setState({yells:data})
}

  handleMapMounted(map) {
    this._map = map;
  }



  handleCenterChanged(){
  	nextLoc = this._map.getCenter()
  	lat = nextLoc.lat()
  	lng = nextLoc.lng()
  	this.setState({
  		  center:{
	        lat:lat,
	        lng:lng
      }
  	})
  	loc = [lng,lat]
  	emitter.emit('changeLoc',loc)
  	
  }


	render() {
		
  const  {center,yells} = this.state
  const {limit} = this.props
		return (
<div >
<div className="ui small label" style={header}>{i18n.__('common.publicYells.dragMap')}</div>
	<div>
  <MapBase  containerElement={
            <div className="map-container_mobile" />
        }
        mapElement={
           <div className="map-container_mobile" />
        }
         onMapMounted={this.handleMapMounted.bind(this)}
         onCenterChanged={this.handleCenterChanged.bind(this)}
         onZoomChanged={this.handleZoomChanged.bind(this)}
        center={center}
         zoom={this.state.zoom}
      />

</div>

<div>
     	<RawPublicYells userCoordinates={this.props.userCoordinates} yells={yells} limit={limit} />


</div>
</div>
		);
	}
}
export default YellMapM;
 const header={
 	 position: 'fixed',
    top: '4em',
    width: '100%',
    'textAlign': 'center',
    'zIndex':"20",
    'color':'#3f51b5'
 }
