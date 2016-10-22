import { Meteor } from 'meteor/meteor';
import Notifications from '../notifications.js';
import Yells from '../../yells/yells.js'

Meteor.publishComposite('thisUserNotifications', function(receiverId) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Notifications.find({"receiverId":receiverId, senderId: { $ne: receiverId } })
        },
        children: [
            {
              find: function (notification) {
                    return Meteor.users.find({_id:notification.senderId})
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


     