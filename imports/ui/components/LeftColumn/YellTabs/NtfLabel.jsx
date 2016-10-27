import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import emitter from '../../emitter.js'

 class NtfLabel extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	unreceivedNtf:[],
 	  	badgeContent:0
 	  };
 	}

 	componentDidMount() {
 		 emitter.addListener('changeBadgeContent',(unreceivedNtf) => { //RawNotificationList
 		 	
	      ntfCount = unreceivedNtf.length
	      this.setState({
	      	unreceivedNtf:unreceivedNtf,
	        badgeContent:ntfCount
	      })
  	  });

 		 this.receiveNotifications(this.props.notificationsReceived)
 	}

 	componentWillReceiveProps(nextProps) {
 		this.receiveNotifications(nextProps.notificationsReceived)

 	}



receiveNotifications(tabState){

	if (tabState==true) {
			Meteor.call('receiveAll', this.state.unreceivedNtf, error => {
				if (error) {
					console.log(error)
				} else {
					//console.log('okay')
				
				}
		});
	}	else {
		//console.log('tab not active')
	}

}

	render() {
		badgeContent = this.state.badgeContent
		badgeStyle = badgeContent==0 ? {display:'none'} : {}
		return (
			  <Badge badgeStyle={badgeStyle} badgeContent={badgeContent}  secondary={true}>
			      NOTIFICATIONS
			    </Badge>
		);
	}
}
export default NtfLabel;