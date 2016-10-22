const fields = {fields:{'username':1 ,'profile':1  }}
import Yells from '../yells/yells.js'
Notifications = new Mongo.Collection('notifications' ,{
                transform : function(doc) {
                  doc.sender = Meteor.users.findOne({_id:doc.senderId},fields);
                  doc.yell = Yells.findOne({_id:doc.yellId},{fields:{plan:1}})
                  return doc

                }
              });






Notifications.attachSchema(
    new SimpleSchema({
    senderId: {
      type: String,
      optional:true
    },
    receiverId :{
      type : String,
      optional : true
    },
    content: {
      type: String,
      denyUpdate: true
    },
    created_at: {
     type: Date,
     denyUpdate: true
    },
    about: {
      type:String,
      allowedValues:['yell','comment','participation','like']
    },
    yellId:{
      type:String
    },
    received:{
      type:Boolean,
      defaultValue:false
    }
  })
);



Notifications.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});

export default Notifications;
