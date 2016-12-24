import { composeWithTracker } from 'react-komposer';
import  PublicYells  from '../../../api/publicYells/publicYells.js';
import YellMap from './YellMap.jsx'

const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {
bounds = props.bounds


  const subscription = MarkerSub.subscribe('PlansOnMapBox',bounds);



  if ( subscription.ready() ) {
  const markers = PublicYells.find({'visible':true}).fetch() 
  console.log(markers)


    onData( null, { markers} );
  } 
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer