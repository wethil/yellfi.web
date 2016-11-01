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
      	  Notifications.insert({
			senderId:ownerId,
			receiverId:yellOwnerId,
			content:'liked your suggestion',
			created_at:Date(),
			about:'like',
			yellId:yellId
		})
      }
		
	},
	 likeComment:function(userId,commentId,yellOwnerId,yellId) {
        Comments.update({_id:commentId}, {$push : {likes : userId }})
      
      if(userId!=yellOwnerId) {
      	  Notifications.insert({
			senderId:userId,
			receiverId:yellOwnerId,
			content:'liked your suggestion',
			created_at:Date(),
			about:'like',
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