import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import YellMapM from './YellMapM.jsx'


const PubYellSub = new SubsManager()
const composer = ( props, onData ) => {
  yellsFieldsOpt= {'plan':1,'loc':1,'time':1,'created_at':1,'publicity':1,'ownerId':1,'publicPlanLoc':1}
 limit=Number(props.limit)
 coordinates=props.location //queried coord on map
userCoordinates= props.userCoordinates
console.log(coordinates)
 const subscription = PubYellSub.subscribe( 'nearestYells',coordinates,limit )
  if ( subscription.ready() ) {
    const yells =  Yells.find({

       'publicity':{ $ne: 0 }
    },
              {  
                fields:yellsFieldsOpt,
                limit:limit,
                sort: {created_at: -1}
              }
      ).fetch() 
    console.log(yells)
 
    onData( null, { yells,limit,userCoordinates } );
  }
};
 const MapComposer = composeWithTracker( composer )( YellMapM );
 export default MapComposer



 /*
pantherHome =  [{
  _id:1,
  yell:{
    publicPlanLoc:{coordinates:[-88.175429,39.480155]}
  }

}] limit=Number(props.limit)

*/