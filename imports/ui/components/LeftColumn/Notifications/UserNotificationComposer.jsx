import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Notifications  from '../../../../api/notifications/notifications.js';
import  RawNotificationList  from './RawNotificationList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import LoadingCircle from '../Yells/YellsComponents/LoadingCircle.jsx'
const NotificationSubs = new SubsManager()

const composer = ( props, onData ) => {
userId=Meteor.userId()
limit = props.ntfLimit
//console.log(limit)
  const subscription =  NotificationSubs.subscribe( 'thisUserNotifications',userId,limit ) 

   
  if ( subscription.ready() ) {
  const notifications =  Notifications.find({receiverId:userId},{sort: {created_at: -1} , limit:limit}).fetch() 

  
    onData( null, { notifications,limit } );
  }
};

 const LatestYells = composeWithTracker( composer,LoadingCircle )( RawNotificationList );
 export default LatestYells