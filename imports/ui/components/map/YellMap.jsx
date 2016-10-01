import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export default class YellMap extends Component {
	
	render() {
		position = [23.07973, 11.60156]
		return (
		<Map center={position}
		  		//onMoveend={this.handleMove}
		  		ref="map"
		  		style={styles.mapStyle}
		  		 zoom={2} >
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