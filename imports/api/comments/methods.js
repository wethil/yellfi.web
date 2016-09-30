import { Meteor } from 'meteor/meteor';
import Comments from './comments.js'

Meteor.methods({
	addComment : function (comCont,yellId,ownerId) {
		Comments.insert({
			content: comCont,   
			yellId: yellId,
			created_at : new Date(),
			ownerId :ownerId
		})
		
	}
})