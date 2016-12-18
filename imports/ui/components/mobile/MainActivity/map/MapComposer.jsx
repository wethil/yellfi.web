import { composeWithTracker } from 'react-komposer';
import  PublicYells  from '../../../../../api/publicYells/publicYells.js';
import YellMapM from './YellMapM.jsx'


const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {
pantherHome =  [{
	_id:1,
	yell:{
		publicPlanLoc:{coordinates:[-88.175429,39.480155]}
	}

}]

  const subscription = MarkerSub.subscribe('yellsForMap');
  if ( subscription.ready() ) {
    const markers = PublicYells.find().fetch()
    onData( null, { markers} );
  }  else {

  	     markers =  pantherHome
  	        onData( null, { markers} );
  }
};

 const MapComposer = composeWithTracker( composer )( YellMapM );
 export default MapComposer