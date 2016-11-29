import { Meteor } from 'meteor/meteor';
import Comments from './comments.js'
import Notifications from '../notifications/notifications.js'

Meteor.methods({
	addComment : function (comCont,yellId,yellOwnerId) {
		Comments.insert({
			content: comCont,   
			yellId: yellId,
			yellOwnerId:yellOwnerId,
			created_at : new Date(),
			ownerId :this.userId
		})
	
		
		
	},
	 likeComment:function(commentId,yellOwnerId,yellId) {
        Comments.update({_id:commentId}, {$push : {likes : this.userId }})
      
      if(this.userId!=yellOwnerId) {
      	  Notifications.insert({
			senderId:this.userId,
			receiverId:yellOwnerId,
			content:1,
			created_at:Date(),
			about:3,
			yellId:yellId
		})
      }
    },
    unlikeComment:function(commentId) {
        Comments.update({_id:commentId}, {$pull : {likes : this.userId }})
    },
     deleteComment:function(commentId) {
        Comments.update({_id:commentId}, {$set : {visible : false }})
    },
      undoDeleteComment:function(commentId) {
        Comments.update({_id:commentId}, {$set : {visible : true }})
    },

})