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
      case 'yell':
           browserHistory.push('/yell/'+yellId) 
          break;
      case 'comment':
           browserHistory.push('/yell/'+yellId + '?dialog=comment')
          break;
      case 'like':
           browserHistory.push('/yell/'+yellId + '?dialog=comment')
          break;
      case 'participation':
           browserHistory.push('/yell/'+yellId + '?dialog=joining')
          break;
  }
}

 triggerNtf(ntf) {
 		  plan = _.find(plans, { 'content': ntf.yell.plan });
	    //console.log(ntf)
	    path = window.location.pathname

		 ReactMaterialUiNotifications.showNotification({
	      title: ntf.sender.username,
	      additionalText: ntf.content,
	      autoHide:2600,
	      icon:<FontIcon   className="material-icons ntf">{plan.icon}</FontIcon> ,
	      iconBadgeColor: deepOrange500,
	      overflowText: ntf.yell.plan,
	      timestamp: moment().format('h:mm A'),
	      personalised: true,
	      avatar: ntf.sender.profile.avatar
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



		return (
		<span  onClick={()=>this.toogleYellCard(this.state.yellId,this.state.about)} >
		<ReactMaterialUiNotifications
            desktop={true}
            rootStyle={{
            	zIndex:99999,
            	bottom: 20,
            	 right: 25
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


	

const plans = [
	{ content: 'Listening Music', icon: "audiotrack" },
	{ content: 'Watching Something', icon: "movie_creation"},
	{ content: 'Reading a Book', icon:"local_library" },
	{ content: 'Eating and Drinking', icon:"restaurant" },
	{ content: 'Cooking', icon:"whatshot"  },
	{ content: 'Going Outside', icon:"nature_people" },
	{ content: 'Going to Shopping', icon:"shopping_cart" },
	{ content: 'Hanging out with Someone', icon:"local_cafe" },
	{ content: 'Biking', icon:"directions_bike"  },
	{ content: 'Hiking', icon:"directions_run" },
	{ content: 'Custom', icon:"add" }
]





