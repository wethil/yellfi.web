import { Meteor } from 'meteor/meteor';
import '../yells.js'



Meteor.publishComposite('latestYells',{
	find : function () {
		return Yells.find()
	},
	children : [
		{
			find: function (yell) {
				return Meteor.users.find({_id:yell.ownerId})
			}
		}
	]
})