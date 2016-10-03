import { composeWithTracker } from 'react-komposer';
import  Yells  from '../../../../api/yells/yells.js';
import  YellCard  from './YellCard.jsx';
import LoadingCircle from '../Comments/CommentsComponents/LoadingCircle.jsx'


const ThisYellSub = new SubsManager()

const composer = ( props, onData ) => {
 	yellId = props.yellId
  userId = Meteor.userId();

   const subscription = Meteor.userId() ? ThisYellSub.subscribe( 'thisYellForLoggedIns',yellId,userId) : ThisYellSub.subscribe( 'thisYell',yellId ) 



  if ( subscription.ready() ) {
    const yell = Yells.findOne({_id:yellId})
  
    
   
    onData( null, { yell } );
  }
};

 const YellCardComposer = composeWithTracker( composer,LoadingCircle )( YellCard );
 export default YellCardComposer