import { composeWithTracker } from 'react-komposer';
import  RawJoiningList  from './RawJoiningList.jsx';
import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'
const JoiningSub = new SubsManager()

const composer = ( props, onData ) => {
ownerId = props.ownerId
requests = props.requests
approved = props.approved
ownership = Meteor.userId() && Meteor.userId() == ownerId ? true : false 
 fields = {fields:{'username':1 ,'profile.avatar':1}}


  const subscription = JoiningSub.subscribe( 'multipleUsers',requests );

  if ( subscription.ready() ) {
    const requerers = Meteor.users.find({_id: {$in:requests}},fields).fetch() 
    onData( null, { requerers,request,approved,ownership } );
  }
};

 const JoiningsComposer = composeWithTracker( composer,LoadingCircle )( RawJoiningList );
 export default JoiningsComposer