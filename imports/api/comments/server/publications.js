import Comments from '../comments.js'
import { Meteor } from 'meteor/meteor';
fieldsOpt = {fields:{'username':1 ,'profile.avatar':1}}



Meteor.publishComposite('thisYellComments', function(yellId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
          return Comments.find({yellId:yellId,visible:true},{sort: {'created_at': -1}});
        },
        children: [
            {
              find: function (comment) {
          return Meteor.users.find({_id:comment.ownerId},fieldsOpt)
        }
            }
        ]
    }
});

