import React, { Component } from 'react';
import UserPlansComposer from './yells/UserPlansComposer.jsx'
import emitter from '../emitter.js'


 class UserPlansFeed extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	limit:10
 	  };
 	}

 	componentDidMount(){
 		//moment.locale('tr')	 
		    emitter.addListener('increaseUPLimit',()=> {
		    	this.setState({limit:this.state.limit+5});
		    	}); 
 	}
	render() {
	
		return (
			<UserPlansComposer limit={this.state.limit} />
		);
	}
}
export default UserPlansFeed;