import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../api/yells/yells.js';
import  RawYellList  from './RawYellList.jsx';
import {YellSubs} from './YellsComponents/subsManager.js'
import LoadingCircle from './YellsComponents/LoadingCircle.jsx'
import emitter from '../../emitter.js'

const UserYellsSub = new SubsManager()

const composer = ( props, onData ) => {
  userId = Meteor.userId();


  const subscription = UserYellsSub.subscribe( 'thisUserYell',userId );



  if ( subscription.ready() ) {
    const yells = Yells.find({ownerId:userId}).fetch()
    if (yells.length==0) {
    	emitter.emit('noUserYellAnim')
        console.log('no yell')
    }
   
    onData( null, { yells } );
  }
};

 const UserYells = composeWithTracker( composer,LoadingCircle )( RawYellList );
 export default UserYells