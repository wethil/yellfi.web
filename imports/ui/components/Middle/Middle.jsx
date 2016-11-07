import React, { Component } from 'react';
import MapComposer from '../map/MapComposer.jsx'
import ClusterAvatars from '../map/ClusterAvatars.jsx'
import emitter from '../emitter.js'

 class Middle extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	ipLoc:{}
 	  };
 	}

 	componentDidMount(){
 		emitter.addListener('changeLocForMap', (ipLoc)=> this.changeLocForMap(ipLoc));
 	}
 	changeLocForMap(ipLoc){
 		this.setState({ipLoc:ipLoc})
 		console.log(ipLoc)
 	}

	render() {
		return (
			 <div className="eleven wide column animated fadeIn fixed ">
             	 <MapComposer />
              <div  className="two wide column">
                <ClusterAvatars />
              </div>
            </div>
		);
	}
}
export default Middle;