import { composeWithTracker } from 'react-komposer';
import  RawJoiningList  from './RawJoiningList.jsx';
//import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'
const JoiningSub = new SubsManager()

const composer = ( props, onData ) => {
yell = props.yell
requests = props.yell.requests
fields = {fields:{'firstName':1 ,'picture':1}}

	console.log(requests)
  const subscription = JoiningSub.subscribe( 'multipleUsers',requests );

  if ( subscription.ready() ) {
    const requerers = Meteor.users.find({_id: {$in:requests}},fields).fetch() 
    onData( null, { requerers,yell } );
  }
};

 const JoiningComposer = composeWithTracker( composer)( RawJoiningList ); 
 export default JoiningComposer





 /*
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


 */