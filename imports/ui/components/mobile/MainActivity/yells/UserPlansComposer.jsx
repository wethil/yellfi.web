import { composeWithTracker } from 'react-komposer';
import React from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawPlanList  from './RawPlanList.jsx';
import {YellSubs} from './YellsComponents/subsManager.js'




const composer = ( props, onData ) => {
  userId = Meteor.userId();
  limit=20
  const fieldsOpt = {
  	fields: {rating:0,comment_quantity:0,requested:0,approved:0,blocked_users:0},
  	limit:limit,
	sort: {created_at: -1}
}
   const subscription = YellSubs.subscribe( 'thisUserYell',userId,limit );
   

  if ( subscription.ready() ) {
    const yells = Yells.find({ownerId:userId},fieldsOpt).fetch()   
    onData( null, { yells,component,limit } );
  }
};

 const UserPlansComposer = composeWithTracker( composer )( RawPlanList );
 export default UserPlansComposer