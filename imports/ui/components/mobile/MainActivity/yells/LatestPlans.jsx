import { composeWithTracker } from 'react-komposer';
import React from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawPlanList  from './RawPlanList.jsx';
import {YellSubs} from './YellsComponents/subsManager.js'


yellsFieldsOpt= {'plan':1,'loc':1,'time':1,'created_at':1,'publicity':1,'ownerId':1,'keyword':1}

const composer = ( props, onData ) => {
 //limit=Number(props.limit)
 limit = 20
component = 1
  const subscription =  YellSubs.subscribe( 'latestYells',limit ) 
   

  if ( subscription.ready() ) {
   const yells =  Yells.find({},
              {  
                fields:yellsFieldsOpt,
                limit:limit,
                sort: {created_at: -1}
              }
    	).fetch()
    onData( null, { yells,component,limit } );
  }
};

 const LatestPlans = composeWithTracker( composer )( RawPlanList );
 export default LatestPlans