import React, { Component } from 'react';
import {plans,ntfTitles} from '../../../constants.js';
import { browserHistory } from 'react-router'
import emitter from '../../emitter.js'
import NoNotification from './component/NoNotification.jsx';
import VisibilitySensor from 'react-visibility-sensor';
import { Loader } from 'semantic-ui-react'
import {frameStyle} from '../yells/YellsComponents/constant.js'
import _ from 'lodash'

 class RawNotificationList extends Component {
 	constructor(props) {
 	  super(props);
 	  this.state = {
 	  	notifications:[],
 	  	haveMore:false,
 	  	sensor:true,
 	  	loader:true
 	  };
 	}

	

 handleVisibleSensor(isVisible){
if (isVisible){
	this.setState({sensor:false,loader:true})
	console.log('inmc')
	emitter.emit('increaseNtFLimit')

	}
}	


 componentWillMount() {
 	this.setState({sensor:true})
 	var ntf = this.props.notifications;
 	var limit = this.props.limit;
    this.makePropState(ntf)
    this.checkProps(ntf,limit)
    this.sendNotificationsToTabTitle(ntf)
    
  }

   componentWillReceiveProps(nextProps){
   var ntf = nextProps.notifications
   var limit = nextProps.limit
	this.sendNotificationsToTabTitle(ntf)
	this.makePropState(ntf)
	this.checkProps(ntf,limit)
  } 

makePropState(data){
  this.setState({notifications:data})
}

checkProps(newP,limit){
	if(newP.length<limit) {//if plan quantity is lower than limit, this means there is no new plan
		this.setState({haveMore:false,sensor:false,loader:false})
		$('#lastEl').toggleClass('active',false)
	} else {
		this.setState({haveMore:true,sensor:true,loader:true})
	}

	
}



sendNotificationsToTabTitle(notifications){
  unreceivedNtf= _.map(_.filter(notifications, function(o) { return !o.received && o.senderId!=Meteor.userId(); }),'_id');


  emitter.emit('changeBadgeContent',unreceivedNtf)
}
 	tooglePlanDialog(yellId,about) {
    switch(about) {
      case 0:
           browserHistory.push('/yell/'+yellId) 
          break;
      case 1:
           browserHistory.push('/yell/'+yellId + '?dialog=comment')
          break;
      case 3:
           browserHistory.push('/yell/'+yellId + '?dialog=comment')
          break;
      case 2:
           browserHistory.push('/yell/'+yellId + '?dialog=joining')
          break;
  }
}



	render() {
		const {notifications} =this.props
		

	if (notifications && notifications.length > 0) {
			var notificationList = []
			var User = Meteor.userId()
			notifications.forEach((notification)=>{
				let time = ` ${moment(notification.time).calendar()} `;
			
				 ntFPlan=notification.yell.plan
				prePlan=Number(ntFPlan)
				if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
					plan = ntFPlan
				} else {
					plan = i18n.__(plans[prePlan].content)
				}
			 	
			 	notificationList.push(
						 <div className="ui centered fluid  card card--z-2" key={notification._id}>
						    <div className="content">
						      <img  style={styles.avatar} className="left floated mini ui circular  image" src={notification.sender.picture} />	      
						      <div style={styles.header} className="header">
						      {notification.sender.firstName} 
						      </div>
						      <div style={styles.meta} className="meta">
						        {moment(notification.created_at).startOf('hour').fromNow()}
						      </div>
						      <div  className="description">
						      { i18n.__(ntfTitles[notification.content].content)}
						      <span style={{fontWeight:'bolder'}}> {plan} </span>
						      </div>
						    </div>
						 <div onClick={()=>this.tooglePlanDialog(notification.yellId,notification.about)} 
						 	  className="ui bottom attached tiny  blue button">
						      <i className="share icon"></i>
						     {i18n.__('common.userFrg.goToPlan')}
						    </div>
						  </div>	 		
			 		)
			 });
		} else {
			notificationList = <NoNotification />
		}


		return (
<div className="ui container" style={frameStyle}>
	{notificationList}
	<VisibilitySensor 
		partialVisibility={true}
		delayedCall={true}
		onChange={this.handleVisibleSensor.bind(this)}
		active={this.state.sensor}
		>
		<Loader active={this.state.loader} inline='centered' />
	</VisibilitySensor>	
</div>
		);
	}
}
export default RawNotificationList;

const styles= {
	header:{
		marginLeft: '2.4em',
		color:'#4183c4'

	},
	meta:{
		marginLeft: '3.9em',
		fontSize:'0.8em'
	},

	avatar:{
		paddingBottom: '0em !important'
	}
}



