import { Meteor } from 'meteor/meteor';
import Notifications from './notifications.js'

Meteor.methods({
   addNotification: function(senderId,receiverId,title,content,about,yellId,yellContent) {
    var now = moment.toISOString()
   return Notifications.insert({
            senderId:senderId,
            receiverId : receiverId,
            title:title,
            content:content,
            created_at : now,
            about:about,
            yellId:yellId,
            yellContent:yellContent

        })
    },
     receiveNotification:function(notification) {
        Notifications.update(
                  { _id: notification },
                  {$set : {alerted : true }},
                 
            )
    },
    receiveAll:function(notifications) {
        Notifications.update(
                  { _id: { $in: notifications } },
                  {$set : {received : true }},
                  {multi :true}
            )
    }
});