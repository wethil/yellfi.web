import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';




Meteor.startup(() => {
  // code to run on server at startup
});


var getFbPicture = function(accessToken) { // make async call to grab the picture from facebook
    var result;
    result = Meteor.http.get("https://graph.facebook.com/me", {
      params: {
        access_token: accessToken,
        fields: 'picture'
      }
    });
    if(result.error) {
    	console.log(result.error)
      throw result.error;
    }
    return result.data.picture.data.url; // return the picture's url
  };



  Accounts.onCreateUser(function(options, user) {
	  user.picture = getFbPicture(user.services.facebook.accessToken);
	  user.firstName = user.services.facebook.first_name
	  return user;
});