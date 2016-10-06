import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
const fieldsOpt =	{fields: {rating:0,comment_quantity:0,requested:0,approved:0,blocked_users:0}}

  const subscription =  YellSubs.subscribe( 'latestYells' ) 

   heightforBottomNav=props.height
  if ( subscription.ready() ) {
  const yells =  Yells.find({},fieldsOpt).fetch() 
  
    onData( null, { yells,heightforBottomNav } );
  }
};

 const LatestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default LatestYells