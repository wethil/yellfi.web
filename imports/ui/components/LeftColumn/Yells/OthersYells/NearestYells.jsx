import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
  coordinates = props.ipLoc.coordinates
  heightforBottomNav='73.6vh'
  component=2
  limit=props.limit
  const fieldsOpt =	{
  	fields: {rating:0,comment_quantity:0,requested:0,approved:0,blocked_users:0},
  	limit:limit,
  }

 const subscription = YellSubs.subscribe( 'nearestYells',coordinates,limit )


  if ( subscription.ready() ) {
    const yells =  Yells.find({},fieldsOpt).fetch() 
    console.log(yells)
    onData( null, { yells,heightforBottomNav,component,limit } );
  }
};

 const NearestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default NearestYells