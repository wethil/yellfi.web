import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';
import {YellSubs} from '../YellsComponents/subsManager.js'
import LoadingCircle from '../YellsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
  coordinates = props.ipLoc.coordinates
  console.log(coordinates)
yellsFieldsOpt= {'plan':1,'loc':1,'time':1,'created_at':1,'publicity':1,'ownerId':1}
  component=2
  limit=Number(props.limit)


 const subscription = YellSubs.subscribe( 'nearestYells',coordinates,limit )
  if ( subscription.ready() ) {
    const yells =  Yells.find({},
              {  
                fields:yellsFieldsOpt,
                limit:limit,
                sort: {created_at: -1}
              }
    	).fetch() 
    console.log(yells)
    onData( null, { yells,component,limit } );
  }
};

 const NearestYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default NearestYells