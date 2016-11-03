import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../api/yells/yells.js';
import YellMap from './YellMap.jsx'


const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {



  const subscription = MarkerSub.subscribe( 'nearestYellsForMap');



  if ( subscription.ready() ) {
    const markers = Yells.find({visible:true},{fields:{'loc.coordinates':1}}).fetch()
console.log(markers)
  
    onData( null, { markers} );
  }
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer