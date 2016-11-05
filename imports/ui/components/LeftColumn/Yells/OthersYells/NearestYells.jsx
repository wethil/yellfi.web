import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
  coordinates = props.ipLoc.coordinates
  heightforBottomNav='73.6vh'
  component=2
  limit=Number(props.limit)


 const subscription = YellSubs.subscribe( 'nearestYells',coordinates,limit )


  if ( subscription.ready() ) {
    const yells =  Yells.find().fetch() 
    console.log(yells)
    onData( null, { yells,heightforBottomNav,component,limit } );
  }
};

 const NearestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default NearestYells