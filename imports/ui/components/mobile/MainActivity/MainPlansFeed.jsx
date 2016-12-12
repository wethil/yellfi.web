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
		    emitter.addListener('increaseLimit',()=> {
		    		this.setState({limit:this.state.limit+5});
		    	}); 

		    emitter.addListener('resetLimit',()=> {
		    		this.setState({limit:10});
		    		console.log(this.state.limit)
		    	}); 
 	}


	render() {
		const {limit} = this.state
		const {activeTab} =this.props
		
		content = (activeTab == 0 )? <LatestPlans limit={limit} /> : <span>wait</span>	
		return (
		<div>	
		 {content}
		</div> 			
		);
	}
}
export default MainPlansFeed;
