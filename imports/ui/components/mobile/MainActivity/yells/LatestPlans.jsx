import { composeWithTracker } from 'react-komposer';
import React from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawPlanListForFeed  from './RawPlanListForFeed.jsx';
import {YellSubs} from './YellsComponents/subsManager.js'


yellsFieldsOpt= {'plan':1,'time':1,'created_at':1,'publicity':1,'ownerId':1,'keyword':1,'joining_quantity':1,'comment_quantity':1}

const composer = ( props, onData ) => {

limit=Number(props.limit)
  const subscription =  YellSubs.subscribe( 'latestYells',limit ) 
   

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

 const LatestPlans = composeWithTracker( composer )( RawPlanListForFeed );
 export default LatestPlans