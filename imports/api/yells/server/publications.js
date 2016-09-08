import { Meteor } from 'meteor/meteor';
import '../yells.js'



Meteor.publish('yells',function() {
	return Yells.find()
})