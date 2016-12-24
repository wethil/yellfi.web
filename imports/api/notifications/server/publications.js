import { Meteor } from 'meteor/meteor';
import Notifications from '../notifications.js';
import Yells from '../../yells/yells.js'
const fieldsOpt = {fields:{'firstName':1,'picture':1,}}

Meteor.publishComposite('thisUserNotifications', function(receiverId,limit) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Notifications.find({ 
                $or: [ { 'receiverId': receiverId  }, { 'senderId': receiverId , about:1 } ] 
              }
                ,{sort: {created_at: -1},limit:limit})
        },
        children: [
            {
              find: function (notification) {
                    return Meteor.users.find({_id:notification.senderId},fieldsOpt)
                 }
            },

            {
                find: function (notification) {
                    return Yells.find({_id:notification.yellId},{fields:{plan:1}})
                 }
            }

        ]
    }
});


