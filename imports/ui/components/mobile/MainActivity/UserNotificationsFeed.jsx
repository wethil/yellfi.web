import React, { Component } from 'react';
import UserNotificationsCompM from './notifications/UserNotificationsCompM.jsx'
import emitter from '../emitter.js'
 class UserNotificationsFeed extends Component {
 	constructor(props) {
	 	  super(props);
	 	  this.state = {
	 	  	limit:10
	 	  };
 	}
 		componentDidMount(){
 		//moment.locale('tr')	 
		    emitter.addListener('increaseNtFLimit',()=> {
		    	if(this.props.activeTab==2){
		    		this.setState({limit:this.state.limit+5});
		    		}
		    	}); 
 	}
 	componentWillReceiveProps(){
 		if (this.props.activeTab!=2){
 			this.setState({limit:10})
 		}
 	}


	render() {
		return (
			<UserNotificationsCompM  limit={this.state.limit}/>
		);
	}
}
export default UserNotificationsFeed;