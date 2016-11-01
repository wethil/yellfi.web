import { Meteor } from 'meteor/meteor';
import Yells from '../yells.js';
fieldsOpt = {fields:{'username':1 ,'profile.avatar':1}}



Meteor.publishComposite('thisYell', function(yellId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Yells.find({"_id":yellId, visible:true})
        },
        children: [
            {
              find: function (yell) {
          return Meteor.users.find({_id:yell.ownerId},fieldsOpt)
        }
            }
        ]
    }
});


                  

Meteor.publish('multipleUsers',function(usersArray){
  return Meteor.users.find({_id: {$in:usersArray}},fieldsOpt)
})


Meteor.publish('thisUser', function (userId) {
  return Meteor.users.find({_id:userId})
})



// Server
Meteor.publishComposite('latestYells', function(limit) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
          return Yells.find({visible:true},{sort: {created_at: -1},limit:limit});
        },
        children: [
            {
              find: function (yell) {
          return Meteor.users.find({_id:yell.ownerId},fieldsOpt)
        }
            }
        ]
    }
});








// Server
Meteor.publishComposite('nearestYells', function(loc,limit) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
          return Yells.find({
                "loc":
                      {
                        $near: {
                          $geometry:
                            {
                              type: "Point",
                              coordinates: loc
                            },
                        }
                      },visible:true
              },{limit:limit}
            )
        },
        children: [
            {
              find: function (yell) {
          return Meteor.users.find({_id:yell.ownerId})
        }
            }
        ]
    }
});







// Server
Meteor.publishComposite('thisUserYell', function(userId,limit) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
          return Yells.find({ownerId:userId,visible:true},{sort: {created_at: -1},limit:limit});
        },
        children: [
            {
              find: function (yell) {
          return Meteor.users.find({_id:yell.ownerId})
        }
            }
        ]
    }
});



Meteor.publishComposite('thisUserApproved', function(userId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
          return Yells.find({visible:true, approved:{$in:[userId]}})
        },
        children: [
            {
              find: function (yell) {
          return Meteor.users.find({_id:yell.ownerId})
        }
            }
        ]
    }
});


