import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import CustomScroll from 'react-custom-scroll';
import { browserHistory } from 'react-router'
import emitter from '../../emitter.js'
import {plans,ntfTitles,listsDesktopStyles} from '../../constants.js';
import Snackbar from 'material-ui/Snackbar';
import NoNotification from './NoNotification'
import _ from 'lodash';
import VisibilitySensor from 'react-visibility-sensor'
import { Loader } from 'semantic-ui-react'
import i18n from 'meteor/universe:i18n';

 class RawNotificationList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      notifications:[],
       snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:"",
        sensor:true,
        loader:true
    };
  }


  componentWillMount() {
     ntfs = this.props.notifications
     this.makePropState(ntfs)
    this.sendNotificationsToTabTitle(ntfs)
  }

  componentWillReceiveProps(nextProps){
    ntfs = nextProps.notifications 
   if (ntfs && ntfs.length!=0) {
     head = _.head(ntfs)
    this.checkNtfForTime(head)
   }
   
    this.sendNotificationsToTabTitle(ntfs)
    this.makePropState(ntfs)
    this.checkProps(ntfs, nextProps.limit)
  }

  checkNtfForTime(ntf){

if(!ntf.alerted&&ntf.receiverId==Meteor.userId()){
        ntfTime = moment(ntf.created_at).utc()
        now = moment().utc()
        pastTime =  moment(now).subtract(3, 'seconds')
        if (moment(ntfTime).isAfter(pastTime)){
           emitter.emit('triggerNtf',ntf)
        } 
      }
  }

sendNotificationsToTabTitle(notifications){

  unreceivedNtf= _.map(_.filter(notifications, function(o) { return !o.received && o.senderId!=Meteor.userId();}),'_id');
  
  emitter.emit('changeBadgeContent',unreceivedNtf)
  
}


toogleYellCard(yellId,about) {
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

closeSb(){
   this.setState({
        snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:""
        })
}

undoAction(type,data) {
    switch(type) {
      case 'yell':
          Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              this.closeSb()
              browserHistory.push('/yell/'+data)
            }
          });
          break;
      case 'comment':
            Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              console.log('ok')
            }
          });
          break;
      
  }
}

  handleVisibleSensor(isVisible){
  if (isVisible){
    this.setState({sensor:false})
    emitter.emit('increaseNtFLimit')
  }
}

makePropState(data){
  this.setState({notifications:data})
}

checkProps(newP,limit){
  if(newP.length<limit) {//if plan quantity is lower than limit, this means there is no new plan
    this.setState({haveMore:false,sensor:false,loader:false})
  } else {
    this.setState({haveMore:true,sensor:true,loader:true})
  } 

}

	render() {
const {notifications,sensor} = this.state
	if (notifications &&notifications.length > 0) {
      var notoficationList = []
     notifications.forEach((notification) => {

        let time = ` ${moment(notification.time).calendar()} `

        ntFPlan=notification.yell.plan
        prePlan=Number(ntFPlan)
        if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
          plan = ntFPlan
        } else {
          plan = i18n.__(plans[prePlan].content)
        }
  

		 notoficationList.push(
          <div id={notification._id} key={notification._id}>
            <ListItem
                  onTouchTap={()=>this.toogleYellCard(notification.yellId,notification.about)}
                  leftAvatar={<Avatar src={notification.sender.picture} />}
                  primaryText={
                   <div style={listsDesktopStyles.username}>{notification.sender.firstName}
                     <span style={listsDesktopStyles.subhead}>
                      {' ' + i18n.__(ntfTitles[notification.content].content)+' '}<span style={listsDesktopStyles.planTxt} > {plan}</span>
                     </span>
                   </div>
                }
              />
            <Divider  inset={true} />
          </div>
        );

      });
    } else {
          

    	notoficationList = <NoNotification />

    }


		return (
  <div>
    <CustomScroll> 
      <List style={listsDesktopStyles.list} > 
        {notoficationList}
        <VisibilitySensor 
          partialVisibility={true}
          delayedCall={true}
          onChange={this.handleVisibleSensor.bind(this)}
          active={sensor} >  
             <div> <Loader style={{marginTop:2}} active={this.state.loader} inline='centered' /></div>
         </VisibilitySensor>
      </List> 
    </CustomScroll>
  </div>  
		);
	}
}
export default RawNotificationList;

