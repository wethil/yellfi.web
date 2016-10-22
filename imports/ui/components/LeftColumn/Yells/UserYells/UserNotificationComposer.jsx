import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Notifications  from '../../../../../api/notifications/notifications.js';
import  RawNotificationList  from './RawNotificationList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'
const NotificationSubs = new SubsManager()

const composer = ( props, onData ) => {
userId=Meteor.userId()
  const subscription =  NotificationSubs.subscribe( 'thisUserNotifications',userId ) 

   heightforBottomNav=props.height
  if ( subscription.ready() ) {
  const notifications =  Notifications.find({receiverId:userId}).fetch() 
  
    onData( null, { notifications,heightforBottomNav } );
  }
};

 const LatestYells = composeWithTracker( composer,LoadingCircle )( RawNotificationList );
 export default LatestYells