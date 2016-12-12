import { composeWithTracker } from 'react-komposer';
import React from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawPlanListForUser  from './RawPlanListForUser.jsx';
import {YellSubs} from './YellsComponents/subsManager.js'
import LoadingList from './YellsComponents/LoadingList.jsx'




const composer = ( props, onData ) => {
  userId = Meteor.userId();
  limit=Number(props.limit)
  const fieldsOpt = {
  	fields: {'plan':1,'time':1,'created_at':1,'publicity':1,'ownerId':1,'keyword':1,'joining_quantity':1,'comment_quantity':1},
  	limit:limit,
	sort: {created_at: -1}
}
   const subscription = YellSubs.subscribe( 'thisUserYell',userId,limit );
   

  if ( subscription.ready() ) {
    const yells = Yells.find({ownerId:userId},fieldsOpt).fetch()   
    onData( null, { yells,limit } );
  }
};

 const UserPlansComposer = composeWithTracker( composer,LoadingList )( RawPlanListForUser );
 export default UserPlansComposer