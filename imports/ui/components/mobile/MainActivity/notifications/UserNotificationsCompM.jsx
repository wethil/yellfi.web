import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Notifications  from '../../../../../api/notifications/notifications.js';
import  RawNotificationList  from './RawNotificationList.jsx';
import LoadingList from '../yells/YellsComponents/LoadingList.jsx'

const NotificationSubs = new SubsManager()

const composer = ( props, onData ) => {
userId=Meteor.userId()
limit=Number(props.limit)
  const subscription =  NotificationSubs.subscribe( 'thisUserNotifications',userId,limit ) 

   
  if ( subscription.ready() ) {
  const notifications =  Notifications.find({},{sort: {created_at: -1} , limit:limit}).fetch() 
  
    onData( null, { notifications,limit } );
  }
};
 const UserNotificationsCompM = composeWithTracker(composer,LoadingList)( RawNotificationList );
 export default UserNotificationsCompM