import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';




Meteor.startup(() => {
  // code to run on server at startup
});


var getFbPicture = function(accessToken) { // make async call to grab the picture from facebook
    var result;
    result = Meteor.http.get("https://graph.facebook.com/me/picture?type=large&redirect=0", {
      params: {
        access_token: accessToken
      }
    });
    if(result.error) {
    	console.log(result.error)
      throw result.error;
    }

    return result.data.data.url; // return the picture's url
  };



  Accounts.onCreateUser(function(options, user) {
    if(user.services.facebook){
    user.picture = getFbPicture(user.services.facebook.accessToken);
    user.firstName = user.services.facebook.first_name
    } else {
        let photoLink = user.services.twitter.profile_image_url_https;
        user.picture =photoLink.replace('_normal','') ;
        user.firstName = user.services.twitter.screenName;
    }
	  return user;
});





/*
  Accounts.onCreateUser(function(options, user) {
  getFbPicture(user.services.facebook.accessToken);
  
    return user;
});

*/


  