import React, { Component } from 'react';
import UserPlansComposer from './yells/UserPlansComposer.jsx'
import emitter from '../emitter.js'
import LoadingList from './yells/YellsComponents/LoadingList.jsx'


 class UserPlansFeed extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	limit:10
 	  };
 	}

 	componentDidMount(){
		    emitter.addListener('increaseUPLimit',()=> {
		    		this.setState({limit:this.state.limit+5});
		    	}); 

		    emitter.addListener('resetUPLimit',()=> {
		    		this.setState({limit:10});
		    	}); 
 	}


	render() {
			const {activeTab} =this.props
			
		content = (activeTab==1) ?<UserPlansComposer limit={this.state.limit} /> : <LoadingList />		
		
		return (
		<div>		
			{content}
		</div>		
		);
	}
}
export default UserPlansFeed;