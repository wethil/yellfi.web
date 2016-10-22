import { Meteor } from 'meteor/meteor';
import Notifications from './notifications.js'

Meteor.methods({
   addNotification: function(senderId,receiverId,title,content,about,yellId,yellContent) {
   return Notifications.insert({
            senderId:senderId,
            receiverId : receiverId,
            title:title,
            content:content,
            created_at : new Date(),
            about:about,
            yellId:yellId,
            yellContent:yellContent

        })
    }
});