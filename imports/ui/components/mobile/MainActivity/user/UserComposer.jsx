import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import UserSettings from './UserSettings.jsx'




const composer = ( props, onData ) => {
  userId = Meteor.userId();

  const fieldsOpt =	{fields: {firsName:1,picture:1}}
  const subscription = Meteor.subscribe( 'thisUser',userId );



  if ( subscription.ready() ) {
    const user = Meteor.users.findOne({_id:userId})

  
   
   
    onData( null, { user } );
  }
}

 const UserComposer = composeWithTracker( composer )( UserSettings );
 export default UserComposer