import { Meteor } from 'meteor/meteor';
import '../yells.js'


Meteor.publishComposite('thisYell', function(yellId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Yells.find({"_id":yellId})
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





Meteor.publishComposite('thisYellForLoggedIns', function(yellId,userId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Yells.find({"_id":yellId,"blocked_users":{$nin:[userId]}})
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




Meteor.publishComposite('latestYells',{
	find : function () {
		return Yells.find({}, {sort: {created_at: -1}})
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
Meteor.publishComposite('latestYellsForLoggedIns', function(userId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Yells.find({"blocked_users":{$nin:[userId]}}, {sort: {created_at: -1}})
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
                      }
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
Meteor.publishComposite('nearestYellsForLoggedIns', function(loc,userId) { //always [longitude, latitude] order 
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
                      },
                "blocked_users":{$nin:[userId]}   

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
          return Yells.find({ownerId:userId});
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
          return Yells.find({ approved:{$in:[userId]}})
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


