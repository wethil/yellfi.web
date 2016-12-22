import React, { Component } from 'react';
import UserPlans from '../../Yells/UserPlans.jsx'
import emitter from '../../../emitter.js'
 class UserPlansFeed extends Component {
 	constructor(props) {
 	  super(props);
 	  this.state = {
 	  	limit:10
 	  };
 	}

 	componentDidMount(){
		   emitter.addListener('userPlanLimit', ()=> { 
	      this.setState({limit:this.state.limit+5})
    });

		    emitter.addListener('resetUPLimit',()=> {
		    		this.setState({limit:10});
		    	}); 
 	}

	render() {
		const {activeTab} =this.props
		content = (activeTab==1) ?<UserPlans  limit={this.state.limit} /> : null
		return (
		<div>		
			{content}
		</div>
		);
	}
}
export default UserPlansFeed;