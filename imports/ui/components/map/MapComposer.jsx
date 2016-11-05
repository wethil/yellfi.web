import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../api/yells/yells.js';
import YellMap from './YellMap.jsx'


const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {
pantherHome =  [{_id:1,publicPlanLoc:{coordinates:[-88.175429,39.480155]}}]


  const subscription = MarkerSub.subscribe( 'nearestYellsForMap');



  if ( subscription.ready() ) {
    const preMarkers = Yells.find({visible:true,publicity: { $ne: 0 }},{fields:{'publicPlanLoc.coordinates':1}}).fetch()
console.log(preMarkers)
  markers = preMarkers.length >0 ? preMarkers : pantherHome
    onData( null, { markers} );
  } else {
  	markers = pantherHome
  	 onData( null, { markers });
  }
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer