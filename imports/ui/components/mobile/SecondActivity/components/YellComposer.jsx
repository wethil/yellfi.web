import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../../api/yells/yells.js';
import  YellFragment  from './YellFragment.jsx';
//import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'
import _ from 'lodash'	

const ThisYellSub = new SubsManager()

const composer = ( props, onData ) => {
 	yellId = props.yellId
 	//user = props.user
  user="user"
 	dialog=props.dialog
 

   const subscription = ThisYellSub.subscribe( 'thisYell',yellId ) 



  if ( subscription.ready() ) {
    const yell = Yells.findOne({_id:yellId})

    if (yell && yell._id) {
    	userBlocked = _.includes(yell.blocked_users, Meteor.userId()) ? true : false
      resDialog = dialog
      suggestionsByYellfi = yell.suggestionsByYellfi
    }else {
      userBlocked = false
      resDialog = false
       suggestionsByYellfi = false
    }
  
  
    
   
    onData( null, { yell,userBlocked,user,resDialog,suggestionsByYellfi } );
  }
};

 const YellComposer = composeWithTracker( composer )( YellFragment );
 export default YellComposer