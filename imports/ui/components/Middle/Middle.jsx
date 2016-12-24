import React, { Component } from 'react';
import MapComposer from '../map/MapComposer.jsx';
import ClusterAvatars from '../map/ClusterAvatars.jsx';
import emitter from '../emitter.js';
import  GeoPoint from 'geopoint';



 class Middle extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	//userCoord:[-88.175429,39.480155],
 	  	bounds:[[88.2919447020176,39.390222980566534],[-88.05891329798239,39.57008701943347]] //
 	  };
 	}

 	componentDidMount(){
 		emitter.addListener('changeLocForMap', (userCoord)=> this.changeLocForMap(userCoord));//from main fragment
 		emitter.addListener('changebounds', (bounds)=> this.changeBounds(bounds)); // from yellmap
 	}
 	componentWillMount(){
 	
 	}

 	changeLocForMap(userCoord){
 		//this.setState({userCoord:userCoord})
		 preLoc = new GeoPoint(userCoord[1], userCoord[1]);
		 loc = preLoc.boundingCoordinates(10,true)
		 SW = [loc[0]._degLon , loc[0]._degLat]
		 NE = [loc[1]._degLon , loc[1]._degLat]
		 bounds = [SW,NE]
		//console.log(bounds)
		 this.setState({bounds:bounds})
 		
 	}

 	changeBounds(bounds){
 		 this.setState({bounds:bounds})
 		// console.log(bounds)
 	} 

	render() {
		const	{bounds} = this.state

		return (
			 
             	 <MapComposer bounds={bounds} />
             
            
		);
	}
}
export default Middle;