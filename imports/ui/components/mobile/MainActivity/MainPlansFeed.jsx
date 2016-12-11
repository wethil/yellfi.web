import React, { Component } from 'react';
import LatestPlans from './yells/LatestPlans.jsx'
import emitter from '../emitter.js'

 class MainPlansFeed extends Component {
 		constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	limit:10
 	  };
 	}

 	componentDidMount(){
 		//moment.locale('tr')
		 
		    emitter.addListener('increaseLimit',()=> {
		    	this.setState({limit:this.state.limit+5});
		    	}); 
 	}
	render() {
		const {limit} = this.state
		return (
			  <LatestPlans  limit={this.state.limit} />				
		);
	}
}
export default MainPlansFeed;
