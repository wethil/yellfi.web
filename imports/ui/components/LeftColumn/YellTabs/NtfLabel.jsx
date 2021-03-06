import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import emitter from '../../emitter.js'
import i18n from 'meteor/universe:i18n';
import FontIcon from 'material-ui/FontIcon';
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

 		 this.receiveNotifications(this.props.activeTab)
 	}

 	componentWillReceiveProps(nextProps) {
 		this.receiveNotifications(nextProps.activeTab)

 	}



receiveNotifications(activeTab){

	if (activeTab==2) {
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
		badgeStyle = badgeContent==0 ? {display:'none'} : {bottom:15,right:'-19px',top:'initial',width:19,height:19}
		return (
			  <Badge style={{padding:0}} badgeStyle={badgeStyle} badgeContent={badgeContent}  secondary={true}>
			     <FontIcon color="rgba(255, 255, 255, 0.701961)" className="material-icons">notifications</FontIcon>
			    </Badge>
		);
	}
}
export default NtfLabel;