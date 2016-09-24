import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../api/yells/yells.js';
import  RawYellList  from './RawYellList.jsx';
import {YellSubs} from './YellsComponents/subsManager.js'
import LoadingCircle from './YellsComponents/LoadingCircle.jsx'


const UserYellsSub = new SubsManager()

const composer = ( props, onData ) => {
  userId = Meteor.userId();


  const subscription = UserYellsSub.subscribe( 'thisUserYell',userId );



  if ( subscription.ready() ) {
    const yells = Yells.find({ownerId:userId}).fetch()
  
    component=0 //0 is User Yell Tab Value
   
    onData( null, { yells,component } );
  }
};

 const UserYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default UserYells