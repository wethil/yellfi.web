import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../api/yells/yells.js';
import  YellCard  from './YellCard.jsx';
import LoadingCircle from '../Comments/CommentsComponents/LoadingCircle.jsx'
import _ from 'lodash'	

const ThisYellSub = new SubsManager()

const composer = ( props, onData ) => {
 	yellId = props.yellId
 	user = props.user
 	dialog=props.dialog
 

   const subscription = ThisYellSub.subscribe( 'thisYell',yellId ) 



  if ( subscription.ready() ) {
    const yell = Yells.findOne({_id:yellId})
  
    userBlocked = _.includes(yell.blocked_users, Meteor.userId()) ? 1 : 0
  
  
    
   
    onData( null, { yell,userBlocked,user,dialog } );
  }
};

 const YellCardComposer = composeWithTracker( composer,LoadingCircle )( YellCard );
 export default YellCardComposer