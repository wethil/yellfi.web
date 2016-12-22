import React, { Component } from 'react';
import UserNotificationComposer from './UserNotificationComposer.jsx';
import emitter from '../../emitter.js';

 class NotificationFeed extends Component {
 	constructor(props) {
	 	  super(props);
	 	  this.state = {
	 	  	limit:10
	 	  };
 	}
 	componentDidMount(){
		    emitter.addListener('increaseNtFLimit',()=> {
		    	if(this.props.activeTab==2){
		    		this.setState({limit:this.state.limit + 5});
		    		}
		    	}); 
 	}

	render() {
		return (
			<UserNotificationComposer limit={this.state.limit}/>
		);
	}
}
export default NotificationFeed;
















