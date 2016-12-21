import React, { Component } from 'react';
import emitter from '../../emitter.js'
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';
import _ from 'lodash'


 class NotificationMenu extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	unreceivedNtf:[]
 	  };
 	}

componentDidMount(){
	emitter.addListener('changeBadgeContent',(unreceivedNtf) => {
 		 	this.setState({unreceivedNtf:unreceivedNtf  })
 		 	 
 		  });
}


componentWillMount(){
	if (this.props.activeTab==2) {
			this.receiveNotifications()
		}
}

componentWillReceiveProps(nextProps){
	if (nextProps.activeTab==2) {
			this.receiveNotifications()
		}
}


receiveNotifications(){
			Meteor.call('receiveAll', this.state.unreceivedNtf, error => {
				if (error) {
					console.log(error)
				} else {
					console.log('okay')
				
				}
		});
}

	render() {
		const {unreceivedNtf} = this.state
		unreceived = unreceivedNtf.length
		const badgeHasValue = {width:20,height:20,paddingTop:2,paddingRight:2,fontSize:11,bottom:15,right:'-19px',top:'initial'}
		badgeStyle = unreceived==0 ? {display:'none'} : badgeHasValue
		
		return (
			 <Badge style={{padding:0}} badgeStyle={badgeStyle} badgeContent={unreceived} secondary={true}>
		 		 <FontIcon color="rgba(255, 255, 255, 0.701961)" className="material-icons">notifications</FontIcon>
			</Badge>
		);
	}
}
export default NotificationMenu;

