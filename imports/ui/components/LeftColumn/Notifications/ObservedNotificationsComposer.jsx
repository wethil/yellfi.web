import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Notifications  from '../../../../api/notifications/notifications.js';
import  ObserveNotificationAlert  from './ObserveNotificationAlert.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import LoadingCircle from '../Yells/YellsComponents/LoadingCircle.jsx'
const Observing = new SubsManager()

const composer = ( props, onData ) => {
userId=Meteor.userId()
date = new Date()
  const subscription =  Meteor.subscribe( 'observingNotifications',userId) 

   
  if ( subscription.ready() ) {

  	Notifications.find({receiverId:userId}).observeChanges({
      added: function (id, fields) {
           // console.log(id)
        onData( null, { id } );
      }
    });

  
    
  }
};

 const ObservedNotificationsComposer = composeWithTracker( composer )( ObserveNotificationAlert );
 export default ObservedNotificationsComposer