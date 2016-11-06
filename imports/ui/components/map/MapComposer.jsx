import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../api/yells/yells.js';
import YellMap from './YellMap.jsx'


const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {
pantherHome =  [{_id:1,publicPlanLoc:{coordinates:[-88.175429,39.480155]}}]


  const subscription = MarkerSub.subscribe( 'nearestYellsForMap');



  if ( subscription.ready() ) {
    const markers = Yells.find({publicity: { $ne: 0 }}).fetch()
    console.log(markers)

    onData( null, { markers} );
  } 
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer