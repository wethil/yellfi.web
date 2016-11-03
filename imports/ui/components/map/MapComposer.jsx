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
  } else {
  	markers = [{_id:1,loc:{coordinates:[[-88.175429,39.480155]]}}]
  	 onData( null, { markers });
  }
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer