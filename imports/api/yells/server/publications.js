import { Meteor } from 'meteor/meteor';
import Yells from '../yells.js';



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
          return Meteor.users.find({_id:yell.ownerId})
        }
            }
        ]
    }
});


                  

Meteor.publish('multipleUsers',function(usersArray){
  return Meteor.users.find({_id: {$in:usersArray}},{fields:{'username':1 ,'profile.avatar':1}})
})


Meteor.publish('thisUser', function (userId) {
  return Meteor.users.find({_id:userId})
})


Meteor.publishComposite('latestYells',{
	find : function () {
		return Yells.find({visible:true}, {sort: {created_at: -1}})
	},
	children : [
		{
			find: function (yell) {
				return Meteor.users.find({_id:yell.ownerId})
			}
		}
	]
})








// Server
Meteor.publishComposite('nearestYells', function(loc) { //always [longitude, latitude] order 
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
              }
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
Meteor.publishComposite('thisUserYell', function(userId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
          return Yells.find({ownerId:userId,visible:true});
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


