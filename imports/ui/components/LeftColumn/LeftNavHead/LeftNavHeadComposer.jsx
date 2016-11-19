import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import LeftNavHead from './LeftNavHead.jsx'
import LoadLeftNavHead from './LoadLeftNavHead.jsx'
import emitter from '../../emitter.js'



const composer = ( props, onData ) => {
  userId = Meteor.userId();

  const fieldsOpt =	{fields: {createdAt:0,services:0}}
  const subscription = Meteor.subscribe( 'thisUser',userId );



  if ( subscription.ready() ) {
    const user = Meteor.users.findOne({_id:userId})

    emitter.emit('userInf', user); //send to rightcolumn
  
   
   
    onData( null, { user } );
  }
}

 const LeftNavHeadComposer = composeWithTracker( composer,LeftNavHead )( LeftNavHead );
 export default LeftNavHeadComposer