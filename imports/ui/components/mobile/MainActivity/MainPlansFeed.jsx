import React, { Component } from 'react';
import LatestPlans from './yells/LatestPlans.jsx';
import emitter from '../emitter.js';
import LoadingList from './yells/YellsComponents/LoadingList.jsx'
 class MainPlansFeed extends Component {
 		constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	limit:10
 	  };
 	}

 	componentDidMount(){
		    emitter.addListener('increaseLimit',()=> {
		    	console.log('inc limit')
		    		this.setState({limit:this.state.limit+5});
		    	}); 

		    emitter.addListener('resetLimit',()=> {
		    		this.setState({limit:10});
		    	}); 
 	}


	render() {
		const {limit} = this.state
		const {activeTab} =this.props
		
		content = (activeTab == 0 )? <LatestPlans limit={limit} /> : <LoadingList />	
		return (
		<div>	
		 {content}
		</div> 			
		);
	}
}
export default MainPlansFeed;
