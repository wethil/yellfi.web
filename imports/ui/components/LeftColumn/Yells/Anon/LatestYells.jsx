import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import  RawYellList  from '../RawYellList.jsx';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe( 'latestYells' );

  if ( subscription.ready() ) {
    const yells = Yells.find().fetch();
    console.log(yells)
    onData( null, { yells } );
  }
};

 const LatestYells = composeWithTracker( composer )( RawYellList );
 export default LatestYells