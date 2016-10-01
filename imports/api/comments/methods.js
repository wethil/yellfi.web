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
		
	}
})