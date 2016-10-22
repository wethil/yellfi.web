import { Meteor } from 'meteor/meteor';
import Comments from './comments.js'

Meteor.methods({
	addComment : function (comCont,yellId,yellOwnerId,ownerId) {
		Comments.insert({
			content: comCont,   
			yellId: yellId,
			yellOwnerId:yellOwnerId,
			created_at : new Date(),
			ownerId :ownerId
		})
		
		
	},
	 likeComment:function(userId,commentId) {
        Comments.update({_id:commentId}, {$push : {likes : userId }})
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