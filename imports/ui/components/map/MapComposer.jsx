import { composeWithTracker } from 'react-komposer';
import  PublicYells  from '../../../api/publicYells/publicYells.js';
import YellMap from './YellMap.jsx'


const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {
pantherHome =  [{_id:1,publicPlanLoc:{coordinates:[-88.175429,39.480155]}}]


  const subscription = MarkerSub.subscribe('yellsForMap');



  if ( subscription.ready() ) {
    const mark = PublicYells.find().fetch()
   console.log(mark)
   markers =  [{_id:"1",publicPlanLoc:{coordinates:[-88.175429,39.480155]}}]

    onData( null, { markers} );
  } 
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer