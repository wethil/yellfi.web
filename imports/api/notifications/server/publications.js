import { Meteor } from 'meteor/meteor';
import Notifications from '../notifications.js';
import Yells from '../../yells/yells.js'

Meteor.publishComposite('thisUserNotifications', function(receiverId,limit) { //always [longitude, latitude] order 
    return {
        find: function() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Notifications.find({"receiverId":receiverId, senderId: { $ne: receiverId }},{sort: {created_at: -1},limit:limit})
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


     //5987
Meteor.publishComposite('observingNotifications', function(receiverId) { //always [longitude, latitude] order 
    return {
        find: function() {

           minutesBefore = moment().subtract(1, 'minutes')
           console.log(minutesBefore.toISOString() )

           var self = this;

  var subHandle = Notifications.find({
                receiverId:receiverId,
                 senderId: { $ne: receiverId },
                 received:false,
                 created_at:{$gte: moment(minutesBefore).toISOString() }

             }).observe({
    added: function (doc) {

      self.added("Notifications", doc);
    }
  });

  self.ready();

  self.onStop(function () {
    subHandle.stop();
  });
           






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


     