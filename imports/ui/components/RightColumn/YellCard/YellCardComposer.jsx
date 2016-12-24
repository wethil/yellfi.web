import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../api/yells/yells.js';
import  YellCard  from './YellCard.jsx';
import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'
import _ from 'lodash'	

const ThisYellSub = new SubsManager()

const composer = ( props, onData ) => {
 	yellId = props.yellId
 	dialog=props.dialog


   const subscription = ThisYellSub.subscribe( 'thisYell',yellId ) 

  if ( subscription.ready() ) {
    const yell = Yells.findOne({_id:yellId})
    blocked_users = yell.blocked_users 
    if (yell && blocked_users && blocked_users.length>0 ) {
    	userBlocked = _.includes(blocked_users, Meteor.userId()) ? 1 : 0
    }else {
    	userBlocked=0
    }
  
  
    
   
    onData( null, { yell,userBlocked,dialog } );
  }
};

 const YellCardComposer = composeWithTracker( composer,LoadingCircle )( YellCard );
 export default YellCardComposer;