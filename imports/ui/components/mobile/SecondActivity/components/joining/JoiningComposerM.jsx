import { composeWithTracker } from 'react-komposer';
import  RawJoiningListM  from './RawJoiningListM.jsx';
//import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'
const JoiningSub = new SubsManager()

const composer = ( props, onData ) => {
yellId = props.yellId
ownerId = props.ownerId
requests = props.requests
approved = props.approved
publicity = props.publicity
ownership = Meteor.userId() && Meteor.userId() == ownerId ? true : false 
 fields = {fields:{'username':1 ,'profile.avatar':1}}


  const subscription = JoiningSub.subscribe( 'multipleUsers',requests );

  if ( subscription.ready() ) {
    const requerers = Meteor.users.find({_id: {$in:requests}},fields).fetch() 
    onData( null, { requerers,approved,ownership,yellId,publicity } );
  }
};

 const JoiningComposer = composeWithTracker( composer )( RawJoiningListM );
 export default JoiningComposer