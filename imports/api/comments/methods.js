import { Meteor } from 'meteor/meteor';
import Comments from './comments.js'
import Notifications from '../notifications/notifications.js'

Meteor.methods({
	addComment : function (comCont,yellId,yellOwnerId,ownerId) {
		Comments.insert({
			content: comCont,   
			yellId: yellId,
			yellOwnerId:yellOwnerId,
			created_at : new Date(),
			ownerId :ownerId
		})
	
		 if(ownerId!=yellOwnerId) {
      	  Notifications.upsert({
			senderId:ownerId,
			receiverId:yellOwnerId,
			content:0,
			about:1,
			yellId:yellId
		},
		{
			$set: {created_at:new Date(),received:false,alerted:false }
		})
      }
		
	},
	 likeComment:function(userId,commentId,yellOwnerId,yellId) {
        Comments.update({_id:commentId}, {$push : {likes : userId }})
      
      if(userId!=yellOwnerId) {
      	  Notifications.insert({
			senderId:userId,
			receiverId:yellOwnerId,
			content:1,
			created_at:Date(),
			about:3,
			yellId:yellId
		})
      }
    },
    unlikeComment:function(userId,commentId) {
        Comments.update({_id:commentId}, {$pull : {likes : userId }})
    },
     deleteComment:function(commentId) {
        Comments.update({_id:commentId}, {$set : {visible : false }})
    },
      undoDeleteComment:function(commentId) {
        Comments.update({_id:commentId}, {$set : {visible : true }})
    },

})