import { Meteor } from 'meteor/meteor';
import Comments from './comments.js'
import Notifications from '../notifications/notifications.js'
import Yells from '../yells/yells.js'

Meteor.methods({
	addComment : function (comCont,yellId,yellOwnerId) {
		Comments.insert({
			content: comCont,   
			yellId: yellId,
			yellOwnerId:yellOwnerId,
			created_at : new Date(),
			ownerId :this.userId
		})
if(this.userId!=yellOwnerId){
	Yells.update({ _id: yellId }, {$inc: {cQ : 1} });
}	

	 if(this.userId!=yellOwnerId) {
	      	  Notifications.upsert({
				senderId:this.userId,
				receiverId:yellOwnerId,
				content:0,
				about:1,
				yellId:yellId
			},
			{
				$set: {
					senderId:this.userId,
					receiverId:yellOwnerId,
					created_at:new Date(),
					received:false,
					alerted:false,
					content:0,
					about:1,
					yellId:yellId
				}
			})
      }
		
	},
	 likeComment:function(commentId,yellOwnerId,yellId,ownerId) {
        Comments.update({_id:commentId}, {$push : {likes : this.userId }})
      
      if(this.userId!=ownerId) {

      	   Notifications.upsert({
				senderId:this.userId,
				receiverId:ownerId,
				content:1,
				about:3,
				yellId:yellId
			},
			{
				$set: {
					senderId:this.userId,
					receiverId:ownerId,
					created_at:new Date(),
					received:false,
					alerted:false,
					content:1,
					about:3,
					yellId:yellId
				}
			})





      }
    },
    unlikeComment:function(commentId) {
        Comments.update({_id:commentId}, {$pull : {likes : this.userId }})
        
    },
     deleteComment:function(commentId,yellId) {
        Comments.update({_id:commentId}, {$set : {visible : false }})
        Yells.update({ _id: yellId }, {$inc: {cQ : -1} });
    },
      undoDeleteComment:function(commentId,yellId) {
        Comments.update({_id:commentId}, {$set : {visible : true }})
        Yells.update({ _id: yellId }, {$inc: {cQ : 1} });
    },

})


