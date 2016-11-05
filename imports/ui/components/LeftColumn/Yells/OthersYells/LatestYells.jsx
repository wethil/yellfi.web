import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
 limit=Number(props.limit)
component = 1
  const subscription =  YellSubs.subscribe( 'latestYells',limit ) 
   
   heightforBottomNav='73.6vh'
  if ( subscription.ready() ) {
  const yells =  Yells.find().fetch() 
  console.log(yells)
    onData( null, { yells,heightforBottomNav,component,limit } );
  }
};

 const LatestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default LatestYells