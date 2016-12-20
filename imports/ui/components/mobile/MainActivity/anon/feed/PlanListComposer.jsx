import { composeWithTracker } from 'react-komposer';
import React from 'react';
import  Yells  from '../../../../../../api/yells/yells.js';
import  RawPlanListAnon  from './RawPlanListAnon.jsx';
import LoadingList from '../../yells/YellsComponents/LoadingList.jsx'


yellsFieldsOpt= {'plan':1,'time':1,'created_at':1,'publicity':1,'ownerId':1,'keyword':1,'joining_quantity':1,'comment_quantity':1}
 const AnonYellSubs = new SubsManager()
const composer = ( props, onData ) => {

limit=Number(props.limit)
  const subscription =  AnonYellSubs.subscribe( 'latestYells',limit ) 
   

  if ( subscription.ready() ) {
   const yells =  Yells.find({},
              {  
                fields:yellsFieldsOpt,
                limit:limit,
                sort: {created_at: -1}
              }
    	).fetch()
    onData( null, { yells,limit } );
  }
};

 const PlanListComposer = composeWithTracker( composer,LoadingList )( RawPlanListAnon );
 export default PlanListComposer