import { composeWithTracker } from 'react-komposer';
import React, { Component } from 'react';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
  const subscription = YellSubs.subscribe( 'latestYells' );
   heightforBottomNav=props.height
  if ( subscription.ready() ) {
    const yells = Yells.find().fetch();
    console.log(yells)
    onData( null, { yells,heightforBottomNav } );
  }
};
 const MyLoading = () => (<div style={{height:'73.6vh'}}> <CircularProgress size={2} /> </div>);
 const LatestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default LatestYells