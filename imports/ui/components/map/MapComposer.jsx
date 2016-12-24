import { composeWithTracker } from 'react-komposer';
import  PublicYells  from '../../../api/publicYells/publicYells.js';
import YellMap from './YellMap.jsx'

const plansForMapBoxField={'plan':1,'publicity':1,'ownerId':1,'publicPlanLoc':1}
const MarkerSub = new SubsManager()
const composer = ( props, onData ) => {
bounds = props.bounds


  const subscription = MarkerSub.subscribe('PlansOnMapBox',bounds);



  if ( subscription.ready() ) {
  const markers = Yells.find({
         'publicity':{ $ne: 0 }
         },
        {  
          fields:plansForMapBoxField,
        }
      ).fetch() 
  console.log(markers)


    onData( null, { markers} );
  } 
};

 const MapComposer = composeWithTracker( composer )( YellMap );
 export default MapComposer