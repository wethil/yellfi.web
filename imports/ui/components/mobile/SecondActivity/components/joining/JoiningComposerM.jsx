import { composeWithTracker } from 'react-komposer';
import  RawJoiningListM  from './RawJoiningListM.jsx';
import Loading from '../others/Loading.jsx'
const JoiningSub = new SubsManager()

const composer = ( props, onData ) => {
yell = props.yell
requests = yell.requests
fields = {fields:{'firstName':1 ,'picture':1}}
console.log(requests)

  const subscription = JoiningSub.subscribe( 'multipleUsers',requests );

  if ( subscription.ready() ) {
    const requerers = Meteor.users.find({_id: {$in:requests}},fields).fetch() 
    onData( null, { requerers,yell, } );
  }
};

 const JoiningComposerM = composeWithTracker( composer,Loading )( RawJoiningListM );
 export default JoiningComposerM