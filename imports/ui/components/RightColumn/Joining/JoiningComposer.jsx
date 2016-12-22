import { composeWithTracker } from 'react-komposer';
import  RawJoiningList  from './RawJoiningList.jsx';
import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'
const JoiningSub = new SubsManager()

const composer = ( props, onData ) => {
const {requests,approved,ownerId,yellId} = props
user =  Meteor.userId()
const ownership = user&& user== ownerId ? true : false 
fields = {fields:{'firstName':1 ,'picture':1}}

	console.log(requests)
  const subscription = JoiningSub.subscribe( 'multipleUsers',requests );

  if ( subscription.ready() ) {
    const requerers = Meteor.users.find({_id: {$in:requests}},fields).fetch() 
    onData( null, { requerers,approved,ownership,yellId} );
  }
};

 const JoiningComposer = composeWithTracker( composer)( RawJoiningList ); 
 export default JoiningComposer
