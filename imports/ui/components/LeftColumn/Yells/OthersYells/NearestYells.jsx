import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
  coordinates = props.ipLoc.coordinates
  heightforBottomNav=props.height
  const fieldsOpt =	{fields: {rating:0,comment_quantity:0,requested:0,approved:0,blocked_users:0}}

 const subscription = Meteor.userId() ? 
    YellSubs.subscribe( 'nearestYellsForLoggedIns',coordinates, Meteor.userId() )
   	:
   	 YellSubs.subscribe( 'nearestYells',coordinates )


  if ( subscription.ready() ) {
    const yells = Meteor.userId() ? Yells.find({"blocked_users":{$nin:[Meteor.userId()]}},fieldsOpt).fetch() : Yells.find(fieldsOpt).fetch() 
    console.log(yells)
    onData( null, { yells,heightforBottomNav } );
  }
};

 const NearestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default NearestYells