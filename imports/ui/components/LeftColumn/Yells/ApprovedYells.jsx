import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../api/yells/yells.js';
import  RawYellList  from './RawYellList.jsx';
import LoadingCircle from './YellsComponents/LoadingCircle.jsx'

const ApprovedYellsSub = new SubsManager()
const composer = ( props, onData ) => {
  userId = Meteor.userId();


  const subscription = ApprovedYellsSub.subscribe( 'thisUserApproved',userId );



  if ( subscription.ready() ) {
    const yells = Yells.find({ approved:{$in:[userId]}}).fetch()
   console.log(yells)
   component = 2
    onData( null, { yells,component } );
  }
};

 const ApprovedYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default ApprovedYells