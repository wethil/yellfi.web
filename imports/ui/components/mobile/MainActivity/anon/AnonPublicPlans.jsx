import React, { Component } from 'react';
import MapComposer from './map/MapComposer.jsx'
import emitter from '../../emitter.js';
import LoadingList from '../yells/YellsComponents/LoadingList.jsx'



 class AnonPublicPlans extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	limit:10,
 	  	location:[-88.175429,39.480155], //queried location from map
 	  	userCoordinates:[-88.175429,39.480155]
 	  };
 	}

 		componentDidMount(){ 
		    emitter.addListener('increasePubYellLimitAnon',()=> {
		    	if(this.props.activeTab==2){
		    		this.setState({limit:this.state.limit+5});
		    		}
		    	}); 
		    emitter.addListener('changeLocAnon',(loc)=> {
		    	if(this.props.activeTab==2){
		    		this.setState({limit:10,location:loc});
		    		}
		    		console.log('change Loc')
		    		console.log(loc)
		    		console.log(this.state.limit)
		    	});  
		     emitter.addListener('resetPublicLimitAnon',()=> {
		    		this.setState({limit:10});
		    	}); 
 	}
componentWillMount(){
	this.setUserCoord(this.props.coordinates)
	 if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition((position)=>{
        		//console.log(position)
			    lat = position.coords.latitude
			    lng = position.coords.longitude
			    this.setState({location:[lng,lat],userCoordinates:[lng,lat]})
	        });
	    } else {
	     console.log( "Geolocation is not supported by this browser.")
	    }	
}

setUserCoord(coord){
	this.setState({userCoordinates:coord})
}

	render() {
		const {limit,location,userCoordinates} = this.state 
		const {activeTab} =this.props
	content=(activeTab==2)?<div className="ui column" style={{height:'90vh'}}>
								<MapComposer userCoordinates={userCoordinates} limit={limit} location={location} />
							</div>:<LoadingList />
		return (
			<div>{content} </div>
		);
	}
}
export default AnonPublicPlans;








