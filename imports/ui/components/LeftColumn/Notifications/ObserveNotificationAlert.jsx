import React, { Component } from 'react';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import Close from 'material-ui/svg-icons/navigation/close';
import FontIcon from 'material-ui/FontIcon';
import Message from 'material-ui/svg-icons/communication/message';
import {deepOrange500} from 'material-ui/styles/colors';
import emitter from '../../emitter.js';
import  _ from 'lodash';
import howler from 'howler';
import { browserHistory } from 'react-router'
import {plans,ntfTitles} from '../../constants.js';

var sound =  new howler.Howl({
      src: ['/0028.ogg']
    });

 class ObserveNotificationAlert extends Component {
 	constructor(props) {
 	  super(props);
 	
 	  this.state = {
 	  	count:0,
 	  	yellId:"",
 	  	about:""
 	  };
 	}
 
 	componentDidMount () {
		emitter.addListener('triggerNtf',(ntf) => { this.triggerNtf(ntf)}) //RawNotificationList 


 }



toogleYellCard(yellId,about) {
    switch(about) {
      case 0:
           browserHistory.push('/y/'+yellId) 
          break;
      case 1:
           browserHistory.push('/y/'+yellId + '?dialog=comment')
          break;
      case 3:
           browserHistory.push('/y/'+yellId + '?dialog=comment')
          break;
      case 2:
           browserHistory.push('/y/'+yellId + '?dialog=joining')
          break;
  }
}
 triggerNtf(ntf) {

 	     ntFPlan=ntf.yell.plan
        prePlan=Number(ntFPlan)
        if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
          plan = ntFPlan
        } else {
          plan = i18n.__(plans[prePlan].content) 
        }


		 ReactMaterialUiNotifications.showNotification({
	      title: ntf.sender.firstName,
	      additionalText: i18n.__(ntfTitles[ntf.content].content),
	      autoHide:3000,
	      icon:<FontIcon   className="material-icons ntf">{plans[ntf.yell.plan].icon}</FontIcon> ,
	      iconBadgeColor: deepOrange500,
	      overflowText: plan,
	      timestamp: moment().format('h:mm A'),
	      personalised: true,
	      avatar: ntf.sender.picture
	    })
	    this.setState({
			yellId:ntf.yellId,
			about:ntf.about,
			count: ++this.state.count
    })		

	Meteor.call('receiveNotification', ntf._id, (error)=> {
		if (error) {
			console.log('error')
		} else {
			console.log('received')
		}
	});
 sound.play();
 


 }
 	
	render() {
const {yellId,about} = this.state


		return (
		<span style={{cursor:'pointer'}}  onClick={()=>this.toogleYellCard(yellId,about)} >
		<ReactMaterialUiNotifications
            desktop={true}
            rootStyle={{
            	zIndex:99999,
            	bottom: 20,
            	 right: 25,
               cursor:'pointer'
            }}
            transitionName={{
              leave: 'dummy',
              leaveActive: 'fadeOut',
              appear: 'dummy',
              appearActive: 'zoomInUp'
            }}
            transitionAppear={true}
            transitionLeave={true}
          />
		</span>
		
		);
	}
}
export default ObserveNotificationAlert;


	



