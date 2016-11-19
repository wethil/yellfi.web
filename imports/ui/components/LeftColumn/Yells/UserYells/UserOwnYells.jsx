import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'



const UserYellsSub = new SubsManager()

const composer = ( props, onData ) => {
  userId = Meteor.userId();
  heightforBottomNav=props.height
  const fieldsOpt =	{fields: {rating:0,comment_quantity:0,requested:0,approved:0,blocked_users:0}}
  const subscription = UserYellsSub.subscribe( 'thisUserYell',userId );



  if ( subscription.ready() ) {
    const yells = Yells.find({ownerId:userId},fieldsOpt).fetch()
  
    component=0 //0 is User Yell Tab Value
   
    onData( null, { yells,component,heightforBottomNav } );
  }
};

 const UserOwnYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default UserOwnYells