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
		 	const {limit} = this.state
		    emitter.addListener('increaseUPLimit',()=> {
		    	this.setState({limit:limit+1});
		    	}); 
 	}
	render() {
		const {limit} = this.state
		return (
			<UserPlansComposer limit={limit} />
		);
	}
}
export default UserPlansFeed;